import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
  
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

type LocationType = Location.LocationObject | null;
type AddressType = string | null;
const App = () => {
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState<LocationType>(null);
  const [address, setAddress] = useState<AddressType>(null);
  const [loading, setLoading] = useState(false);
  const sendNotification = async (latitude: number, longitude: number) => {
    if (!address) {
      Alert.alert("Location Required", "Please fetch location before sending.");
      return;
    }
    try {
      const response = await axios.post("https://weza-api.onrender.com/send-notification", {
        title: "Safety Alert",
        description: message,
        // location: `Latitude: ${latitude}, Longitude: ${longitude}`,
        location: address
      });
      Alert.alert("Success", "Notification sent successfully");
      console.log("Notification sent:", response.data);
      setMessage("");
    } catch (error) {
      console.error("Error sending notification:", error);
      Alert.alert("Error", "Failed to send notification");
    }
  };
  const handleGetLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await fetchAddress(location.coords.latitude, location.coords.longitude);
      sendNotification(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
    setLoading(false);
  };
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const API_KEY = "fabd613ea5054389ba72c9e3af23b842";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error retrieving address");
    }
  };
  return (
    <View style={styles.container}>
      <Ionicons name="notifications-outline" size={80} color="purple" />
      <Text style={styles.title}>Safety Alert</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGetLocation}
      >
        <Text style={styles.buttonText}>Send Notification</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        If you feel unsafe or in danger, notify your community immediately.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Optional: Describe your situation..."
        value={message}
        onChangeText={setMessage}
        multiline
        placeholderTextColor="#666"
      />
      {loading && <ActivityIndicator size="large" color="purple" style={{ marginTop: 20 }} />}
      {address && (
        <View style={{ marginTop: 10, padding: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Address:</Text>
          <Text>{address}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "purple",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 70,
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default App;

//well done team