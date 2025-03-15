"use client";

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  onMenuPress: () => void;
}

export default function Header({ onMenuPress }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownAnimation = new Animated.Value(0);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    Animated.spring(dropdownAnimation, {
      toValue: dropdownVisible ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu-outline" size={24} color="#FFF" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Excellent Services</Text>
      
      <TouchableOpacity onPress={toggleDropdown} style={styles.userButton}>
        <Ionicons name="person-circle-outline" size={24} color="#FFF" />
      </TouchableOpacity>

      {dropdownVisible && (
        <Animated.View 
          style={[
            styles.dropdown,
            {
              transform: [{
                scale: dropdownAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1]
                })
              }],
              opacity: dropdownAnimation
            }
          ]}
        >
          <TouchableOpacity style={styles.dropdownItem}>
            <Ionicons name="person-outline" size={20} color="#333" />
            <Text style={styles.dropdownText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.dropdownText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Ionicons name="log-out-outline" size={20} color="#333" />
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0088CC',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 4,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userButton: {
    padding: 4,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dropdownText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});