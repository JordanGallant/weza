import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
const Account = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { signOut } = useAuth();
  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.top}>
        <Text style={styles.title}> Profile </Text>
        <View style={{paddingBottom:10, paddingLeft: 3, alignItems: 'center'}}>
          <Ionicons name="person" size={80} color="black" paddingLeft={5} paddingBottom={20} />
        </View>
        <View style={styles.h1}>  Information </View>
        <View style={styles.iconContainer}>
          <Ionicons name="information-circle" size={50} color="black" /></View>
          <View style={styles.informationContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="person" size={20} color="black" style={styles.infoIcon} />
            <Text style={styles.information}>Username</Text>
            <Text style ={{paddingLeft:15}}>Jordan</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="mail" size={20} color="black" style={styles.infoIcon} />
            <Text style={styles.information}>Email address</Text>
            <Text style ={{paddingLeft:15}}>jordan.gallant.ct@gmail.com</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call" size={20} color="black" style={styles.infoIcon} />
            <Text style={styles.information}>Phone number</Text>
            <Text style ={{paddingLeft:15}}>+3162492710</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordLabel}> Password</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
          </View>
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showButton}>
            <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'} Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.h1}> Settings </View>
        <View style={styles.iconContainer}>
          <Ionicons name="settings" size={40} color="black" />
        </View>
        <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.settingItem}>
            <Ionicons name="key" size={20} color="black" style={styles.settingIcon} />
            <Text style={styles.settings}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.settingItem}>
            <Ionicons name="notifications" size={20} color="black" style={styles.settingIcon} />
            <Text style={styles.settings}>Notification preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.settingItem}>
            <Ionicons name="globe" size={20} color="black" style={styles.settingIcon} />
            <Text style={styles.settings}>Language & region selection</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton} onPress={() => signOut()}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensure the content takes up at least the available height
    backgroundColor: 'white',
  },
  top: {
    width: "100%",
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    fontFamily: "MarkaziText-Regular",
    fontSize: 50,
    fontWeight: 'bold',
    margin: 5,
    paddingVertical: 8,
    color: 'Black',
    textAlign: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 6,
  },
  iconContainer: {
    alignItems: 'center', // Center the icon horizontally
    marginVertical: 20, // Add some space above and below the icon
  },
  informationContainer: {
    marginTop: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
  infoIcon: {
    marginRight: 10,
  },
  section: {
    fontSize: 5,
    marginBottom: 5,
  },
  h1: {
    fontFamily: "Roboto",
    fontSize: 27, // Adjust font size as needed
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  passwordContainer: {
    fontFamily: "MarkaziText-Regular",
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#E8D6F4',
  },
  passwordLabel: {
    fontFamily: "MarkaziText-Regular",
    fontSize: 16,
    marginRight: 10,
    borderColor: 'transparent',
  },
  input: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    paddingLeft: 10,
  },
  showButton: {
    marginBottom: 20,
  },
  showText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  information:{
    fontSize: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "MarkaziText-Regular",
    backgroundColor: '#E8D6F4',
  },
  settingsContainer: {
    backgroundColor: '#F1F1F1', // Light gray background to differentiate
    borderWidth: 2, // Border around the settings section
    borderColor: '#D4D4D4', // Light border color
    borderRadius: 8, // Optional: rounded corners for the border
    marginTop: 20, // Space above the settings section
  },
  settingIcon: {
    marginRight: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
  settings: {
    fontSize: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "MarkaziText-Regular",
    backgroundColor: '#E8D6F4',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  roundButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Account;









