import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

const ChatItem = ({ name, lastMessage, onPress }) => (
  <View style={styles.contatoContainer}>
    <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="md-person" size={24} color="white" />
      </View>
      <View style={{ flex: 8, justifyContent: 'center' }}>
        <View style={styles.contato}>
          <Text style={styles.contatoText}>{name}</Text>
        </View>
        <View style={styles.lastContainer}>
          <Text style={styles.lastText}>{lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

export default ChatItem;
