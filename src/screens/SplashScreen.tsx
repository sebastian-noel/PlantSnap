import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { COLORS, FONTS, SIZES } from '../constants/theme';

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList) => void;
};

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]).start(() => {
      navigation.navigate('Main');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Plant Snap</Text>
        <Text style={styles.subtitle}>Identify plants instantly</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.extraLarge * 2,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.base,
  },
  subtitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
}); 