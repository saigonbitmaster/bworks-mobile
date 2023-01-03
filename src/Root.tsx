import React from 'react';
import { NativeBaseProvider } from 'native-base';
import RootStack from './navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootSiblingParent } from 'react-native-root-siblings';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <QueryClientProvider client={queryClient}>
          <RootSiblingParent>
            <RootStack />
          </RootSiblingParent>
        </QueryClientProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
