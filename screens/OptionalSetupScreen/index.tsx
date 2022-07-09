import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { GenericCard } from '../../components/SecurityPanelCollection';
import { RootStackScreenProps, OptionalSetupStackParamList } from '../../navigation/types';

export const OptionalSetupStack = createNativeStackNavigator<OptionalSetupStackParamList>();

export default function OptionalSetupScreen({
  route,
}: RootStackScreenProps<'OptionalSetup'>): JSX.Element {
  return (
    <OptionalSetupStack.Navigator>
      <OptionalSetupStack.Screen
        name="GenericPanel"
        options={{
          headerShown: false,
        }}
        component={GenericCard}
      />
    </OptionalSetupStack.Navigator>
  );
}
