import React, { useState, useRef } from "react";
import { View, Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Header from "../components/Header"; 
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const translateX = useRef(new Animated.Value(-280)).current;

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev); 
    Animated.spring(translateX, {
      toValue: isSidebarVisible ? -280 : 0,
      useNativeDriver: true,
      friction: 5, 
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Header with menu button */}
      <Header onMenuPress={toggleSidebar} />

      {/* Sidebar for navigation */}
      {isSidebarVisible && ( // ✅ Detect outside touches
        <TouchableWithoutFeedback onPress={toggleSidebar}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX }] }]}>
        <Sidebar onClose={toggleSidebar} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 280,
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  overlay: { 
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: "rgba(0,0,0,0.3)" 
  },
});
