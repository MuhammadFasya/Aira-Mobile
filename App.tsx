import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { Text, TextInput } from 'react-native';

// apply app-wide default font if available in bundled assets
try {
  // set default font family for Text and TextInput; if font isn't linked this will be ignored
  if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
  if ((TextInput as any).defaultProps == null)
    (TextInput as any).defaultProps = {};
  // prefer variable font family name if available; Android may require exact file name
  const AFACAD = 'Afacad';
  (Text as any).defaultProps.style = {
    ...(Text as any).defaultProps.style,
    fontFamily: AFACAD,
  };
  (TextInput as any).defaultProps.style = {
    ...(TextInput as any).defaultProps.style,
    fontFamily: AFACAD,
  };
} catch {
  // ignore if defaultProps can't be set in some RN versions/environments
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
