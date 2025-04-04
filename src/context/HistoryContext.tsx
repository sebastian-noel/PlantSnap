import React, { createContext, useContext, useState, ReactNode } from 'react';

// Import local images
const roseImage = require('../../assets/rose.png');
const sunflowerImage = require('../../assets/sunflower.png');

export interface Plant {
    id: string;
    scientificName: string;
    commonName: string;
    image: any; // Using any for now since we're using require for images
    description: string;
    careInstructions: {
        watering: string;
        sunlight: string;
        soil: string;
    };
    diseases: string[];
}

export interface HistoryItem {
    id: string;
    timestamp: string;
    plant: Plant;
}

interface HistoryContextType {
    history: HistoryItem[];
    addToHistory: (plant: Plant) => void;
    clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

// Mock data for testing
const MOCK_PLANTS: Plant[] = [
    {
        id: '1',
        commonName: 'Rose',
        scientificName: 'Rosa',
        description: 'A woody perennial flowering plant known for its beauty and fragrance.',
        image: roseImage,
        careInstructions: {
            watering: 'Water deeply but infrequently, provide full sun, prune regularly.',
            sunlight: 'Full sun',
            soil: 'Well-draining, rich soil with pH between 6.0 and 6.5.',
        },
        diseases: ['Black spot', 'Powdery mildew', 'Rust']
    },
    {
        id: '2',
        commonName: 'Sunflower',
        scientificName: 'Helianthus annuus',
        description: 'Tall annual plant with large yellow flower heads that track the sun.',
        image: sunflowerImage,
        careInstructions: {
            watering: 'Regular watering, especially during dry periods.',
            sunlight: 'Full sun, at least 6-8 hours of direct sunlight daily.',
            soil: 'Well-draining, nutrient-rich soil.',
        },
        diseases: ['Downy mildew', 'Rust', 'Stem rot']
    },
    {
        id: '3',
        commonName: 'Lavender',
        scientificName: 'Lavandula',
        description: 'Aromatic herb known for its purple flowers and calming fragrance.',
        image: require('../../assets/lavender.png'),
        careInstructions: {
            watering: 'Plant in full sun, well-draining soil, prune after flowering.',
            sunlight: 'Full sun',
            soil: 'Well-draining, nutrient-rich soil.',
        },
        diseases: ['Root rot', 'Leaf spot', 'Botrytis blight']
    },
    {
        id: '4',
        commonName: 'Monstera',
        scientificName: 'Monstera deliciosa',
        description: 'Tropical plant with large, split leaves, also known as Swiss cheese plant.',
        image: require('../../assets/monstera.png'),
        careInstructions: {
            watering: 'Bright indirect light, moderate water, high humidity.',
            sunlight: 'Bright indirect light',
            soil: 'Moderately moist, well-draining soil.',
        },
        diseases: ['Root rot', 'Leaf spot', 'Spider mites']
    },
    {
        id: '5',
        commonName: 'Orchid',
        scientificName: 'Phalaenopsis',
        description: 'Elegant flowering plant with long-lasting blooms in various colors.',
        image: require('../../assets/orchid.png'),
        careInstructions: {
            watering: 'Indirect light, weekly watering, high humidity, specialized potting mix.',
            sunlight: 'Indirect light',
            soil: 'Well-draining, nutrient-rich soil.',
        },
        diseases: ['Crown rot', 'Root rot', 'Bacterial brown spot']
    }
];

export function HistoryProvider({ children }: { children: ReactNode }) {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const addToHistory = (plant: Plant) => {
        const newItem: HistoryItem = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            plant,
        };
        
        setHistory(prev => {
            // Remove any existing entries for this plant
            const filteredHistory = prev.filter(item => item.plant.id !== plant.id);
            // Add the new item at the beginning
            return [newItem, ...filteredHistory];
        });
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
}

export { MOCK_PLANTS }; 