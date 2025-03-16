import React, { useState, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Header from "../components/Header"; 
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const translateX = useRef(new Animated.Value(-280)).current;

  const toggleSidebar = () => {
    Animated.spring(translateX, {
      toValue: isSidebarVisible ? -280 : 0,
      useNativeDriver: true,
      friction: 8,
    }).start();

    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header with menu button */}
      <Header onMenuPress={toggleSidebar} />

      {/* Sidebar for navigation */}
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
});
