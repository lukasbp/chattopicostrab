import styles from './styles';
import React from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// import { Container } from './styles';

const ListChat = () => (
  <View style={styles.container}>
    <View style={styles.top}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="caret-square-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.chat}>Chats</Text>
      </View>
    </View>
      <View style={styles.body}>
        <Button></Button>
        <TouchableOpacity>
            <Image></Image>
        </TouchableOpacity>
      </View>
  </View>
);
export default ListChat;
