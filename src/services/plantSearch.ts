import { Platform } from 'react-native';
import { API_KEYS } from '../config/api';

const API_URL = Platform.select({
    web: 'http://localhost:8000',
    default: 'http://10.0.2.2:8000', // Android emulator localhost
});

const TREFLE_API_URL = 'https://trefle.io/api/v1';

export interface PlantSearchResult {
    id: string;
    scientificName: string;
    commonName: string;
    thumbnailUrl: string;
    description: string;
}

export async function searchPlants(query: string): Promise<PlantSearchResult[]> {
    try {
        // First, try to get a list of plants
        const url = `${TREFLE_API_URL}/plants?token=${API_KEYS.TREFLE}&filter[common_name]=${encodeURIComponent(query)}`;
        console.log('Making API request to:', url);
        console.log('Using Trefle API key:', API_KEYS.TREFLE);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            throw new Error(`Invalid JSON response: ${responseText}`);
        }

        if (!response.ok) {
            throw new Error(data.error || 'Failed to search plants');
        }

        if (!data.data || !Array.isArray(data.data)) {
            throw new Error('Invalid response format from API');
        }

        return data.data.map((plant: any) => ({
            id: plant.id.toString(),
            scientificName: plant.scientific_name || 'Unknown',
            commonName: plant.common_name || 'Unknown',
            thumbnailUrl: plant.image_url || '',
            description: plant.description || 'No description available',
        }));
    } catch (error: any) {
        console.error('Error searching plants:', error);
        if (error.message === 'Failed to fetch') {
            console.error('Network error details:', {
                message: error.message,
                stack: error.stack,
                cause: error.cause,
            });
        }
        throw new Error(error.message || 'Failed to search plants');
    }
}

export async function getPlantDetails(id: string): Promise<PlantIdentificationResult> {
    try {
        const url = `${TREFLE_API_URL}/plants/${id}?token=${API_KEYS.TREFLE}`;
        console.log('Making API request to:', url);
        console.log('Using Trefle API key:', API_KEYS.TREFLE);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Raw response:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            throw new Error(`Invalid JSON response: ${responseText}`);
        }

        if (!response.ok) {
            throw new Error(data.error || 'Failed to get plant details');
        }

        if (!data.data) {
            throw new Error('No data received from API');
        }

        const plant = data.data;

        return {
            scientificName: plant.scientific_name || 'Unknown',
            commonName: plant.common_name || 'Unknown',
            confidence: 1, // Trefle doesn't provide confidence scores
            careInstructions: {
                watering: plant.watering || 'Watering information not available',
                sunlight: plant.sunlight || 'Sunlight information not available',
                soil: plant.soil || 'Soil information not available',
            },
            diseases: [], // Trefle doesn't provide disease information
        };
    } catch (error: any) {
        console.error('Error getting plant details:', error);
        if (error.message === 'Failed to fetch') {
            console.error('Network error details:', {
                message: error.message,
                stack: error.stack,
                cause: error.cause,
            });
        }
        throw new Error(error.message || 'Failed to get plant details');
    }
} 