import { View, Text, Image, FlatList, StyleSheet, TextInput } from 'react-native';
import { useSupabase } from '@/context/SupaBaseContext';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for members in the community"
        placeholderTextColor="#666"
      />
    </View>
  );
}

const Page = () => {
  const { getBoardMember } = useSupabase();
  const [users, setUsers] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  const loadUsers = async () => {
    console.log('Loading users...');
    
    const data1 = await getBoardMember!("36");
    const data2 = await getBoardMember!("7");
    const data3 = await getBoardMember!("39");
    const data4 = await getBoardMember!("42");

    const usersArray = [
      ...(Array.isArray(data1) ? data1 : [data1]), 
      ...(Array.isArray(data2) ? data2 : [data2]),
      ...(Array.isArray(data3) ? data3 : [data3]),
      ...(Array.isArray(data4) ? data4 : [data4])
    ];

    setUsers(usersArray);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Members</Text>
      <SearchBar />
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()} // Ensure it's a string
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.memberCard}>
            <Image 
              source={{ uri: item.avatar_url }} 
              style={styles.avatar} 
            />
            <Text style={styles.name}>{item.first_name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
  },
  searchBarContainer: {
    width: '100%',
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'purple',
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 100,
    paddingLeft: 12,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  memberCard: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    color: "black",
    fontSize: 14,
  }
});

export default Page;
