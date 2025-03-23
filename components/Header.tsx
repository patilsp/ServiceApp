import React, { useState, useRef, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Animated, Image, ActivityIndicator, Pressable 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

export default function Header({ onMenuPress }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    if (dropdownVisible) {
      Animated.timing(dropdownAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      Animated.timing(dropdownAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    setDropdownVisible(false);
    router.push("/Login");
  };

  return (
    <LinearGradient
      colors={["#1e90ff", "#00bfff"]}
      style={[styles.header, { paddingTop: insets.top }]}
    >
      <Animatable.View animation="fadeInDown" duration={800} style={styles.headerContent}>
        {/* Menu Button */}
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={28} color="#fff" />
        </TouchableOpacity>
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Excellent Service</Text>
        </View>
        
        {/* User Section */}
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : user ? (
          <TouchableOpacity onPress={toggleDropdown} style={styles.userButton}>
            <Image 
              source={{ uri: user.profile_pic || "https://api.a0.dev/assets/image?text=professional%20business%20person%20portrait&aspect=1:1" }}
              style={styles.userAvatar}
            />
            <LinearGradient
              colors={["#4CAF50", "#2E7D32"]}
              style={styles.userStatus}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.push("/LoginScreen")} style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </Animatable.View>

      {/* Background Overlay for closing the dropdown */}
      {dropdownVisible && (
        <Pressable style={styles.overlay} onPress={toggleDropdown} />
      )}

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <Animated.View 
          style={[
            styles.dropdown,
            {
              transform: [{
                translateY: dropdownAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              }],
              opacity: dropdownAnimation,
            },
          ]}
        >
          {/* User Info */}
          <LinearGradient
            colors={["#f0f8ff", "#e3f2fd"]}
            style={styles.dropdownHeader}
          >
            <Image 
              source={{ uri: user.profile_pic || "https://api.a0.dev/assets/image?text=professional%20business%20person%20portrait&aspect=1:1" }}
              style={styles.dropdownAvatar}
            />
            <View style={styles.dropdownUserInfo}>
              <Text style={styles.dropdownName}>{user.name}</Text>
              <Text style={styles.dropdownEmail}>{user.email}</Text>
            </View>
          </LinearGradient>
          
          <View style={styles.dropdownDivider} />
          
          {/* Menu Items */}
          <TouchableOpacity style={styles.dropdownItem} onPress={() => router.push("/(tabs)/Profile")}>
            <Ionicons name="person-outline" size={20} color="#333" />
            <Text style={styles.dropdownText}>My Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dropdownItem} onPress={() => console.log("Settings")}>
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.dropdownText}>Settings</Text>
          </TouchableOpacity>
          
          <View style={styles.dropdownDivider} />
          
          {/* Logout */}
          <TouchableOpacity onPress={handleLogout} style={[styles.dropdownItem, styles.logoutItem]}>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    position: "relative",
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
  },
  menuButton: {
    padding: 8,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
  userButton: {
    position: "relative",
    padding: 4,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userStatus: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#fff",
  },
  loginButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginText: {
    color: "#1e90ff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 999,
  },
  dropdown: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    width: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  dropdownAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  dropdownUserInfo: {
    flex: 1,
  },
  dropdownName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Roboto-Bold",
    marginBottom: 5,
  },
  dropdownEmail: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Roboto",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Roboto",
  },
  logoutItem: {
    paddingBottom: 15,
  },
  logoutText: {
    color: "#FF3B30",
    fontFamily: "Roboto-Bold",
  },
});