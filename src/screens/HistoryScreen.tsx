import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmptyList = () => (
  <View style={styles.emptyWrap}>
    <Text style={styles.emptyText}>No past conversations</Text>
  </View>
);

export default function HistoryScreen({ route, navigation }: any) {
  const sessions: Array<{ id: string; title: string }> =
    route?.params?.sessions ?? [];
  const openId: string | undefined = route?.params?.openId;

  const handleOpen = (item: { id: string; title: string }) => {
    // For now we just alert and go back; a future enhancement can restore messages
    Alert.alert('Open conversation', item.title, [
      { text: 'Close', style: 'cancel' },
      {
        text: 'Go to Home',
        onPress: () => {
          navigation.navigate('Home' as any, { openSessionId: item.id });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>History</Text>

        <FlatList
          data={sessions}
          keyExtractor={i => i.id}
          ListEmptyComponent={EmptyList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => handleOpen(item)}
            >
              <Text style={styles.title}>{item.title}</Text>
              {openId === item.id && <Text style={styles.openTag}>Open</Text>}
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: '#0F172A' },
  emptyWrap: { alignItems: 'center', padding: 24 },
  emptyText: { color: '#94A3B8' },
  openTag: { color: '#2563EB' },
});
