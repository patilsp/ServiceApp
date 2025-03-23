import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: object; // Optional custom styles
  disabled?: boolean; // Optional disabled state
}

export default function PrimaryButton({ title, onPress, style, disabled = false }: PrimaryButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current; // For hover scale effect

  const handlePressIn = () => {
    if (Platform.OS === 'web') {
      Animated.spring(scaleAnim, {
        toValue: 1.05, // Slight scale up on hover/press
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (Platform.OS === 'web') {
      Animated.spring(scaleAnim, {
        toValue: 1, // Return to original size
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8} // Slight opacity change on press for mobile
      style={[styles.buttonContainer, style, disabled && styles.disabled]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <LinearGradient
          colors={disabled ? ['#ccc', '#aaa'] : ['#1e90ff', '#00bfff']} // Gray if disabled
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden', // Ensure gradient stays within bounds
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold', // Using Roboto-Bold from your font setup
  },
  disabled: {
    opacity: 0.6, // Visual feedback for disabled state
  },
});