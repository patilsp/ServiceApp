"use client";

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
        router.push("/screens/AdminDashboard");
      } else {
        router.push("/screens/HomeScreen");
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Login failed ❌", text2: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, backgroundColor: "#f9f9f9" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        className="border p-2 w-full rounded mb-4"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        className="border p-2 w-full rounded mb-4"
      />
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 p-3 rounded w-full items-center"
      >
        <Text className="text-white font-bold">{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}


// ✅ Styled components
const styles = {
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
};