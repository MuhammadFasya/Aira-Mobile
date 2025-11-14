import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }: any) {
  useEffect(() => {
    // auto-forward almost immediately (50ms) so the welcome screen is effectively instant
    const t = setTimeout(() => navigation.replace('Login'), 1500);
    return () => clearTimeout(t);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={require('../assets/images/LightBackground.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* pattern overlay (if your bundler supports SVG as Image). If not, feel free to replace with a PNG pattern. */}
        <Image
          source={require('../assets/images/LightPattern.svg')}
          style={styles.pattern}
          resizeMode="repeat"
        />

        <View style={styles.center}>
          <Image
            source={require('../assets/icons/AIRA White Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.getStarted}
            onPress={() => navigation.navigate('Login')}
            accessible
            accessibilityLabel="Get started"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  bg: { flex: 1 },
  pattern: { ...StyleSheet.absoluteFillObject, opacity: 0.45 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 160, height: 160 },
  getStarted: { width: 1, height: 1 },
});
