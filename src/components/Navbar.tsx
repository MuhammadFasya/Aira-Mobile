import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';

export default function Navbar({
  onMenuPress,
  isOpen,
}: {
  onMenuPress?: () => void;
  isOpen?: boolean;
}) {
  const anim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOpen ? 1 : 0,
      duration: 240,
      useNativeDriver: true,
    }).start();
  }, [isOpen, anim]);

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.left, styles.arrowWrap]}
        onPress={() => onMenuPress && onMenuPress()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Animated.Image
          source={require('../assets/icons/Arrow left - primary.png')}
          style={[styles.arrowImg, { transform: [{ rotate }] }]}
        />

        {/* logo + text grouped on the left */}
        <Image
          source={require('../assets/icons/AIRA 1 (Smiley Logo) - Varian 1.png')}
          style={styles.smiley}
        />
        <Text style={styles.logo}>Aira</Text>
      </TouchableOpacity>

      <View style={styles.center} />
      <View style={styles.right} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2FF',
  },
  left: { minWidth: 140, alignItems: 'center', flexDirection: 'row' },
  center: { flex: 1 },
  right: { width: 60, alignItems: 'flex-end' },
  // make the arrow match sidebar icon wrap size so it's visually consistent
  arrow: { width: 60, height: 60, marginRight: 8, tintColor: '#60A5FA' },
  arrowActive: { tintColor: '#312E81' },
  smiley: { width: 51, height: 51, marginLeft: 6 },
  // Aira text slightly smaller (25% smaller) and positioned closer to the smiley
  logo: { fontSize: 23, fontWeight: '800', color: '#0F172A', marginLeft: 6 },
  arrowWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  arrowImg: { width: 33, height: 33 },
});
