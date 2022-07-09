import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { PinCard } from '../../components/SecurityPanelCollection';
import {
  AuthStackParamList,
  RootStackScreenProps,
  SecuritySetupStackParamList,
} from '../../navigation/types';

export const SecuritySetupStack = createNativeStackNavigator<SecuritySetupStackParamList>();
export const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function PhraseScreen({
  route,
}: RootStackScreenProps<'Auth'> | RootStackScreenProps<'SecuritySetup'>): JSX.Element {
  return route.name === 'SecuritySetup' ? (
    <SecuritySetupStack.Navigator>
      <SecuritySetupStack.Screen
        name="CreatePinPanel"
        options={{
          headerShown: false,
        }}
        component={PinCard}
      />
      <SecuritySetupStack.Screen
        name="ConfirmPinPanel"
        options={{
          headerShown: false,
        }}
        component={PinCard}
      />
    </SecuritySetupStack.Navigator>
  ) : (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="VerifyPinPanel"
        options={{
          headerShown: false,
        }}
        component={PinCard}
      />
    </AuthStack.Navigator>
  );
}
