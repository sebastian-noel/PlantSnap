import React from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.welcomeText}>
                    Welcome to LeafSnap AI
                </Text>
                <Text style={styles.descriptionText}>
                    Your intelligent plant identification companion. Search for plants to learn more about them. (Photo feature coming soon!)
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#00E676',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    logo: {
        width: '80%',
        height: 120,
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
}); 