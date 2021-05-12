import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Loading from 'components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ChatsActions } from 'store/ducks/chat';
import { Creators as AuthActions } from 'store/ducks/auth';
import { SocketContext } from 'components/SocketProvider';
import { theme } from 'helpers';
import * as yup from 'yup';
import { Formik } from 'formik';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';
import ChatItem from './ChatItem';

const ListChat = ({ navigation }) => {
  const { loading, data } = useSelector((state) => state.chat);
  const { data: authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const refRBSheet = useRef(null);

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

  const myProfile = () => {
    navigation.navigate('Profile');
  };

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

  const add = ({ username }) => {
    refRBSheet.current.close();
    dispatch(ChatsActions.add(username));
  };

  const renderModal = () => (
    <RBSheet
      ref={refRBSheet}
      closeOnPressMask
      duration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Formik
          onSubmit={add}
          initialValues={{ username: '' }}
          validationSchema={yup
            .object()
            .shape({ username: yup.string().required('Campo obrigatório') })}
        >
          {({ values, handleChange, submitForm }) => (
            <View style={{}}>
              <Text style={{ paddingLeft: 10 }}>USUÁRIO</Text>
              <TextInput
                style={{ height: 40, margin: 12, borderWidth: 1 }}
                onChangeText={handleChange('username')}
                value={values.username}
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'green',
                    padding: 10,
                    width: 100,
                    borderRadius: 5,
                  }}
                  onPress={submitForm}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Adicionar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </RBSheet>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.chat}>Chats</Text>
            <View>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Text
                  style={[
                    styles.chat,
                    { fontWeight: 'bold', fontSize: 14, paddingRight: 20 },
                  ]}
                >
                  ADICIONAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(ChatsActions.chats());
                }}
              >
                <Text
                  style={[
                    styles.chat,
                    {
                      color: 'green',
                      fontWeight: 'bold',
                      fontSize: 14,
                      paddingRight: 20,
                    },
                  ]}
                >
                  ATUALIZAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {socketText()}
        </View>
      </View>
      {renderModal()}
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: 'blue',
            bottom: 5,
            right: 10,
            borderRadius: 10,
            padding: 10,
          }}
          onPress={myProfile}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>MEU PERFIL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ListChat;
