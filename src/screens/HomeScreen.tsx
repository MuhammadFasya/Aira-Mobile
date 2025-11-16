import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Image,
  Keyboard,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import axios from 'axios';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthContext';

type Sender = 'user' | 'aira';

interface Message {
  id: string;
  sender: Sender;
  text: string;
  createdAt?: number;
}

// Wajib: Replace local IP with your backend server address and must in the same connection
// Just see the output from running the app.py from the Aira Web Version
const API_ENDPOINT = 'http://192.168.160.241:5000/chat';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const listRef = useRef<FlatList<Message> | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sessions, setSessions] = useState<
    Array<{ id: string; title: string }>
  >([]);

  // scroll to bottom when new message arrives
  useEffect(() => {
    if (!listRef.current) return;
    setTimeout(() => {
      listRef.current?.scrollToEnd?.({ animated: true });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates?.height ?? 0);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardHeight(0),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const generateTitleFromMessages = (msgs: Message[]) => {
    const firstUser = msgs.find(m => m.sender === 'user');
    const sample = firstUser?.text ?? msgs[0]?.text ?? 'Conversation';
    const s = sample.replace(/\s+/g, ' ').trim();
    return s.length > 30 ? s.slice(0, 28) + '...' : s;
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      const title = generateTitleFromMessages(messages);
      setSessions(prev => [{ id: Date.now().toString(), title }, ...prev]);
    }
    setMessages([]);
    setSidebarVisible(false);
  };

  const handleOpenSettings = () => {
    setSidebarVisible(false);
    // navigate to settings
    // using navigation would require prop - for now keep placeholder
    console.log('Open settings (placeholder)');
  };

  const sendToApi = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        API_ENDPOINT,
        { message: text },
        { timeout: 10000 },
      );

      const reply =
        res?.data?.response ?? 'Maaf, Aira belum memberikan balasan.';

      const botMessage: Message = {
        id: Date.now().toString() + '-aira',
        sender: 'aira',
        text: String(reply),
        createdAt: Date.now(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.warn('Chat API error', err);
      setError('Tidak bisa terhubung ke server. Periksa koneksi Anda.');
      const errorMsg: Message = {
        id: Date.now().toString() + '-err',
        sender: 'aira',
        text: '⚠️ Sepertinya Aira sedang offline. Coba lagi nanti.',
        createdAt: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (text: string) => {
    if (!text || !text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      sender: 'user',
      text: text.trim(),
      createdAt: Date.now(),
    };

    // optimistic UI
    setMessages(prev => [...prev, userMessage]);
    // fire-and-forget to API; add bot reply when it returns
    sendToApi(text.trim());
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={require('../assets/images/LightBackground.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <View pointerEvents="none" style={styles.patternWrap}>
          <Image
            source={require('../assets/images/LightPattern.svg')}
            style={styles.pattern}
            resizeMode="cover"
          />
        </View>

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <Navbar
            isOpen={sidebarVisible}
            onMenuPress={() => setSidebarVisible(v => !v)}
          />

          {messages.length === 0 && (
            <View style={styles.centerGreeting} pointerEvents="none">
              <Text style={styles.titleCentered}>
                Hello, {user?.name ?? 'friend'}!
              </Text>
              <Text style={styles.subtitle}>Teman bicara yang empatik</Text>
            </View>
          )}

          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ChatBubble sender={item.sender} text={item.text} />
            )}
            contentContainerStyle={[
              styles.chatArea,
              { paddingBottom: Math.max(120, 20 + keyboardHeight) },
            ]}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              listRef.current?.scrollToEnd?.({ animated: true })
            }
          />

          {loading && (
            <View style={styles.loadingRow} pointerEvents="none">
              <ActivityIndicator size="small" color="#2563EB" />
              <Text style={styles.loadingText}>Aira sedang mengetik...</Text>
            </View>
          )}

          <View
            style={[
              styles.inputWrap,
              {
                // respect keyboard + safe area bottom inset so input isn't blocked
                paddingBottom: Math.max(
                  insets.bottom,
                  Platform.OS === 'android' ? 18 : 12,
                ),
                // also add any keyboard height while visible so content isn't cut
                marginBottom: keyboardHeight > 0 ? keyboardHeight : 0,
              },
            ]}
          >
            <ChatInput onSend={handleSend} />
          </View>

          <SideBar
            visible={sidebarVisible}
            onClose={() => setSidebarVisible(false)}
            onNew={handleNewChat}
            onSearch={() => {
              setSidebarVisible(false);
              console.log('Search clicked (placeholder)');
            }}
            onOpenSettings={handleOpenSettings}
            history={sessions}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  bg: { flex: 1 },
  patternWrap: { ...StyleSheet.absoluteFillObject },
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  subtitle: { marginTop: 4, color: '#475569' },
  centerGreeting: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  titleCentered: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  // leave extra bottom padding so last messages aren't hidden by keyboard/input
  chatArea: { paddingHorizontal: 16, paddingBottom: 120, paddingTop: 8 },
  inputWrap: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    // fully transparent so input sits directly on background
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    shadowColor: undefined,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  pattern: { ...StyleSheet.absoluteFillObject, opacity: 0.16 },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  loadingText: { marginLeft: 8, color: '#6B7280' },
});
