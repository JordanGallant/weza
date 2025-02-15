import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DropDownPlus from "../../components/DropDownPlus"; 
import { useSupabase } from "@/context/SupaBaseContext";


const Communities = () => {
  const navigation = useNavigation(); 
  const {createBoard} = useSupabase();
  const boardName = "TechGrounds";
  const selectedColor = "purple";

  const OnCreateBoard = async () => {
    await createBoard!(boardName,selectedColor);
  }
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DropDownPlus />,
    });
  }, [navigation]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "50%" }}>
      <Text>Communities</Text>
      <TouchableOpacity onPress={OnCreateBoard}> 
        <Image 
          source={require("../../../assets/images/techground-logo.png")} 
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Communities;
