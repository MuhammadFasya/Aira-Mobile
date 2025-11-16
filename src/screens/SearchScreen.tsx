import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmptyList = () => (
  <View style={emptyStyles.wrap}>
    <Text style={emptyStyles.text}>No matches</Text>
  </View>
);

const emptyStyles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: 20 },
  text: { color: '#94A3B8' },
});

export default function SearchScreen({ route, navigation }: any) {
  const sessions: Array<{ id: string; title: string }> = useMemo(
    () => route?.params?.sessions ?? [],
    [route?.params?.sessions],
  );
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (!v) return sessions;
    return sessions.filter(s => s.title.toLowerCase().includes(v));
  }, [q, sessions]);

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

        {/* Navbar wrapped in white container */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRowSearch}>
            <View style={styles.headerLeftGroup}>
              <TouchableOpacity
                onPress={() => {
                  /* optional */
                }}
              >
                <Image
                  source={require('../assets/icons/Search 2 - Primary.png')}
                  style={styles.headerSearchIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerLogoGroup}
                onPress={() => navigation.navigate('Home')}
              >
                <Image
                  source={require('../assets/icons/AIRA 1 (Smiley Logo) - Varian 1.png')}
                  style={styles.headerLogo}
                />
                <Text style={styles.headerTitle}>Aira</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.searchHeading}>Search</Text>
          <View style={styles.searchRow}>
            <TextInput
              placeholder="Search Conversation..."
              placeholderTextColor="#6B7280"
              value={q}
              onChangeText={setQ}
              style={styles.input}
            />

            {/* clear button: shown when there is text */}
            {q ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setQ('')}
                accessibilityLabel="Clear search"
              >
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                /* noop for now */
              }}
            >
              <Image
                source={require('../assets/icons/searchPink - primary.png')}
                style={styles.searchBtnIcon}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            ListEmptyComponent={EmptyList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  // navigate to History and focus this session
                  navigation.navigate('History', { sessions, openId: item.id });
                }}
              >
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  bg: { flex: 1 },
  pattern: { ...StyleSheet.absoluteFillObject, opacity: 0.16 },
  headerWhite: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerRowSearch: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  headerSearchIcon: { width: 22, height: 22, tintColor: '#60A5FA' },
  headerLeftGroup: { flexDirection: 'row', alignItems: 'center' },
  headerLogoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerLogo: { width: 28, height: 28, marginRight: 8 },
  headerTitle: { color: '#60A5FA', fontSize: 16 },
  headerClose: { fontSize: 18, color: '#94A3B8' },
  // increased top padding so the Search heading, input, and list sit lower on the screen
  container: { flex: 1, padding: 16, paddingTop: 36 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E6EEF8',
    marginRight: 12,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // make the in-input search icon 1.5x (was 20)
  searchBtnIcon: { width: 30, height: 30 },
  clearButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  clearText: { color: '#6B7280', fontSize: 16 },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    paddingLeft: 16,
  },
  title: { color: '#0F172A', paddingLeft: 0 },
  searchHeading: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
});
