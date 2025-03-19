"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({ type: "error", text1: "All fields are required" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: password,
        role,
      });

      Toast.show({ type: "success", text1: "Registration successful! 🎉" });

      // ✅ Store token in AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);

      router.push("/"); 
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed ❌";
      Toast.show({ type: "error", text1: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (

    <ImageBackground source={require("../assets/images/banner.jpg")} style={styles.background} resizeMode="cover">

     
        <View style={styles.loginBlock}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Create an Account</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <Toast />
    </View>
    </ImageBackground>
  );
}

// ✅ Styled components
const styles = {
  background: {
    flex: 1,
    width: "100%",
    height: "100%", 
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginBlock: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -174 }], 
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: 400,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
};
