import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useHistory, Plant } from '../context/HistoryContext';

// Import local images
const roseImage = require('../../assets/rose.png');
const sunflowerImage = require('../../assets/sunflower.png');

// Mock history data (in a real app, this would come from local storage or a database)
const MOCK_HISTORY = [
    {
        id: '1',
        timestamp: '2024-03-28T20:00:00Z',
        plant: {
            id: '1',
            scientificName: 'Rosa',
            commonName: 'Rose',
            image: roseImage,
            description: 'A beautiful flowering plant from the genus Rosa, known for its fragrant flowers and thorny stems.',
        },
    },
    {
        id: '2',
        timestamp: '2024-03-28T19:30:00Z',
        plant: {
            id: '2',
            scientificName: 'Helianthus annuus',
            commonName: 'Sunflower',
            image: sunflowerImage,
            description: 'A tall, annual plant known for its large, yellow flower heads and edible seeds.',
        },
    },
];

export default function HistoryScreen() {
    const { history } = useHistory();
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderHistoryItem = ({ item }: { item: typeof history[0] }) => (
        <TouchableOpacity 
            style={styles.historyItem}
            onPress={() => setSelectedPlant(item.plant)}
        >
            <Image source={item.plant.image} style={styles.plantImage} />
            <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{item.plant.commonName}</Text>
                <Text style={styles.scientificName}>{item.plant.scientificName}</Text>
                <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
            </View>
        </TouchableOpacity>
    );

    if (selectedPlant) {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => setSelectedPlant(null)}
                >
                    <Text style={styles.backButtonText}>← Back to History</Text>
                </TouchableOpacity>

                <View style={styles.resultContainer}>
                    <Text style={styles.plantName}>{selectedPlant.commonName}</Text>
                    <Text style={styles.scientificName}>{selectedPlant.scientificName}</Text>
                    
                    <Image
                        source={selectedPlant.image}
                        style={styles.detailPlantImage}
                        resizeMode="contain"
                    />
                    
                    <Text style={styles.description}>{selectedPlant.description}</Text>
                    
                    <View style={styles.careContainer}>
                        <Text style={styles.careTitle}>Care Instructions:</Text>
                        <Text style={styles.careText}>Watering: {selectedPlant.careInstructions.watering}</Text>
                        <Text style={styles.careText}>Sunlight: {selectedPlant.careInstructions.sunlight}</Text>
                        <Text style={styles.careText}>Soil: {selectedPlant.careInstructions.soil}</Text>
                    </View>

                    {selectedPlant.diseases && (
                        <View style={[styles.careContainer, styles.diseasesContainer]}>
                            <Text style={styles.careTitle}>Common Diseases:</Text>
                            {selectedPlant.diseases.map((disease, index) => (
                                <Text key={index} style={styles.diseaseText}>• {disease}</Text>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.title}>Search History</Text>
            {history.length > 0 ? (
                <FlatList
                    data={history}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No search history yet</Text>
                    <Text style={styles.emptySubtext}>Your searched plants will appear here</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listContainer: {
        padding: 16,
    },
    historyItem: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    plantImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    plantInfo: {
        flex: 1,
        justifyContent: 'center',
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
    timestamp: {
        fontSize: 12,
        color: '#999',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    backButton: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButtonText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    resultContainer: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    detailPlantImage: {
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