import { Text, Divider, Icon } from '@ui-kitten/components';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import * as Clipboard from 'expo-clipboard';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const GenerateWallet = () => {
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  console.log("---------------------GenerateWallet--------------------");
  useEffect(() => {
    const randomMnemonic = ethers.Wallet.createRandom().mnemonic;
    const wallet = ethers.Wallet.fromMnemonic(randomMnemonic.phrase);
    console.log("setAdress:", wallet.address);
    setAddress(wallet.address);
    setPrivateKey(randomMnemonic.phrase);
  }, []);

  return (
    <View style={styles.row}>
      <Text style={styles.text} category="h2">
        Generated Wallet
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Address</Text>
      <TouchableOpacity onPress={() => Clipboard.setString(address)}>
        <Text style={styles.text}>
          {address}
          <Icon style={styles.icon} fill="#8F9BB3" name="copy-outline" />
        </Text>
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <Text style={styles.text}>Private Key</Text>
      <TouchableOpacity onPress={() => Clipboard.setString(privateKey)}>
        <Text style={styles.text}>
          {privateKey}
          <Icon style={styles.icon} fill="#8F9BB3" name="copy-outline" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
  },
  divider: {
    height: 20,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    marginTop: 5,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
  },
});

export default GenerateWallet;
