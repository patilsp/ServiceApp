// app/LoginScreen.js
"use client";

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({ type: "error", text1: "All fields are required" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });

      await AsyncStorage.setItem("token", response.data.token); // Use AsyncStorage instead of localStorage

      Toast.show({ type: "success", text1: "Login successful! 🎉" });

      // Redirect based on user role
      const role = response.data.user.role;
      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/(tabs)/Services"); // Redirect to Services tab
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Login failed ❌", text2: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/banner.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient colors={["rgba(135,206,250,0.8)", "rgba(240,248,255,0.8)"]} style={styles.overlay}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.loginBlock}>
          <Image
            source={require("../assets/images/logo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
            <LinearGradient colors={["#1e90ff", "#00bfff"]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Don't have an account?{" "}
            <Text style={styles.createLink} onPress={() => router.push("/RegisterScreen")}>
              Create New Here
            </Text>
          </Text>
        </Animatable.View>
      </LinearGradient>
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBlock: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e90ff",
    fontFamily: "SpaceMono",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    fontFamily: "SpaceMono",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "SpaceMono",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    fontFamily: "SpaceMono",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    borderRadius: 12,
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
  loginText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "SpaceMono",
    marginTop: 20,
    textAlign: "center",
  },
  createLink: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});