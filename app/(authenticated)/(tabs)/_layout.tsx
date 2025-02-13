import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='communities' options={{
        headerShown: false,
      }}/>
       <Tabs.Screen name="weza" options={{ title: 'Weza', tabBarIcon: ({size, color})=> (
        <MaterialCommunityIcons name="alpha-w-circle-outline" size={size} color={color} />
       )
      }} /> 

<Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
      
    </Tabs>
  )
}

export default Layout