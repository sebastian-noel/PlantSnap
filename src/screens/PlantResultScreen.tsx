import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';
import { PlantIdentificationResult } from '../services/plantIdentification';

type RouteParams = {
  photoUri: string;
  result: PlantIdentificationResult;
};

type NavigationProp = {
  navigate: (screen: keyof HomeStackParamList) => void;
  goBack: () => void;
};

export default function PlantResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { photoUri, result } = route.params as RouteParams;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={SIZES.extraLarge} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Plant Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: photoUri }} style={styles.plantImage} />
        
        <View style={styles.resultContainer}>
          <Text style={styles.scientificName}>{result.scientificName}</Text>
          <Text style={styles.commonName}>{result.commonName}</Text>
          <Text style={styles.confidence}>
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Care Instructions</Text>
            <View style={styles.careItem}>
              <Ionicons name="water" size={SIZES.large} color={COLORS.primary} />
              <Text style={styles.careText}>{result.careInstructions.watering}</Text>
            </View>
            <View style={styles.careItem}>
              <Ionicons name="sunny" size={SIZES.large} color={COLORS.primary} />
              <Text style={styles.careText}>{result.careInstructions.sunlight}</Text>
            </View>
            <View style={styles.careItem}>
              <Ionicons name="leaf" size={SIZES.large} color={COLORS.primary} />
              <Text style={styles.careText}>{result.careInstructions.soil}</Text>
            </View>
          </View>

          {result.diseases && result.diseases.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Potential Diseases</Text>
              {result.diseases.map((disease, index) => (
                <View key={index} style={styles.diseaseItem}>
                  <Text style={styles.diseaseName}>{disease.name}</Text>
                  <Text style={styles.diseaseDescription}>{disease.description}</Text>
                  <Text style={styles.diseaseTreatment}>{disease.treatment}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    padding: SIZES.base,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginLeft: SIZES.medium,
  },
  content: {
    flex: 1,
  },
  plantImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  resultContainer: {
    padding: SIZES.medium,
  },
  scientificName: {
    fontSize: SIZES.extraLarge,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  commonName: {
    fontSize: SIZES.large,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    marginBottom: SIZES.base,
  },
  confidence: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginBottom: SIZES.medium,
  },
  section: {
    marginTop: SIZES.medium,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.medium,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  careText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginLeft: SIZES.medium,
    flex: 1,
  },
  diseaseItem: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.medium,
    borderRadius: SIZES.base,
    marginBottom: SIZES.medium,
  },
  diseaseName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  diseaseDescription: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginBottom: SIZES.base,
  },
  diseaseTreatment: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.primary,
  },
}); 