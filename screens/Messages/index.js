import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome5 } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ChatsActions } from 'store/ducks/chat';
import { SocketContext } from 'components/SocketProvider';
import styles from './styles';

const Messages = ({ navigation, route }) => {
  const id = route?.params?.id;
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { msgs } = useSelector((state) => state.chat);
  const { data: authData } = useSelector((state) => state.auth);
  const { socket } = useContext(SocketContext);
  const [subscribe, setSubscribe] = useState(null);

  console.tron.log('CON', subscribe);

  useEffect(() => {
    dispatch(ChatsActions.messages(id));
    if (socket && !subscribe) {
      const subscribeChat = socket?.subscribe(`chat:${id}`);
      subscribeChat.on('ready', (data) => {
        setSubscribe(data);
      });
    }
  }, []);

  useEffect(() => {
    if (subscribe) {
      subscribe.on('message', (data) => {
        console.tron.log(data);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, {
            _id: dayjs(data.createdAt).valueOf(),
            text: data.text,
            createdAt: dayjs(data.createdAt).toDate(),
            user: {
              _id: data?.user?._id,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          })
        );
      });
    }
  }, [subscribe]);

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

  const onSend = useCallback(
    (newMsgs = []) => {
      if (subscribe) {
        subscribe.emit('message', newMsgs?.[0]);
      } else {
        Alert.alert('Erro', 'Socket não conectado para enviar mensagem!');
      }
    },
    [subscribe]
  );

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
          onSend={(newMsgs) => onSend(newMsgs)}
          user={{
            _id: authData?.user?.id,
          }}
        />
      </View>
    </View>
  );
};

export default Messages;
