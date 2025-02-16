import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";
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
    await createBoard!(boardName, selectedColor);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DropDownPlus />,
    });
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.h1}>Together, We Make a Difference</Text>
      <Text style={styles.h2}> Techgrounds</Text>
      <TouchableOpacity onPress={OnCreateBoard}>
        <Image
          source={require("../../../assets/images/techground-logo.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.bodyText}>There is a significant shortage of IT professionals. At the same time, diversity remains a challenge, with women and talent from diverse cultural backgrounds being underrepresented in IT teams. To address this, Techgrounds was founded in 2019 to demonstrate that a wealth of hidden talent can be activated for careers in IT. For years, the organization has been driven by its mission, vision, and corresponding strategy.</Text>
      <Text style={styles.h2}>1000 Woman Trust</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.1000women.co.za/')}>
  <Image
    source={require("../../../assets/images/1000WomenTrustLogo.png")}
    style={{ width: 200, height: 200, resizeMode: 'cover' }} // Adjust size as needed
  />
</TouchableOpacity>
       <Text style={styles.bodyText}> 1000 Women Trust, a South African Women's Rights Organisation dedicated to combating gender-based violence and femicide GBVF. We believe in equipping women with knowledge, skills, and resources to chart their own paths towards solutions. Our efforts aim to inspire, educate, and empower women, driving towards gender equality in our communities.</Text>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allows the scroll view to expand properly
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  h1: {
    fontSize: 30, // Adjust font size as needed
    fontWeight: "bold",
    color: " purple", // You can change this to the color you want
    marginBottom: 10,
    marginTop: 20,
  },
  h2: {
    fontSize: 24, // Slightly smaller than h1
    fontWeight: "bold",
    color: "gray", // You can adjust the color as needed
    marginBottom: 10, // Space it out from the h1
    marginTop: 30, // Space it out from the image
  },
  bodyText: {
    fontSize: 16, // Adjust for readability
    color: "#333", // Dark gray for better contrast
    textAlign: "center", // Center align text
    lineHeight: 24, // Improves readability by adding spacing
    paddingHorizontal: 20, // Adds space on the sides
    marginTop: 10, // Space between h2 and body text
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
});
export default Communities;