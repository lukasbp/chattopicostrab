import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome5 } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ChatsActions } from 'store/ducks/chat';
import { SocketContext } from 'components/SocketProvider';
import { theme } from 'helpers';
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
      const alreadyExistsSubscribe = socket.getSubscription(`chat:${id}`);
      console.tron.log('SUBSCRIBE', alreadyExistsSubscribe);
      if (!alreadyExistsSubscribe) {
        const subscribeChat = socket?.subscribe(`chat:${id}`);
        subscribeChat.on('ready', (data) => {
          console.tron.log('READY');
          setSubscribe(data);
        });
      } else {
        setSubscribe(alreadyExistsSubscribe);
      }
    }
    return () => {
      console.tron.log('UNSUBSCRIBE', subscribe, socket);
      if (socket) {
        console.tron.log('UNSUBSCRIBE1');
        socket?.off(`chat:${id}`, () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const alreadyExistsSubscribe = socket.getSubscription(`chat:${id}`);
      console.tron.log('SUBSCRIBE', alreadyExistsSubscribe);
      if (!alreadyExistsSubscribe) {
        const subscribeChat = socket?.subscribe(`chat:${id}`);
        subscribeChat.on('ready', (data) => {
          console.tron.log('READY');
          setSubscribe(data);
        });
      } else {
        setSubscribe(alreadyExistsSubscribe);
      }
    }
  }, [socket]);

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

  const renderSocketText = () => {
    if (!socket || !subscribe) {
      return (
        <Text style={[styles.socketText, { color: theme.orange }]}>
          Conectando a sala do socket.
        </Text>
      );
    }

    return <Text style={styles.socketText}>Socket conectado</Text>;
  };

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
          {renderSocketText()}
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
