import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((msgs = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, msgs)
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View
          style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="caret-square-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 12 }}>
          <Text style={styles.chatName}>LUIS GUILHERME S F</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <GiftedChat
          messages={messages}
          onSend={(msgs) => onSend(msgs)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </View>
  );
};

export default Messages;
