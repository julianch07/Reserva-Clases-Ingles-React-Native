import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ClassesScreen from '../screens/ClassesScreen';
import DetalleClase from '../screens/DetalleClase';

const Stack = createNativeStackNavigator();

export default function ClassesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ClassesScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetalleClase"
        component={DetalleClase}
        options={{
          title: 'Detalle',
          headerBackTitle: 'Atrás',
        }}
      />
    </Stack.Navigator>
  );
}