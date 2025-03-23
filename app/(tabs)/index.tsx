import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const router = useRouter();

  const categories = [
    { icon: 'build-outline', label: 'Repair', onPress: () => router.push('/(tabs)/BookService') },
    { icon: 'water-outline', label: 'Plumber', onPress: () => console.log('Plumber') },
    { icon: 'flash-outline', label: 'Electrician', onPress: () => console.log('Electrician') },
    { icon: 'brush-outline', label: 'Cleaning', onPress: () => console.log('Cleaning') },
    { icon: 'color-palette-outline', label: 'Painting', onPress: () => console.log('Painting') },
    { icon: 'restaurant-outline', label: 'Cooking', onPress: () => console.log('Cooking') },
  ];

  const popularServices = [
    { title: 'Air conditioner Repair', rating: 4.8, provider: 'Jane Cooper', image: 'https://api.a0.dev/assets/image?text=air%20conditioner%20repair&aspect=1:1' },
    { title: 'Plumbing Service', rating: 4.5, provider: 'John Smith', image: 'https://api.a0.dev/assets/image?text=plumbing%20service&aspect=1:1' },
    { title: 'Electrical Wiring', rating: 4.7, provider: 'Emily Davis', image: 'https://api.a0.dev/assets/image?text=electrical%20wiring&aspect=1:1' },
  ];

  return (
    <LinearGradient colors={['#87cefa', '#f0f8ff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Promotional Banner */}
        <Animatable.View animation="fadeInDown" duration={1000}>
          <LinearGradient
            colors={['#1e90ff', '#00bfff']}
            style={styles.banner}
          >
            <View style={styles.bannerTextContainer}>
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>20%</Text>
                <Ionicons name="flame-outline" size={20} color="#FF3B30" style={styles.flameIcon} />
              </View>
              <Text style={styles.bannerTitle}>Today’s Special!</Text>
              <Text style={styles.bannerSubtitle}>Get Discount on Every Service Only for Today</Text>
            </View>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=worker%20giving%20thumbs%20up&aspect=1:1' }}
              style={styles.bannerImage}
            />
          </LinearGradient>
        </Animatable.View>

        {/* Categories Section */}
        <Animatable.View animation="fadeInUp" delay={200}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => console.log('See All Categories')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={category.onPress}
              >
                <Ionicons name={category.icon as any} size={30} color="#fff" style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>

        {/* Popular Services Section */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={() => console.log('See All Services')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {popularServices.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceCard}
              onPress={() => router.push('/(tabs)/BookService')}
            >
              <Image source={{ uri: service.image }} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                </View>
                <Text style={styles.providerText}>{service.provider}</Text>
              </View>
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  banner: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  bannerTextContainer: {
    flex: 1,
    padding: 20,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Roboto-Bold',
  },
  flameIcon: {
    marginLeft: 5,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Roboto',
  },
  bannerImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto-Bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#1e90ff',
    fontFamily: 'Roboto',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '30%',
    backgroundColor: '#1e90ff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  categoryIcon: {
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Roboto',
    marginLeft: 5,
  },
  providerText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Roboto',
  },
});