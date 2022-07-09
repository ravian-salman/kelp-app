/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { PublicSaleDashboard, PreSaleDashboard } from '../components/SalePanelCollection';
import Colors from '../constants/Colors';
import { MarketingType } from '../constants/Marketing';
import { Onboarding } from '../constants/OnboardingStatus';
import { useAuthContext } from '../hooks/useAuth';
import useColorScheme from '../hooks/useColorScheme';
import { useMarketingContext } from '../hooks/useMarketing';
import AddressModalScreen from '../screens/AddressModalScreen';
import BioMetricSetup from '../screens/BioMetricSetup';
import BuyKelpModalScreen from '../screens/BuyKelpModalScreen';
import Dashboard from '../screens/Dashboard';
import MarketingScreen from '../screens/MarketingScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OptionalSetupScreen from '../screens/OptionalSetupScreen';
import PhraseScreen from '../screens/PhraseSetupScreen';
import SaleDashboardScreen from '../screens/SaleDashboardScreen';
import SecurityScreen from '../screens/SecurityScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'transparent',
        },
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
export const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user, onboardingState, isAuthComplete, isOptionalContentSeen } = useAuthContext();
  const { airdropConfig } = useMarketingContext();

  /**
   * Block until user value has been
   * resolved from store
   */
  // TODO: Add splash screen while retrieving user data
  if (
    user === undefined ||
    onboardingState === undefined ||
    isOptionalContentSeen === undefined ||
    airdropConfig === undefined
  ) {
    return null;
  }

  // Onboarding
  if (onboardingState === Onboarding.USER_AGREEMENT_PENDING) {
    return <OnboardingScreen />;
  }
  return (
    <Stack.Navigator>
      {onboardingState === Onboarding.PHRASE_AND_SECURITY_PENDING && (
        // Phrase and Security
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="PhraseSetup" component={PhraseScreen} />
          <Stack.Screen name="SecuritySetup" component={SecurityScreen} />
        </Stack.Group>
      )}

      {onboardingState === Onboarding.BIOMETRIC_SETUP_PENDING && (
        // Phrase and Security
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="BioMetricSetup" component={BioMetricSetup} />
        </Stack.Group>
      )}

      {onboardingState === Onboarding.COMPLETE &&
        (!isOptionalContentSeen ? (
          // Optional Security and Marketing
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="OptionalSetup" component={OptionalSetupScreen} />
            <Stack.Screen name="Marketing" component={MarketingScreen} />
          </Stack.Group>
        ) : !isAuthComplete ? (
          // Auth
          <Stack.Screen name="Auth" component={SecurityScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            {airdropConfig.marketingType !== MarketingType.NONE && (
              <Stack.Screen name="SaleDashboard" component={SaleDashboardScreen} />
            )}
            {/* Dashboard */}
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Group>
        ))}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="marketing"
        options={{
          headerShown: false,
        }}
        component={MarketingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PublicSale"
        component={PublicSaleDashboard}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PreSale"
        component={PreSaleDashboard}
      />

      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen
          options={{
            presentation: 'transparentModal',
            contentStyle: {
              // backgroundColor: 'rgba(0,0,0,0.5)',
            },
          }}
          name="AddressModal"
          component={AddressModalScreen}
        />
        <Stack.Screen
          options={{
            presentation: 'transparentModal',
            contentStyle: {
              // backgroundColor: 'rgba(0,0,0,0.5)',
            },
          }}
          name="BuyKelpModal"
          component={BuyKelpModalScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { minHeight: 52, paddingLeft: 20, paddingRight: 20 },
      }}>
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }: RootTabScreenProps<'Dashboard'>) => ({
          title: 'Tab One',
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Feather size={26} name="bar-chart-2" color={Colors[colorScheme].brandLightGreen} />
          ),
          headerShown: false,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          title: 'Tab One',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={26} name="wallet-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        listeners={{
          tabPress: (e) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            e.preventDefault();
          },
        }}
        options={{
          title: 'Tab Two',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Feather size={26} name="user" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabTwoScreen}
        listeners={{
          tabPress: (e) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            e.preventDefault();
          },
        }}
        options={{
          title: 'Tab Two',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Feather size={26} name="menu" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
