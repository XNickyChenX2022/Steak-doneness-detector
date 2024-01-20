import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { BACKEND_URL } from "@env";
import getImageType from "../utils/imageType";
import * as ImageManipulator from "expo-image-manipulator";
import categorizeCookingType from "../utils/steakTypes";
export default function PhotoComponent({ setSteakType }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need media library permissions to make this work.");
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      return;
    }
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 240, height: 240 } }], // resize to width of 300 and preserve aspect ratio
      { compress: 1, format: "jpeg" }
    );
    try {
      let body = new FormData();
      body.append("file", {
        uri: resizedPhoto.uri,
        name: getImageType(resizedPhoto.uri)[0],
        filename: getImageType(resizedPhoto.uri)[0],
        type: getImageType(resizedPhoto.uri)[1],
      });
      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        body: body,
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const responseData = await response.json();
      setSteakType(categorizeCookingType(responseData["prediction"]));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <TouchableOpacity
        style={styles.pickImageButton}
        onPress={pickImage}>
        <Text style={styles.pickImageButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Button
          title="Pick an image from camera roll"
          onPress={pickImage}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  pickImageButton: {
    backgroundColor: "green",
    padding: 10,
    margin: 10,
  },
  pickImageButtonText: {
    fontSize: 18,
    color: "white",
  },
});
