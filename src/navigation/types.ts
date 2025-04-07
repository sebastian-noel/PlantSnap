import { PlantIdentificationResult } from '../services/plantIdentification';

export type RootStackParamList = {
    Splash: undefined;
    Main: undefined;
};

export type MainTabParamList = {
    Scan: undefined;
    Search: undefined;
    History: undefined;
};

export type HomeStackParamList = {
    HomeScreen: undefined;
    Camera: undefined;
    PlantResult: {
        photoUri: string;
        result: PlantIdentificationResult;
    };
}; 