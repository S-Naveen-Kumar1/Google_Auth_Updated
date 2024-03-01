// ChatScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { sendMessage, getMessages } from './ChatService'; 
import database from '@react-native-firebase/database';

const ChatScreen = ({ route }) => {
  const { senderId, receiverId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Attach the listener when the component mounts
    const unsubscribe = getMessages(senderId, receiverId, setMessages);

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [senderId, receiverId]);
  console.log("sender",senderId,message)
  
  const handleSendMessage = () => {
    sendMessage(senderId, receiverId, message);
    setMessage('');
  };

  return (
    <View>
      {/* <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.message}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Type your message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Send" onPress={handleSendMessage} /> */}
     <Text>hEY</Text>
    </View>
  );
};

export default ChatScreen;