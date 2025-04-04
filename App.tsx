import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { HistoryProvider } from './src/context/HistoryContext';

export default function App() {
  return (
    <HistoryProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </HistoryProvider>
  );
}
