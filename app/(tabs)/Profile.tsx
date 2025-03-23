import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const router = useRouter();

  const userStats = [
    { icon: 'water-outline', label: 'Active Services', value: '2' },
    { icon: 'calendar-outline', label: 'Appointments', value: '3' },
    { icon: 'time-outline', label: 'Service Hours', value: '24' },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.push("/Login"); // Redirect to LoginScreen
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', onPress: () => console.log('Edit Profile') },
    { icon: 'notifications-outline', label: 'Notifications', onPress: () => console.log('Notifications') },
    { icon: 'card-outline', label: 'Payment Methods', onPress: () => console.log('Payment Methods') },
    { icon: 'settings-outline', label: 'Settings', onPress: () => console.log('Settings') },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => console.log('Help & Support') },
    { icon: 'log-out-outline', label: 'Logout', onPress: handleLogout },
  ];

  return (
    <LinearGradient colors={["#87cefa", "#f0f8ff"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=professional%20business%20person%20portrait&aspect=1:1' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Stats Section */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.statsContainer}>
          {userStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Ionicons name={stat.icon as any} size={24} color="#1e90ff" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </Animatable.View>

        {/* Menu Section */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.label === 'Logout' ? '#FF3B30' : '#1e90ff'}
                />
              </View>
              <Text style={[
                styles.menuLabel,
                item.label === 'Logout' && styles.logoutText
              ]}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#1e90ff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'SpaceMono',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'SpaceMono',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'SpaceMono',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'SpaceMono',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'SpaceMono',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
});