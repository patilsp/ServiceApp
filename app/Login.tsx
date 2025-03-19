"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

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

      Toast.show({ type: "success", text1: "Login successful! 🎉" });

      localStorage.setItem("token", response.data.token);

      // Redirect based on user role
      const role = response.data.user.role;
      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Login failed ❌", text2: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/images/banner.jpg")} style={styles.background} resizeMode="cover">

     
        <View style={styles.loginBlock}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
          </TouchableOpacity>
        </View>
      
    </ImageBackground>
  );
}

// ✅ Styles for better UI
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%", 
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBlock: {
    position: "absolute",
    top: "50%",
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
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
    fontSize: 18,
    fontWeight: "bold",
  },
});
  