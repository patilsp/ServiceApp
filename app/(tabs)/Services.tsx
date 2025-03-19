import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ServicesScreen() {
  const services = [
    {
      id: '1',
      title: 'RO Water Purifier',
      price: '$299',
      description: 'Advanced RO purification system with 7 stages of filtration',
      image: 'https://api.a0.dev/assets/image?text=modern%20RO%20water%20purifier%20system&aspect=4:3',
    },
    {
      id: '2',
      title: 'UV Water Purifier',
      price: '$199',
      description: 'UV technology for complete bacterial purification',
      image: 'https://api.a0.dev/assets/image?text=UV%20water%20purification%20system%20modern&aspect=4:3',
    },
    {
      id: '3',
      title: 'Water Softener',
      price: '$399',
      description: 'Advanced water softening system for hard water treatment',
      image: 'https://api.a0.dev/assets/image?text=modern%20water%20softener%20system&aspect=4:3',
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceTitle}>{item.title}</Text>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Ionicons name="calendar-outline" size={20} color="white" />
          <Text style={styles.bookButtonText}>Book Service</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 200,
  },
  serviceContent: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 18,
    color: '#0088CC',
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: '#666',
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: '#0088CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});