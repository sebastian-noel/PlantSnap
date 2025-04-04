import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { MainTabParamList } from '../navigation/types';

type NavigationProp = {
  navigate: (screen: keyof MainTabParamList, params?: any) => void;
};

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>App preferences and information</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testing</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Test')}
        >
          <Text style={styles.buttonText}>Test API Integration</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.extraLarge * 1.5,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.base,
  },
  subtitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginBottom: SIZES.extraLarge,
  },
  section: {
    marginBottom: SIZES.extraLarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.base,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
  },
}); 