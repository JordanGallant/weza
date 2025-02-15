import React, { useState } from "react";
import { 
  View, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Page = () => {
  const [notifications, setNotifications] = useState([
    {id: '1', title: "Suspicious People", description: "Be aware of strangers walking around in the area."},
    {id: '2', title: "Gunshots Heard", description: "Stay indoors"},
    {id: '3', title: "Title", description: "description"}
  ]);
  const renderItem = ({item}: {item: {id: string, title: string, description: string}}) => (
    <View style={styles.notificationItem}>
      <Ionicons name="notifications-outline" size={30} color="purple" style={styles.icon} />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Alerts</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "purple",
  },
  icon: {
    marginRight: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
  },
});
export default Page;