import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function SideBar({
  visible,
  onClose,
  onNew,
  onSearch,
  onOpenSettings,
  history,
}: {
  visible: boolean;
  onClose: () => void;
  onNew: () => void;
  onSearch: () => void;
  onOpenSettings: () => void;
  history: Array<{ id: string; title: string }>;
}) {
  const [anim] = useState(new Animated.Value(visible ? 0 : -1));
  const navigation = useNavigation();
  const [active, setActive] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(true);
  const { user } = useAuth();

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 0 : -1,
      duration: 240,
      useNativeDriver: true,
    }).start();
  }, [visible, anim]);

  const translateX = anim.interpolate({
    inputRange: [-1, 0],
    outputRange: [-width * 0.72, 0],
  });

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* place the animated container first so the sidebar appears from the left */}
      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
      >
        {/* top-right arrow that visually shifts when sidebar is open */}
        <Image
          source={require('../assets/icons/Arrow right - secondary.png')}
          style={styles.topArrow}
          resizeMode="contain"
        />
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity
            style={styles.itemRow}
            activeOpacity={0.8}
            onPressIn={() => setActive('new')}
            onPressOut={() => setActive(null)}
            onPress={() => {
              onNew && onNew();
              onClose();
            }}
          >
            <View style={styles.iconWrap}>
              <Image
                source={
                  active === 'new'
                    ? require('../assets/icons/Plus - Primary.png')
                    : require('../assets/icons/Plus - secondary.png')
                }
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.itemTextLarge}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemRow}
            activeOpacity={0.8}
            onPressIn={() => setActive('search')}
            onPressOut={() => setActive(null)}
            onPress={() => {
              onSearch && onSearch();
              onClose();
              // navigate to Search screen and pass current history
              // @ts-ignore
              navigation.navigate('Search', { sessions: history });
            }}
          >
            <View style={styles.iconWrap}>
              <Image
                source={
                  active === 'search'
                    ? require('../assets/icons/Search 2 - Primary.png')
                    : require('../assets/icons/Search 2 - Secondary.png')
                }
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.itemTextLarge}>Search</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <TouchableOpacity
              style={styles.historyHeader}
              activeOpacity={0.8}
              onPress={() => setHistoryOpen(!historyOpen)}
            >
              <View style={styles.historyHeaderLeft}>
                <View style={styles.iconWrapSmall}>
                  <Image
                    source={
                      historyOpen
                        ? require('../assets/icons/History - Primary.png')
                        : require('../assets/icons/History - Secondary.png')
                    }
                    style={styles.iconSmall}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.itemTextLarge}>History</Text>
              </View>
              <Animated.Image
                source={require('../assets/icons/Arrow right - primary.png')}
                style={[
                  styles.chev,
                  { transform: [{ rotate: historyOpen ? '270deg' : '90deg' }] },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {historyOpen ? (
              history && history.length ? (
                history.map(h => (
                  <TouchableOpacity
                    key={h.id}
                    style={styles.historyRow}
                    activeOpacity={0.8}
                    onPress={() => {
                      onClose();
                      // open the session
                      // @ts-ignore
                      navigation.navigate('Home', { openSessionId: h.id });
                    }}
                  >
                    <View style={styles.historyBullet} />
                    <Text style={styles.historyText}>{h.title}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.emptyText}>No history yet</Text>
              )
            ) : null}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.settings}
          onPress={() => {
            onClose();
            // @ts-ignore
            navigation.navigate('Settings');
            onOpenSettings && onOpenSettings();
          }}
        >
          <View style={styles.settingsInner}>
            <View style={styles.avatarCircle}>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarText}>🙂</Text>
              )}
            </View>
            <Text style={styles.settingsText}>Setting</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
    flexDirection: 'row',
  },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.28)' },
  container: {
    width: width * 0.72,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  // reduce horizontal padding so items sit more to the left
  content: { paddingTop: 24, paddingHorizontal: 8, paddingBottom: 24 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconWrap: {
    // increased size by 50%
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  // unify icon sizes and remove background so logos render directly (larger)
  icon: { width: 33, height: 33, tintColor: '#60A5FA' },
  itemTextLarge: { color: '#60A5FA', fontSize: 18 },
  section: { marginTop: 18 },
  sectionTitle: { color: '#475569', marginBottom: 8 },
  empty: { color: '#94A3B8', fontStyle: 'italic' },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // keep the left content grouped; chevron will be absolutely positioned to the right
    justifyContent: 'flex-start',
    paddingVertical: 6,
    minHeight: 48,
    position: 'relative',
    paddingRight: 12,
  },
  historyHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  // use the same wrap style for small icons but without colored background (larger)
  iconWrapSmall: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconSmall: { width: 33, height: 33, tintColor: '#60A5FA' },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // reserve space for the chevron on the right edge
    paddingRight: 44,
  },
  itemText: { color: '#0F172A', fontSize: 15 },
  emptyText: { color: '#94A3B8', fontStyle: 'italic' },
  historyItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  historyBullet: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#E6EEF8',
    marginRight: 12,
  },
  historyText: { color: '#2D3748', flex: 1 },
  chev: {
    width: 18,
    height: 18,
    tintColor: '#93C5FD',
    position: 'absolute',
    right: 12,
    top: 24, // nudged slightly down so dropdown aligns visually with center
  },
  historyRight: { width: 40, alignItems: 'center', justifyContent: 'center' },

  topArrow: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 28,
    height: 28,
    tintColor: '#60A5FA',
  },
  settings: { padding: 14, borderTopWidth: 1, borderColor: '#F1F5F9' },
  settingsInner: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarImg: { width: 38, height: 38, borderRadius: 19 },
  avatarText: { fontSize: 18 },
  settingsText: { color: '#60A5FA', fontSize: 16 },
});
