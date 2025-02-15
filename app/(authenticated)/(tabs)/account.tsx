import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import * as Font from "expo-font";
const Account = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { signOut } = useAuth();
  return (
    <View style={styles.top}>
      <Text style={styles.title}> Profile </Text>
      <Text style={styles.basics}> Username</Text>
      {/* Render password label and input next to each other */}
      <View style={styles.passwordContainer}>
        <Text style={styles.passwordLabel}> Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // This controls whether the text is hidden or visible
        />
      </View>
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showButton}>
        <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'} Password</Text>
      </TouchableOpacity>
      <Text style={styles.basics}> Email address</Text>
      <Text style={styles.basics}> Phone number</Text>
      <Text style={styles.settings}> Change password</Text>
      <Text style={styles.settings}> Notification preferences</Text>
      <Text style={styles.settings}> Language & region selection</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}
const styles = StyleSheet.create({
  top: {
    width: "100%",
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: "MarkaziText-Regular",
    fontSize: 30,
    marginTop: 16,
    paddingVertical: 8,
    textAlign: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 6,
  },
  basics: {
    fontSize: 16,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center', // This ensures the label and input are vertically aligned
    marginBottom: 10,
  },
  passwordLabel: {
    fontSize: 16,
    marginRight: 10, // Adds space between label and input
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1, // Ensures the input takes up the remaining space in the row
    paddingLeft: 10,
  },
  showButton: {
    marginBottom: 20,
  },
  showText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  settings: {
    fontSize: 16,
    marginBottom: 10,
  }
});
export default Account;