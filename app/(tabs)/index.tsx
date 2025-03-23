// app/(tabs)/index.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // For icons

export default function DashboardScreen() {
  const router = useRouter();

  const handleBookService = () => {
    router.push("/(tabs)/BookService");
  };

  const handleViewRequests = () => {
    router.push("/(tabs)/Services"); // Assuming Services shows requests
  };

  return (
    <LinearGradient colors={["#87cefa", "#f0f8ff"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
          <Text style={styles.headerTitle}>Welcome, Customer!</Text>
          <Text style={styles.headerSubtitle}>Manage your water purifier services</Text>
        </Animatable.View>

        {/* Quick Actions */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleBookService}>
              <LinearGradient colors={["#1e90ff", "#00bfff"]} style={styles.buttonGradient}>
                <Ionicons name="calendar-outline" size={24} color="#fff" />
                <Text style={styles.actionText}>Book Service</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleViewRequests}>
              <LinearGradient colors={["#1e90ff", "#00bfff"]} style={styles.buttonGradient}>
                <Ionicons name="list-outline" size={24} color="#fff" />
                <Text style={styles.actionText}>View Requests</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Service Status */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.card}>
          <Text style={styles.cardTitle}>Service Status</Text>
          <View style={styles.statusItem}>
            <Text style={styles.statusText}>Last Service: 2025-03-15</Text>
            <Text style={styles.statusSubText}>Filter Change - Completed</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusText}>Next Due: 2025-09-15</Text>
            <Text style={styles.statusSubText}>Maintenance - Scheduled</Text>
          </View>
        </Animatable.View>

        {/* Account Info */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.card}>
          <Text style={styles.cardTitle}>Your Account</Text>
          <Text style={styles.infoText}>Email: customer@example.com</Text>
          <Text style={styles.infoText}>Plan: Premium Care</Text>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e90ff",
    fontFamily: "Roboto-Bold",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Roboto-Bold",
    marginTop: 5,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Roboto-Bold",
    marginBottom: 15,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  buttonGradient: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    marginLeft: 10,
  },
  statusItem: {
    marginBottom: 15,
  },
  statusText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Roboto-Bold",
  },
  statusSubText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Roboto-Bold",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#1e90ff",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: "#1e90ff",
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
  },
});