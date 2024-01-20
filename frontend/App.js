import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import PhotoComponent from "./components/photo";
import CameraComponent from "./components/Camera";
import { useState, useEffect } from "react";
export default function App() {
  const [openCamera, setOpenCamera] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [steakType, setSteakType] = useState(null);
  const toggleCamera = () => {
    setOpenCamera(!openCamera);
  };
  const clearText = () => {
    setSteakType(null);
  };
  return (
    <View style={styles.container}>
      {!openCamera && (
        <View style={styles.centeredContainer}>
          <Text style={styles.titleFont}>Steak Doneness Detector</Text>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={toggleCamera}>
            <Text style={styles.captureButtonText}>Open Camera</Text>
          </TouchableOpacity>
          <PhotoComponent setSteakType={setSteakType} />
          {steakType && (
            <>
              <Text>The steak is {steakType}</Text>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearText}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
      {openCamera && (
        <CameraComponent
          toggleCamera={toggleCamera}
          setSteakType={setSteakType}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleFont: {
    fontSize: 24,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
  },
  captureButtonText: {
    fontSize: 18,
    color: "white",
  },
  textFont: {
    fontsize: 18,
  },
  clearButton: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
  },
  clearButtonText: {
    fontSize: 18,
    color: "white",
  },
});
