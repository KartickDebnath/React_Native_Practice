// import React from 'react';
// import LoginForm from './login/LoginForm';


// const App = () => {
//   return <LoginForm/>
// };

// export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './android/app/src/component/LoginScreen';
import HomeScreen from './android/app/src/component/HomeScreen';
// import AboutScreen from './AboutScreen';
import ProfileScreen from './android/app/src/component/ProfileScreen';
import ForecastScreen from './android/app/src/component/ForecastScreen'
import AboutScreen from './android/app/src/component/AboutScreen';
// import ForecastScreen from './android/app/src/component/ForecastScreen';
// import ProfileScreen from './ProfileScreen';
// import ProfileScreen1 from './android/app/src/component/ProfileScreen';
// import ProfileScreen from './android/app/src/component/ProfileScreen';
// import LoginScreen from './LoginScreen';
// import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='About' component={AboutScreen}/>
        <Stack.Screen name="Forecast" component={ForecastScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
