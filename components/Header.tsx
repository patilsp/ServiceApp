import React, { useState, useRef, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Animated, Image, ActivityIndicator, Pressable 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";

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
      // Closing dropdown
      Animated.timing(dropdownAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setDropdownVisible(false));
    } else {
      // Opening dropdown
      setDropdownVisible(true);
      Animated.timing(dropdownAnimation, {
        toValue: 1,
        duration: 200,
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
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerContent}>
        {/* Menu Button */}
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Excellent Service</Text>
        </View>
        
        {/* User Section */}
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : user ? (
          <TouchableOpacity onPress={toggleDropdown} style={styles.userButton}>
            <Image 
              source={{ uri: user.profile_pic || "https://api.a0.dev/assets/image?text=professional%20business%20person%20portrait&aspect=1:1" }}
              style={styles.userAvatar}
            />
            <View style={styles.userStatus} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.push("/Login")} style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Background Overlay for closing the dropdown when clicking outside */}
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
                  outputRange: [-10, 0]
                })
              }],
              opacity: dropdownAnimation,
            }
          ]}
        >
          {/* User Info */}
          <View style={styles.dropdownHeader}>
            <Image 
              source={{ uri: user.profile_pic || "https://api.a0.dev/assets/image?text=professional%20business%20person%20portrait&aspect=1:1" }}
              style={styles.dropdownAvatar}
            />
            <View style={styles.dropdownUserInfo}>
              <Text style={styles.dropdownName}>{user.name}</Text>
              <Text style={styles.dropdownEmail}>{user.email}</Text>
            </View>
          </View>
          
          <View style={styles.dropdownDivider} />
          
          {/* Menu Items */}
          <TouchableOpacity style={styles.dropdownItem}>
            <Ionicons name="person-outline" size={20} color="#333" />
            <Text style={styles.dropdownText}>My Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dropdownItem}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  // header: {
  //   backgroundColor: "#0088CC",
  //   elevation: 4,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
  // },
  header: {
    backgroundColor: "#0088CC",
    elevation: 10, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: "relative",
    zIndex: 1000,
  },
  
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
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
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  userButton: {
    position: "relative",
    padding: 4,
  },
  dropdownUserInfo: {
    padding: 5,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  userStatus: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#0088CC",
  },
  loginButton: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  loginText: {
    color: "#0088CC",
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdown: {
    position: "absolute",
    top: 60, 
    right: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },

  dropdownHeader: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  dropdownAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 16,
    gap: "10px"
  },
  logoutText: {
    color: "#FF3B30",
  },
});
