import React, { useCallback, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Loading from 'components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ChatsActions } from 'store/ducks/chat';
import { Creators as AuthActions } from 'store/ducks/auth';
import { SocketContext } from 'components/SocketProvider';
import { theme } from 'helpers';
import styles from './styles';
import ChatItem from './ChatItem';

const ListChat = ({ navigation }) => {
  const { loading, data } = useSelector((state) => state.chat);
  const { data: authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    dispatch(ChatsActions.chats());
  }, []);

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  const renderItems = useCallback(() => {
    if (data?.length) {
      return data?.map((e) => {
        const userId = authData?.user?.id;
        const toUserName =
          e?.to_user_id === userId ? e?.from?.name : e?.to?.name;
        return (
          <View key={e.id} style={styles.chatContainer}>
            <ChatItem
              name={toUserName}
              lastMessage={e?.messages?.[0]?.text || 'Sem mensagem...'}
              onPress={() =>
                navigation.navigate('Messages', { id: e.id, name: toUserName })
              }
            />
          </View>
        );
      });
    }
    return (
      <View style={styles.chatContainer}>
        <Text style={[styles.chat, { textAlign: 'center', paddingTop: 10 }]}>
          Nenhum chat encontrado.
        </Text>
      </View>
    );
  }, [data]);

  const socketText = () => {
    if (!socket) {
      return (
        <Text style={[styles.chat, { fontSize: 14, color: theme.orange }]}>
          Conectando ao socket...
        </Text>
      );
    }

    return (
      <Text style={[styles.chat, { fontSize: 14 }]}>
        Socket <Text style={{ color: theme.green }}>conectado</Text>
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Text style={styles.chat}>Chats</Text>
          {socketText()}
        </View>
      </View>
      <View style={styles.body}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Loading loading={loading} />
          </View>
        ) : (
          renderItems()
        )}
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            bottom: 5,
            left: 10,
            borderRadius: 10,
            padding: 10,
          }}
          onPress={logout}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>DESLOGAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ListChat;
