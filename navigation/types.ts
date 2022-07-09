import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  // App routes
  PhraseSetup: NavigatorScreenParams<PhraseSetupStackParamList>;
  SecuritySetup: NavigatorScreenParams<SecuritySetupStackParamList>;
  OptionalSetup: NavigatorScreenParams<OptionalSetupStackParamList>;
  Marketing: NavigatorScreenParams<MarketingStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  SaleDashboard: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  BioMetricSetup: undefined;
  // Modals
  Modal: undefined;
  AddressModal: undefined;
  BuyKelpModal: undefined;
  ActionGleamAPI: undefined;
  PublicSale: undefined;
  // Not found
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type PhraseSetupStackParamList = {
  PhraseInitialPanel: undefined;
  PhraseAgreementPanel: undefined;
  PhraseShowPanel: undefined;
  PhraseVerifyPanel: {
    phrase: string[];
  };
  PhraseRecoveryPanel: undefined;
};

export type PhraseSetupStackScreenProps<Screen extends keyof PhraseSetupStackParamList> =
  NativeStackScreenProps<PhraseSetupStackParamList, Screen>;

export type SecuritySetupStackParamList = {
  CreatePinPanel: undefined;
  ConfirmPinPanel: {
    pin: string;
  };
};

export type SecuritySetupStackScreenProps<Screen extends keyof SecuritySetupStackParamList> =
  NativeStackScreenProps<SecuritySetupStackParamList, Screen>;

export type AuthStackParamList = {
  VerifyPinPanel: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;

export type OptionalSetupStackParamList = {
  CreateBiometricPanel: undefined;
  GenericPanel: undefined;
};

export type OptionalSetupStackScreenProps<Screen extends keyof OptionalSetupStackParamList> =
  NativeStackScreenProps<OptionalSetupStackParamList, Screen>;

export type MarketingStackParamList = {
  MarketingPagerPanel: undefined;
};

export type MarketingStackScreenProps<Screen extends keyof MarketingStackParamList> =
  NativeStackScreenProps<MarketingStackParamList, Screen>;

export type RootTabParamList = {
  Dashboard: undefined;
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
