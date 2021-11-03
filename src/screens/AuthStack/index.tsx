import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartingScreen from './StartingScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name='StartingScreen'
        component={StartingScreen}
      />
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          title: 'Login',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 16 }
        }}
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 16 }
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
