import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const services = [
    {
      title: 'Water Purifier Installation',
      description: 'Professional installation of RO & UV purifiers',
      icon: 'build-outline',
    },
    {
      title: 'Maintenance Service',
      description: 'Regular maintenance and filter replacement',
      icon: 'settings-outline',
    },
    {
      title: 'Water Testing',
      description: 'Complete water quality analysis',
      icon: 'flask-outline',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://api.a0.dev/assets/image?text=modern%20water%20purifier%20device%20in%20luxury%20kitchen&aspect=16:9' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Pure Water, Healthy Life</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.serviceCards}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <Ionicons name={service.icon as any} size={32} color="#0088CC" />
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: '#0088CC',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  servicesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  serviceCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});