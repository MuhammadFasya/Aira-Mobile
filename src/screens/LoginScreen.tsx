import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { setUser } = useAuth();

  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  const extractNameFromEmail = (e: string) => {
    const local = (e.split('@')[0] || '').replace(/\d+/g, '');
    const parts = local.split(/[._-]+/).filter(Boolean);
    let candidate = parts.length
      ? parts.reduce((a, b) => (a.length >= b.length ? a : b))
      : local;
    const m = candidate.match(/[a-z]{3,6}$/i);
    if (m) return capitalize(m[0]);
    const firstVowel = candidate.search(/[aeiouy]/i);
    if (firstVowel > 0) return capitalize(candidate.slice(firstVowel));
    return capitalize(candidate.slice(0, 6));
  };

  const handleAuth = (via: 'email' | 'google') => {
    setErrorMsg('');
    const usedEmail =
      via === 'google' ? email || 'example.user@gmail.com' : email;

    if (!usedEmail || !usedEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (via === 'email' && isSignup) {
      if (!password || password.length < 6) {
        setErrorMsg('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        return;
      }
    }

    const name = extractNameFromEmail(usedEmail || 'Aira');
    setUser({ email: usedEmail, name });
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={require('../assets/images/LightBackground.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <Image
          source={require('../assets/images/LightPattern.svg')}
          style={styles.pattern}
          resizeMode="repeat"
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 90}
        >
          <View style={styles.logoWrap}>
            <Image
              source={require('../assets/icons/AIRA White Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.header}>
            {isSignup ? 'Create account' : 'Welcome to AIRA'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {isSignup && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}

          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

          <TouchableOpacity
            style={styles.primary}
            onPress={() => handleAuth('email')}
          >
            <Text style={styles.primaryText}>
              {isSignup ? 'Create account' : 'Log in'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity
            style={styles.google}
            onPress={() => handleAuth('google')}
          >
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={() => setIsSignup(s => !s)}>
              <Text style={styles.link}>
                {isSignup ? ' Log in' : ' Sign up'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  bg: { flex: 1 },
  pattern: { ...StyleSheet.absoluteFillObject, opacity: 0 },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#0F172A',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    borderWidth: 1,
    borderColor: '#E6EEF8',
    marginBottom: 12,
  },
  primary: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'center',
    width: '72%',
  },
  primaryText: { color: 'white', fontWeight: '700' },
  logoWrap: { alignItems: 'center', marginBottom: 12 },
  // increase logo size by 50%
  logo: { width: 180, height: 120 },
  error: { color: '#DC2626', textAlign: 'center', marginBottom: 8 },
  or: { textAlign: 'center', marginVertical: 12, color: '#64748B' },
  google: {
    borderWidth: 1,
    borderColor: '#E6EEF8',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  googleText: { color: '#0F172A' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  link: { color: '#4F46E5', fontWeight: '600' },
});
