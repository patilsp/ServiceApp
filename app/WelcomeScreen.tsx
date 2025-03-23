// app/WelcomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import PrimaryButton from '../components/PrimaryButton';

export default function WelcomeScreen({ onEnter }) {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/Login");
  };

  return (
    <LinearGradient colors={["#87cefa", "#f0f8ff"]} style={styles.container}>
      <Animatable.View animation="zoomIn" duration={1000} style={styles.content}>
        <Text style={styles.title}>Welcome to WaterPure</Text>
        <Text style={styles.subtitle}>Your one-stop solution for water purifier services</Text>
        {/* <TouchableOpacity style={styles.button} onPress={onEnter}>
          <LinearGradient colors={["#1e90ff", "#00bfff"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Get Started</Text>
            
          </LinearGradient>
        </TouchableOpacity> */}
        <PrimaryButton title="Get Started" onPress={handleGetStarted} />
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1e90ff",
    fontFamily: "SpaceMono",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    fontFamily: "SpaceMono",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    borderRadius: 12,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
});