import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import ThreeDotLoader from '@/components/loader/Loader';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@/constants';
import { ToastProvider } from '@/providers/ToastProvider';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    spaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    quickSandRegular: require('../assets/fonts/Quicksand-Regular.ttf'),
    quickSandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
    quickSandLight: require('../assets/fonts/Quicksand-Light.ttf'),
    quickSandMedium: require('../assets/fonts/Quicksand-Medium.ttf'),
    quickSandSemiBold: require('../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} backgroundColor={'rgba(224, 243, 224, 0.5)'} />
          <AppNavigator />
          <Toast />
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

function AppNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    // You can return a loading screen or splash screen here
    return <ThreeDotLoader />
  }

  useEffect(() => {
    if (token) {
      router.replace('/(tabs)')
    }
    else {
      router.replace('/(auth)/login')
    }
  }, [token])

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      {token ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
