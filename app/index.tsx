import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import AuthModal from "./components/AuthModal";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModalType } from "@/types/enums";
import * as WebBrowser from "expo-web-browser"
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";

const Index = () => {
  const { top } = useSafeAreaInsets();
  const {showActionSheetWithOptions} =useActionSheet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['33%'], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);

  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  };
  const openLink = () => {
    WebBrowser.openBrowserAsync('https://google.com')
  };

  const openActionSheet = async () => {
    const options = ['View support docs', 'Contact us', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: `Can't log in or sign up?`,
      },
      (selectedIndex: any) => {
        switch (selectedIndex) {
          case 1:
            // Support
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );
  return (
    <BottomSheetModalProvider>

    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.image}
      />

      <View style={styles.bottomContainer}>
        <Text style={{ color: "black" }}> log in</Text>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "black" }]}
          onPress={() => showModal(ModalType.Login)}
        >
          <Text style={styles.text}> log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "white" }]}
          onPress={() => showModal(ModalType.SignUp)}
        >
          <Text style={[styles.text, { color: "black" }]}> Sign Up</Text>
        </TouchableOpacity>
        <Text style={[styles.description, { color: "black" }]}>
          {" "}
          By signing up you agree to the{" "}
          <Text style={styles.link} onPress={openLink}>User Notice{" "}</Text>
          and {''}
          <Text style={styles.link} onPress={openLink}>Privacy Polocy</Text>
          .
        </Text>
        <Text style={styles.link} onPress={openActionSheet}>cant login or signup?
        </Text>

      </View>
    </View>
    <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        enableOverDrag={false}
        enablePanDownToClose>
        <AuthModal authType={authType} />
      </BottomSheetModal>
    </BottomSheetModalProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    height: 200,
    width: 350,
    resizeMode: "contain",
    paddingHorizontal: 40,
  },
  bottomContainer: {
    gap: 10,
    justifyContent: "flex-end",
    marginBottom: 36,
    width: "100%",
    paddingHorizontal: 40,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  description: {
    fontSize: 10,
    textAlign: "center",
    color: "#fff",
    marginHorizontal: 60,
  },
  link: {
    color: "purple",
    fontSize: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default Index;
