import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DropDownPlus from "@/app/components/DropDownPlus";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#A569BD" }, // Lighter purple header
        headerTintColor: "white", // White header text
        tabBarStyle: { backgroundColor: "#A569BD" }, // Lighter purple tab bar
        tabBarActiveTintColor: "white", // White active tab text
        tabBarInactiveTintColor: "#E8DAEF", // Light grayish-purple inactive text
      }}
    >
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart-half-outline" size={size} color={color} />
          ),
 
        }}
      />

      <Tabs.Screen
        name="weza"
        options={{
          title: "Weza",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen name="Communities" options={{}} />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
