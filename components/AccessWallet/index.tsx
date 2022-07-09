import { Text, Button, Input } from '@ui-kitten/components';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  onComplete: (wallet: ethers.Wallet) => void;
}

const AccessWallet = (props: Props) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAccessWallet = () => {
    try {
      const provider = ethers.getDefaultProvider();
      const mnemonicWallet = ethers.Wallet.fromMnemonic(input);
      const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider);
      props.onComplete(wallet);
    } catch (e) {
      setError('Invalid private key');
    }
  };

  const handleInputChange = (value: any) => setInput(value);

  return (
    <View style={styles.row}>
      <Text style={styles.text}>Access Wallet</Text>
      <Input
        style={styles.input}
        value={input}
        placeholder="Enter private key"
        onChangeText={handleInputChange}
      />
      <Button onPress={handleAccessWallet}>Access</Button>
      {error ? (
        <Text style={styles.text} status="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
  },
  input: {
    margin: 16,
  },
  text: {
    margin: 2,
  },
});

export default AccessWallet;
