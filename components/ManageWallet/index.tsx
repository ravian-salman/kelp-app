import { Text, Spinner, Input, Button, Divider, Icon } from '@ui-kitten/components';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import * as Clipboard from 'expo-clipboard';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface Props {
  wallet: ethers.Wallet;
}

const ManageWallet = (props: Props) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sendAmount, setSendAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    props.wallet.getBalance().then((_balance) => {
      setBalance(+ethers.utils.formatEther(_balance));
      setLoading(false);
    });
  }, [props.wallet]);

  const handleSendAmountChange = (value: any) => {
    setSendAmount(value);
  };

  const handleRecipientChange = (value: any) => {
    setRecipient(value);
  };

  const handleSend = () => {
    setError('');
    try {
      ethers.utils.getAddress(recipient);
    } catch (e) {
      return setError('Recipient is invalid');
    }
    if (!sendAmount || sendAmount > balance) {
      setError('Invalid send amount');
    }
    const tx = {
      to: recipient,
      value: ethers.utils.parseEther(sendAmount.toString()),
      gasPrice: ethers.utils.parseUnits('40', 'gwei'),
    };
    setLoading(true);
    props.wallet
      .sendTransaction(tx)
      .then((sentTx) => {
        setLoading(false);
        setTxHash(sentTx.hash!);
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to submit tx');
      });
  };

  if (loading) {
    return (
      <View style={styles.row}>
        <Spinner />
      </View>
    );
  }
  return (
    <View style={styles.row}>
      <QRCode value={props.wallet.address} />
      <Divider style={styles.divider} />
      <TouchableOpacity onPress={() => Clipboard.setString(props.wallet.address)}>
        <Text style={styles.text}>
          {props.wallet.address}
          <Icon style={styles.icon} fill="#8F9BB3" name="copy-outline" />
        </Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`https://etherscan.io/address/${props.wallet.address}`)}>
          <Text status="info">View account on etherscan</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Balance: {balance} ETH</Text>
        <Divider style={styles.divider} />
        {txHash ? (
          <View>
            <Text style={styles.text}>Transaction broadcasted!</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`https://etherscan.io/tx/${txHash}`)}>
              <Text>View tx on etherscan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Input
              value={recipient}
              style={styles.input}
              onChangeText={handleRecipientChange}
              placeholder="recipient address"
            />
            <View style={styles.amountWrapper}>
              <Input
                style={styles.input}
                value={sendAmount.toString()}
                onChangeText={handleSendAmountChange}
                placeholder="send amount in eth"
              />
              <Text style={styles.text}>ETH</Text>
            </View>
            <View>
              <Button style={styles.sendButton} onPress={handleSend}>
                Send
              </Button>
              {error ? (
                <Text style={styles.text} status="danger">
                  {error}
                </Text>
              ) : null}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  sendButton: {
    marginTop: 5,
  },
  input: {
    marginLeft: 16,
    marginRight: 16,
    minWidth: 170,
  },
  divider: {
    height: 20,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
  },
});

export default ManageWallet;
