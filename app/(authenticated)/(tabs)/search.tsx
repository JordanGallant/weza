import { View, Text, Image, FlatList } from 'react-native';
import { useSupabase } from '@/context/SupaBaseContext';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

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

    // Ensure data1 and data2 are arrays (handle cases where they might be objects)
    const usersArray = [
      ...(Array.isArray(data1) ? data1 : [data1]), 
      ...(Array.isArray(data2) ? data2 : [data2])
    ];

    setUsers(usersArray);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Image 
              source={{ uri: item.avatar_url }} 
              style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} 
            />
            <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
              {item.first_name}
            </Text>
            <Text style={{ color: "black", fontSize: 14 }}>
              {item.email}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Page;
