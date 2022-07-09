import constate from 'constate';
import { ethers } from 'ethers';
import { setItemAsync } from 'expo-secure-store';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import '@ethersproject/shims';

import { usePersistentState } from './usePersistentState';

function useWallet() {
  const [address, setAddress] = usePersistentState<string>(undefined, 'ADDRESS');
  const [publicKey, setPublicKey] = usePersistentState<string>(undefined, 'PUBLIC_KEY');
  const [phrase, setPhrase] = usePersistentState<string>(undefined, 'PHRASE');
  const [gleamData, setGleamData] = usePersistentState<any | null>(undefined, 'GLEAM_DATA');
  const [wallet, setWallet] = useState<any | null>(null);

  useEffect(() => {
    if (phrase) {
      createWallet(phrase);
    }
  }, [phrase]);

  const provider = new ethers.providers.JsonRpcProvider(
    'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  );

  const mnemonicToSeed = async (mnemonic: string) => {
    const bip39 = await import('bip39');
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return Buffer.from(seed).toString('hex');
  };

  async function createWallet(phrase: string) {
    const seed = await mnemonicToSeed(phrase);
    const wallet = ethers.utils.HDNode._fromSeed('0x' + seed, {
      phrase,
      path: 'm',
      locale: '',
    });
    setWallet(wallet);
    setAddress(wallet.address);
    setPublicKey(wallet.publicKey);
    setItemAsync('walletAddress', wallet.address);
  }

  function generateWalletFromPhrase(phrase: string) {
    setPhrase(phrase);
  }

  function getGleamAction(newactions: any) {
    setGleamData(newactions);
  }

  return {
    address,
    phrase,
    setPhrase,
    gleamData,
    getGleamAction,
    generateWalletFromPhrase,
    createWallet,
    wallet,
    publicKey,
    provider,
  };
}

const [WalletProvider, useWalletContext] = constate(useWallet);

export { useWalletContext, WalletProvider };
