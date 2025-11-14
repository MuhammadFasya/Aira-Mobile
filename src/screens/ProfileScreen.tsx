import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { ImageBackground } from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar ?? '');

  const applyProfile = () => {
    setUser({ email, name, avatar: avatarUrl || null });
    Alert.alert('Saved', 'Profile updated');
  };

  const handleLogout = () => {
    setUser(null);
    navigation.replace('Login');
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

        <View style={styles.headerWhite}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.centerWrap}>
          <Text style={styles.greeting}>Hello, {user?.name ?? 'User'}!</Text>

          <TouchableOpacity
            style={styles.avatarWrap}
            onPress={() => setEditingAvatar(true)}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <Image
                source={require('../assets/icons/AIRA 1 (Smiley Logo) - Varian 1.png')}
                style={styles.avatar}
              />
            )}
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>✎</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.fieldRow}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Username"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldRow}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>LOG OUT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.save} onPress={applyProfile}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={editingAvatar} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Set avatar image URL</Text>
              <TextInput
                value={avatarUrl}
                onChangeText={setAvatarUrl}
                placeholder="https://..."
                style={styles.modalInput}
                autoCapitalize="none"
              />
              <View style={styles.modalRow}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setAvatarUrl('');
                  }}
                >
                  <Text>Use default</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalPrimary]}
                  onPress={() => {
                    setEditingAvatar(false);
                    setUser({ email, name, avatar: avatarUrl || null });
                  }}
                >
                  <Text style={styles.modalPrimaryText}>Set</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  bg: { flex: 1 },
  pattern: { ...StyleSheet.absoluteFillObject, opacity: 0.16 },
  header: { padding: 12, borderBottomWidth: 1, borderColor: '#F1F5F9' },
  title: { fontSize: 16, color: '#60A5FA' },
  headerRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitle: { color: '#60A5FA', fontSize: 16 },
  headerClose: { fontSize: 18, color: '#94A3B8' },
  headerWhite: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  centerWrap: { alignItems: 'center', padding: 24 },
  greeting: { fontSize: 18, marginBottom: 12, color: '#0F172A' },
  avatarWrap: { marginBottom: 18 },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  editBadge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  editBadgeText: { fontSize: 12 },
  fieldRow: { width: '100%', paddingHorizontal: 24, marginBottom: 12 },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E6EEF8',
  },
  logout: {
    backgroundColor: '#FA7268',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 12,
  },
  logoutText: { color: 'white', fontWeight: '700' },
  save: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6EEF8',
  },
  saveText: { color: '#0F172A' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '86%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  modalTitle: { fontWeight: '700', marginBottom: 8 },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E6EEF8',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 12,
  },
  modalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { padding: 10 },
  modalPrimary: {
    backgroundColor: '#60A5FA',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  modalPrimaryText: { color: 'white' },
});
