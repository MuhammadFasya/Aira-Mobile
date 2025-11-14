import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [text, setText] = useState('');
  const { width } = Dimensions.get('window');
  // responsive sizes (proportional to screen width)
  const inputHeight = Math.max(44, Math.floor(width * 0.11));
  // make the send icon 50% larger than before
  const baseIcon = Math.max(24, Math.floor(width * 0.075));
  const iconSize = Math.round(baseIcon * 1.5);

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Say something....."
        placeholderTextColor="#6B7280"
        style={[styles.input, { height: inputHeight }]}
        returnKeyType="send"
        onSubmitEditing={() => {
          if (text.trim() !== '') {
            onSend(text.trim());
            setText('');
          }
        }}
      />
      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonTransparent,
          {
            paddingHorizontal: Math.max(8, Math.round(iconSize * 0.28)),
          } as any,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => {
          if (text.trim() !== '') {
            onSend(text.trim());
            setText('');
          }
        }}
      >
        <Image
          source={require('../assets/icons/Send - primary.png')}
          style={[{ width: iconSize, height: iconSize }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // don't use a bottom margin here; HomeScreen will add space for keyboard + safe area
  container: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    marginLeft: 8,
    backgroundColor: '#2563EB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  buttonText: { color: 'white', fontWeight: '600' },
  sendIcon: { width: 20, height: 20 },
  sendIconLarge: { width: 28, height: 28 },
});
