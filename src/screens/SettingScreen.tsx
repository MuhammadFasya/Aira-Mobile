import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingScreen({ navigation }: any) {
  const notice = () =>
    Alert.alert('Note', 'Implemented in the future development');

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
            <Text style={styles.headerTitle}>Setting</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.pageTitle}>Setting</Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Profile' as any)}
          >
            <Text style={styles.cardText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={notice}>
            <Text style={styles.cardText}>Language</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={notice}>
            <Text style={styles.cardText}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  container: { flex: 1, padding: 18, alignItems: 'center' },
  pageTitle: {
    fontSize: 18,
    color: '#0F172A',
    marginVertical: 20,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '92%',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardText: { color: '#60A5FA', fontSize: 16 },
  bg: { flex: 1 },
  pattern: { ...StyleSheet.absoluteFillObject, opacity: 0.16 },
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
});
