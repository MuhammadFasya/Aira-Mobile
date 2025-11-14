import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function Avatar({ isUser }: { isUser: boolean }) {
  if (!isUser) {
    return (
      <Image
        source={require('../assets/icons/AIRA 1 (Smiley Logo) - Varian 1.png')}
        style={[styles.avatarImage, styles.avatarAira]}
      />
    );
  }

  return (
    <View style={[styles.avatar, styles.avatarUser]}>
      <Text style={styles.avatarText}>🙂</Text>
    </View>
  );
}

export default function ChatBubble({
  sender,
  text,
}: {
  sender: string;
  text: string;
}) {
  const isUser = sender === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAira]}>
      {!isUser && <Avatar isUser={false} />}

      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.airaBubble]}
      >
        <Text style={[styles.text, isUser ? styles.textUser : styles.textAira]}>
          {text}
        </Text>
      </View>

      {isUser && <Avatar isUser={true} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
    paddingHorizontal: 4,
  },
  rowAira: { justifyContent: 'flex-start' },
  rowUser: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#FFDDE6',
    marginLeft: 4,
    borderBottomRightRadius: 6,
  },
  airaBubble: {
    backgroundColor: '#FFFFFF',
    marginRight: 4,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#ECEFF6',
  },
  text: { fontSize: 14 },
  textUser: { color: '#231F20' },
  textAira: { color: '#111827' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  avatarImage: { width: 32, height: 32, borderRadius: 16, marginHorizontal: 4 },
  avatarUser: { backgroundColor: '#FFE6F0' },
  avatarAira: { backgroundColor: '#E8F0FF' },
  avatarText: { fontSize: 16 },
});
