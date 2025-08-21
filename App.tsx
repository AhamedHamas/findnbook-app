import 'react-native-devsettings';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{flex: 1}}>
          <AppNavigator />
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
