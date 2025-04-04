import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { PlantSearchResult } from '../services/plantSearch';

interface PlantCardProps {
  plant: PlantSearchResult;
  onPress: () => void;
}

export default function PlantCard({ plant, onPress }: PlantCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: plant.thumbnailUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.scientificName}>{plant.scientificName}</Text>
        <Text style={styles.commonName}>{plant.commonName}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {plant.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    marginBottom: SIZES.medium,
    ...SHADOWS.light,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: SIZES.base,
    borderBottomLeftRadius: SIZES.base,
  },
  content: {
    flex: 1,
    padding: SIZES.medium,
  },
  scientificName: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.base / 2,
  },
  commonName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    marginBottom: SIZES.base,
  },
  description: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    lineHeight: SIZES.medium,
  },
}); 