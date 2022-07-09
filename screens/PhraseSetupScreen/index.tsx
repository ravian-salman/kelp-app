import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  Agreement,
  CreateKepWallet,
  PhraseRecovery,
  PhraseShow,
  PhraseVerify,
} from '../../components/PhrasePanelCollection';
import { PhraseSetupStackParamList } from '../../navigation/types';

export const PhraseSetupStack = createNativeStackNavigator<PhraseSetupStackParamList>();

export default function PhraseSetupScreen(): JSX.Element {
  return (
    <PhraseSetupStack.Navigator>
      <PhraseSetupStack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <PhraseSetupStack.Screen name="PhraseInitialPanel" component={CreateKepWallet} />
        <PhraseSetupStack.Screen name="PhraseAgreementPanel" component={Agreement} />
        <PhraseSetupStack.Screen name="PhraseShowPanel" component={PhraseShow} />
        <PhraseSetupStack.Screen name="PhraseVerifyPanel" component={PhraseVerify} />
        <PhraseSetupStack.Screen name="PhraseRecoveryPanel" component={PhraseRecovery} />
      </PhraseSetupStack.Group>
    </PhraseSetupStack.Navigator>
  );
}
