import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const userStats = [
    { icon: 'water-outline', label: 'Active Services', value: '2' },
    { icon: 'calendar-outline', label: 'Appointments', value: '3' },
    { icon: 'time-outline', label: 'Service Hours', value: '24' },
  ];

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile' },
    { icon: 'notifications-outline', label: 'Notifications' },
    { icon: 'card-outline', label: 'Payment Methods' },
    { icon: 'settings-outline', label: 'Settings' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
    { icon: 'log-out-outline', label: 'Logout' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://api.a0.dev/assets/image?text=professional%20business%20person%20portrait&aspect=1:1' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#0088CC" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        {userStats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Ionicons name={stat.icon as any} size={24} color="#0088CC" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Ionicons name={item.icon as any} size={24} color="#0088CC" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#0088CC',
    marginLeft: 8,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  },
});