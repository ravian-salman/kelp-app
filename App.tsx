import * as eva from '@eva-design/eva';
import 'intl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import WalletConnectProvider, { RenderQrcodeModalProps } from '@walletconnect/react-native-dapp';
import Constants from 'expo-constants';
import React from 'react';
import { Platform, StatusBar } from 'react-native';

import 'intl/locale-data/jsonp/en';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import WConnectModal from './components/WConnectModal';
import { AuthProvider } from './hooks/useAuth';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { MarketingProvider } from './hooks/useMarketing';
import { WalletProvider } from './hooks/useWallet';
import Navigation from './navigation';
import { store } from './redux/store';
import { default as CustomMapping } from './theme/custom-mapping.json';
import { default as CustomTheme } from './theme/custom-theme.json';
import './global';

import ForceUpdateAppModal from './components/forceUpdateAppModal';

const queryClient = new QueryClient();
export default function App(): JSX.Element {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const SCHEME_FROM_APP_JSON = 'kelp-wallet';

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <AuthProvider>
          <MarketingProvider>
            <WalletProvider>
              <QueryClientProvider client={queryClient}>
                <IconRegistry icons={EvaIconsPack} />
                <RootSiblingParent>
                  <ApplicationProvider
                    {...eva}
                    customMapping={CustomMapping}
                    theme={{ ...eva.dark, ...CustomTheme }}>
                    <WalletConnectProvider
                      projectId={Constants.manifest.extra.WALLET_CONNECT_PROJECT_ID}
                      redirectUrl={
                        Platform.OS === 'web'
                          ? window.location.origin
                          : `${SCHEME_FROM_APP_JSON}://`
                      }
                      storageOptions={{
                        asyncStorage: AsyncStorage,
                      }}
                      renderQrcodeModal={(props: RenderQrcodeModalProps): JSX.Element => (
                        <WConnectModal {...props} />
                      )}>
                      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                        <Navigation colorScheme={colorScheme} />
                      </SafeAreaProvider>
                    </WalletConnectProvider>
                  </ApplicationProvider>
                  <ForceUpdateAppModal />
                </RootSiblingParent>
              </QueryClientProvider>
            </WalletProvider>
          </MarketingProvider>
        </AuthProvider>
      </Provider>
    );
  }
}
