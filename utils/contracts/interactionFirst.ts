import { ethers } from 'ethers';

import CONTRACT_ABI from './contractABIFirst.json';

const CONTRACT_ADDRESS = '0x51EE782b58129d4Cc694d981e9350813d3F2A436';

// Testnet url
// const URI = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const URI = 'https://bsc-dataseed.binance.org/';

// Calling provider
const provider = new ethers.providers.JsonRpcProvider(URI);

// Getting contract based on provider
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider); // initiate contract

// Get metamsk balance
export const myBalance = async (address: string) => {
  try {
    const balanceInEth = provider.getBalance(address);
    return ethers.utils.formatEther((await balanceInEth).toString());
  } catch (error) {
    console.log('error', error);
  }
};

// Get gas Fee
export const gasFee = async () => {
  try {
    const gasPrice = await provider.getGasPrice();
    return ethers.utils.formatEther(gasPrice.toString());
  } catch (error) {
    console.log('error gas fee', error);
  }
};

//! Get balance for a specific _owener
export const getBalance = async (address: string) => {
  try {
    const temp = await contract?.balanceOf(address);
    return ethers.utils.formatEther(temp.toString());
  } catch (e) {
    console.warn(e);
  }
};

//! Get user balance
export const getUserBalances = async (address: string) => {
  try {
    const temp = await contract?.balances(address);
    return ethers.utils.formatEther(temp.toString());
  } catch (e) {
    console.log(e.message);
  }
};

// ! To get the allownece
export const getAllowence = async (ownerAddress: string, senderAddress: string) => {
  try {
    return await contract?.allowance(ownerAddress, senderAddress);
  } catch (e) {
    console.log(e.message);
  }
};
