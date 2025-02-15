import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSupabase } from '@/context/SupaBaseContext';
import { useLocalSearchParams } from 'expo-router';
import { Task, User } from '@/types/enums';

const App = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { assignCard } = useSupabase();
  const [card, setCard] = useState<Task>();
  const [user, setUser] = useState<User | null>(null); // Store the current user

  useEffect(() => {
    if (!id) return;
    loadInfo();
  }, [id]);

  const loadInfo = async () => {
    if (!id) return;
    // Fetch the card and user data here (example)
    // setCard(fetchedCard);
    // setUser(fetchedUser);
  };

  const OnAssignUser = async (user: User) => {
    if (card && user) {
      await assignCard!(card.id, user.id);  // Assign card
      console.log('Card assigned to user');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'purple',
          padding: 10,
          borderRadius: 5,
          opacity: 0.7,
        }}
        onPress={() => {
          if (user) {
            OnAssignUser(user);  // Pass user to the function
          }
        }}
      >
        <Text style={{ color: 'white' }}>WEZA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
