import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { MOCK_PLANTS, useHistory, Plant } from '../context/HistoryContext';

// Import local images
const roseImage = require('../../assets/rose.png');
const sunflowerImage = require('../../assets/sunflower.png');

// Mock data for testing
const MOCK_PLANTS_OBJ = {
    rose: {
        id: '1',
        scientificName: 'Rosa',
        commonName: 'Rose',
        image: roseImage,
        description: 'A beautiful flowering plant from the genus Rosa, known for its fragrant flowers and thorny stems. Roses come in many colors, with red being the most iconic.',
        careInstructions: {
            watering: 'Water deeply once or twice a week, keeping the soil moist but not waterlogged.',
            sunlight: 'Full sun to partial shade, at least 6 hours of direct sunlight daily.',
            soil: 'Well-draining, rich soil with pH between 6.0 and 6.5.',
        },
    },
    sunflower: {
        id: '2',
        scientificName: 'Helianthus annuus',
        commonName: 'Sunflower',
        image: sunflowerImage,
        description: 'A tall, annual plant known for its large, yellow flower heads and edible seeds.',
        careInstructions: {
            watering: 'Regular watering, especially during dry periods.',
            sunlight: 'Full sun, at least 6-8 hours of direct sunlight daily.',
            soil: 'Well-draining, nutrient-rich soil.',
        },
    },
} as const;

type PlantType = typeof MOCK_PLANTS_OBJ[keyof typeof MOCK_PLANTS_OBJ];

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState<Plant | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { addToHistory } = useHistory();

    const handleSearch = () => {
        setError(null);
        const searchTerm = searchQuery.toLowerCase().trim();
        const plant = MOCK_PLANTS.find(
            plant => 
                plant.commonName.toLowerCase().includes(searchTerm) ||
                plant.scientificName.toLowerCase().includes(searchTerm)
        );
        
        if (plant) {
            setResult(plant);
            addToHistory(plant);
        } else {
            setError('Plant not found. Try searching for "rose", "sunflower", "lavender", "monstera", or "orchid".');
            setResult(null);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
            <ScrollView style={styles.container} bounces={true} alwaysBounceVertical={true} contentInsetAdjustmentBehavior="automatic">
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Enter plant name (e.g., rose, lavender)"
                    placeholderTextColor="#666"
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.plantName}>{result.commonName}</Text>
                    <Text style={styles.scientificName}>{result.scientificName}</Text>
                    
                    <Image
                        source={result.image}
                        style={styles.plantImage}
                        resizeMode="contain"
                    />
                    
                    <Text style={styles.description}>{result.description}</Text>
                    
                    <View style={styles.careContainer}>
                        <Text style={styles.careTitle}>Care Instructions:</Text>
                        <Text style={styles.careText}>Watering: {result.careInstructions.watering}</Text>
                        <Text style={styles.careText}>Sunlight: {result.careInstructions.sunlight}</Text>
                        <Text style={styles.careText}>Soil: {result.careInstructions.soil}</Text>
                    </View>

                    {result.diseases && (
                        <View style={[styles.careContainer, styles.diseasesContainer]}>
                            <Text style={styles.careTitle}>Common Diseases:</Text>
                            {result.diseases.map((disease, index) => (
                                <Text key={index} style={styles.diseaseText}>• {disease}</Text>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginRight: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    errorText: {
        color: '#c62828',
        fontSize: 16,
    },
    resultContainer: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
    },
    plantName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    scientificName: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 16,
    },
    plantImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    careContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    diseasesContainer: {
        marginTop: 8,
    },
    careTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    careText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 4,
    },
    diseaseText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 4,
        color: '#666',
    },
}); 