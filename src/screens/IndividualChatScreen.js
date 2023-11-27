import React from 'react';
import { useState, useEffect } from 'react';

import { useRoute } from '@react-navigation/native';
import { colors, fonts } from '../constants';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';


const IndividualChatScreen = ({ accountUsername, friendUsername }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    // Mock messages
    { id: 1, text: 'Hello!', isSentByUser: false },
    { id: 2, text: 'How are you?', isSentByUser: false },
    // id is Date.now()
  ]);
  const sendMessage = () => {
    console.log(messageText);
    if (messageText.trim() !== '') {
      setMessages([...messages, { id: Date.now(), text: messageText, isSentByUser: true }]);
      setMessageText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.isSentByUser ? styles.sentBubble : styles.receivedBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.bannerText}>{friendUsername}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between', // Positions input container at the bottom

  },
  topBanner: {
    backgroundColor: colors.blue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff', // Or any other contrasting color
  },
  textInput: {
    flex: 1,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 4,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  sentBubble: {
    backgroundColor: colors.blue,
    alignSelf: 'flex-end',
  },
  receivedBubble: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
});
export default IndividualChatScreen;
