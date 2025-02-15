import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import * as DropdownMenu from 'zeego/dropdown-menu'
import { Ionicons } from "@expo/vector-icons";


const DropDownPlus = () => {
  return (
    <View style={{ marginRight: 20 }}>
      <TouchableOpacity>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DropDownPlus;
