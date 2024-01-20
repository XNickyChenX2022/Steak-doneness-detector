import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  CameraRoll,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera } from "expo-camera";
import getImageType from "../utils/imageType";
import categorizeCookingType from "../utils/steakTypes";
import { BACKEND_URL } from "@env";
export default function CameraComponent({ toggleCamera, setSteakType }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 240, height: 240 } }], // resize to width of 300 and preserve aspect ratio
        { compress: 1, format: "jpeg" }
      );
      toggleCamera();
      try {
        let body = new FormData();
        body.append("file", {
          uri: resizedPhoto.uri,
          name: getImageType(resizedPhoto.uri)[0],
          filename: getImageType(resizedPhoto.uri)[0],
          type: getImageType(resizedPhoto.uri)[1],
        });
        console.log(BACKEND_URL);
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
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1, width: Dimensions.get("window").width }}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}>
        <View style={styles.cameraView}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}>
            <Text style={styles.captureButtonText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={toggleCamera}>
            <Text style={styles.captureButtonText}>Close Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
  },
  captureButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    margin: 20,
  },
  captureButtonText: {
    fontSize: 18,
    color: "#000",
  },
});
