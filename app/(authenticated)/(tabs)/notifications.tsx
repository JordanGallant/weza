import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WS_URL = "ws://localhost:3000"; 

interface Notification {
  id: string;
  title: string;
  description: string;
  location: string;
}

const Page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("Connected to WebSocket in Notifications");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new-notification") {
        setNotifications((prev) => [data.notification, ...prev]);
      } else if (data.type === "initial") {
        setNotifications(data.notifications);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket in Notifications");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Alerts</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Ionicons name="notifications" size={30} color="purple" style={styles.icon} />
            <View style={styles.notificationText}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationDescription}>{item.description}</Text>
              <Text style={styles.notificationLocation}>{item.location}</Text>
            </View>
          </View>
        )}
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
  },
  notificationLocation: {
    fontSize: 12,
    color: "#999",
  }
});

export default Page;
