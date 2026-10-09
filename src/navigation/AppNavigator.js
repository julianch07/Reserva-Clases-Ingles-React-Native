import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ClassesStack from './ClassesStack';
import MisReservasScreen from '../screens/MisReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';

import { colors } from '../theme';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
return (
<Tab.Navigator
screenOptions={{
headerShown: false,
tabBarActiveTintColor: colors.primario,
tabBarInactiveTintColor: colors.textoSuave,
tabBarStyle: {
backgroundColor: colors.superficie,
borderTopColor: colors.borde,
},
tabBarLabelStyle: {
fontSize: 12,
fontWeight: '600',
},
}}
>
<Tab.Screen
name="Inicio"
component={ClassesStack}
options={{
tabBarLabel: 'Inicio',
tabBarIcon: ({ color, size }) => ( <Ionicons name="home-outline" color={color} size={size} />
),
}}
/>

  <Tab.Screen
    name="MisReservas"
    component={MisReservasScreen}
    options={{
      tabBarLabel: 'Mis Reservas',
      tabBarIcon: ({ color, size }) => (
        <Ionicons
          name="calendar-outline"
          color={color}
          size={size}
        />
      ),
    }}
  />

  <Tab.Screen
    name="Perfil"
    component={PerfilScreen}
    options={{
      tabBarLabel: 'Perfil',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" color={color} size={size} />
      ),
    }}
  />
</Tab.Navigator>
);
}
