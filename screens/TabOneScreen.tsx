import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Divider, Button } from '@ui-kitten/components';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AccessWallet from '../components/AccessWallet';
import GenerateWallet from '../components/GenerateWallet';
import ManageWallet from '../components/ManageWallet';

enum PAGE {
  INITIAL,
  ACCESS_WALLET,
  GENERATE_WALLET,
}

const HomeScreen = () => {
  const [page, setPage] = useState(PAGE.INITIAL);
  const [wallet, setWallet] = useState(null as null | ethers.Wallet);

  const handleBack = () => {
    setWallet(null);
    setPage(PAGE.INITIAL);
  };

  const handleAccessedWallet = (_wallet: ethers.Wallet) => setWallet(_wallet);

  const renderContent = () => {
    const handleAccessWalletClick = () => setPage(PAGE.ACCESS_WALLET);
    const handleGenerateWalletClick = () => setPage(PAGE.GENERATE_WALLET);
    if (wallet) {
      return <ManageWallet wallet={wallet} />;
    }
    if (page === PAGE.INITIAL) {
      return (
        <View>
          <Button onPress={handleAccessWalletClick}>Access Wallet</Button>
          <Divider style={styles.divider} />
          <Button onPress={handleGenerateWalletClick}>Generate Wallet</Button>
        </View>
      );
    }
    if (page === PAGE.ACCESS_WALLET) {
      return <AccessWallet onComplete={handleAccessedWallet} />;
    }
    if (page === PAGE.GENERATE_WALLET) {
      return <GenerateWallet />;
    }
    return null;
  };

  return (
    <Layout style={styles.layout}>
      {renderContent()}
      <Divider style={styles.divider} />
      {page !== PAGE.INITIAL ? <Button onPress={handleBack}>BACK</Button> : null}
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 20,
  },
});

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);
