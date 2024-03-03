import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import database from '@react-native-firebase/database';
import moment from 'moment';
import MsgComponent from './MsgComponent';

const ChatScreen = ({ route }) => {
  const { currentUser, id } = route.params;
  const [receiverData, setReceiverData] = useState({});
  const [msg, setMsg] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
    database()
      .ref(`/chatlist/Sender:${currentUser.id}/${id}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          setReceiverData(snapshot.val());
        }
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + receiverData.roomId)
      .on('child_added', snapshot => {
        setAllChat(prevChat => [snapshot.val(), ...prevChat]);
      });
    return () => {
      database().ref('/messages/' + receiverData.roomId).off('child_added', onChildAdd);
    };
  }, [receiverData.roomId]);

  const sendMsg = () => {
    if (!msg.trim()) {
      alert('Enter something....');
      return;
    }
    setDisabled(true);

    let msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: currentUser.id,
      to: id,
      sendTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
      msgType: 'text',
    };

    const newReference = database().ref('/messages/' + receiverData.roomId).push();
    msgData.id = newReference.key;

    newReference
      .set(msgData)
      .then(() => {
        let chatListUpdate = {
          lastMsg: msg,
          sendTime: msgData.sendTime,
        };

        database()
          .ref('/chatlist/' + id + '/' + currentUser.id)
          .update(chatListUpdate)
          .then(() => console.log('Data updated for receiver'));

        database()
          .ref('/chatlist/' + currentUser.id + '/' + id)
          .update(chatListUpdate)
          .then(() => console.log('Data updated for sender'));

        setMsg('');
        setDisabled(false);
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setDisabled(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.chatContainer}
        data={allChat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <MsgComponent sender={item.from === currentUser.id} item={item} />;
        }}
        inverted // Display recent messages at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />
        <TouchableOpacity disabled={disabled} onPress={sendMsg}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 0.5,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
