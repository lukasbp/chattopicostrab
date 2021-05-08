import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome5 } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ChatsActions } from 'store/ducks/chat';
import styles from './styles';

const Messages = ({ navigation, route }) => {
  const id = route?.params?.id;
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { loading, msgs } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(ChatsActions.messages(id));
  }, []);

  useEffect(() => {
    if (msgs?.length) {
      setMessages(
        msgs?.map((e) => ({
          _id: e.id,
          text: e.text,
          createdAt: dayjs(e.created_at).toDate(),
          user: {
            _id: e.user_id,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        }))
      );
    }
  }, [msgs]);

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
          <Text style={styles.chatName}>{route?.params?.name}</Text>
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
