import { API_KEYS } from '../config/api';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface PlantIdentificationResult {
    scientificName: string;
    commonName: string;
    confidence: number;
    careInstructions: {
        watering: string;
        sunlight: string;
        soil: string;
    };
    diseases?: Array<{
        name: string;
        description: string;
        treatment: string;
    }>;
}

export async function identifyPlant(photoBase64: string): Promise<PlantIdentificationResult> {
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEYS.OPENAI}`,
            },
            body: JSON.stringify({
                model: 'gpt-4-vision-preview',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Please identify this plant and provide detailed information about its care requirements and potential diseases. Format the response as JSON with the following structure: { "scientificName": "", "commonName": "", "confidence": 0.0, "careInstructions": { "watering": "", "sunlight": "", "soil": "" }, "diseases": [{ "name": "", "description": "", "treatment": "" }] }'
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${photoBase64}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 1000,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to identify plant');
        }

        if (!data.choices?.[0]?.message?.content) {
            throw new Error('Invalid response format from API');
        }

        try {
            const result = JSON.parse(data.choices[0].message.content);
            return {
                scientificName: result.scientificName || 'Unknown',
                commonName: result.commonName || 'Unknown',
                confidence: result.confidence || 0,
                careInstructions: {
                    watering: result.careInstructions?.watering || 'Watering information not available',
                    sunlight: result.careInstructions?.sunlight || 'Sunlight information not available',
                    soil: result.careInstructions?.soil || 'Soil information not available',
                },
                diseases: result.diseases?.map((disease: any) => ({
                    name: disease.name || 'Unknown',
                    description: disease.description || 'No description available',
                    treatment: disease.treatment || 'No treatment information available',
                })),
            };
        } catch (parseError) {
            throw new Error('Failed to parse API response');
        }
    } catch (error: any) {
        console.error('Error identifying plant:', error);
        throw new Error(error.message || 'Failed to identify plant');
    }
} 