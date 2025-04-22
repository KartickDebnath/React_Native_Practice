import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './android/app/src/component/LoginScreen';
import HomeScreen from './android/app/src/component/HomeScreen';
import AboutScreen from './android/app/src/component/AboutScreen';
import ForecastScreen from './android/app/src/component/ForecastScreen';
import ProfileScreen from './android/app/src/component/ProfileScreen';
import { WeatherProvider } from './android/app/src/component/WeatherContext'; // import your context
import SignInScreen from './android/app/src/component/SignInScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Forecast" component={ForecastScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
}
