import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MsgComponent = ({ sender, item }) => {
  return (
    <View style={[styles.container, sender ? styles.senderContainer : styles.receiverContainer]}>
      <View style={[styles.messageBox, sender ? styles.senderMessageBox : styles.receiverMessageBox]}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timeText}>{item.sendTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns messages to the right by default
    marginBottom: 5,
  },
  senderContainer: {
    justifyContent: 'flex-end', // Aligns sender messages to the right
  },
  receiverContainer: {
    justifyContent: 'flex-start', // Aligns receiver messages to the left
  },
  messageBox: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  senderMessageBox: {
    backgroundColor: '#DCF8C6', // Adjusted background color for sender messages
    borderBottomRightRadius: 0, // Ensure proper border radius for sender messages
  },
  receiverMessageBox: {
    backgroundColor: '#FFFFFF', // Adjusted background color for receiver messages
    borderBottomLeftRadius: 0, // Ensure proper border radius for receiver messages
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timeText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 5,
    alignSelf: 'flex-end', // Aligns time to the right
  },
});

export default MsgComponent;
