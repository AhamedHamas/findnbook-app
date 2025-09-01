import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import 'react-native-devsettings';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <SafeAreaView style={{flex: 1}}>
              <AppNavigator />
            </SafeAreaView>
          </QueryClientProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
