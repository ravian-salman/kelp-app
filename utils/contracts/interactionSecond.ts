import { ethers } from 'ethers';

import CONTRACT_ABI from './contractABISecond.json';

// const CONTRACT_ADDRESS = '0x16c9F72686EF46B6fe0665668C153e031092ABe0';
const CONTRACT_ADDRESS = '0x76AD551B8ABEFa2Ee9EbD9a70003905D93e81236'; //MAINET PROXY ADDRESS
// const CONTRACT_ADDRESS = '0xEaEd0822852CbFb5C35Db1091D59d17dBe3f3F0D'; //MAINET ADDRESS

// Testnet url
// const URI = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const URI = 'https://bsc-dataseed.binance.org';

// Calling provider
const provider = new ethers.providers.JsonRpcProvider(URI);

// Getting contract based on provider
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider); // initiate contract

export const buyKelpToken = async (kelp: number, address: string) => {
  try {
    const signer = provider.getSigner(address); //Signer for buyActiveSaleTokens //!Here is tried both the address contract and user address
    const mainContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const gasPriceExact = await provider.getGasPrice();
    const temp = await mainContract?.buyActiveSaleTokens(address, {
      value: ethers.utils.parseEther('0.01'),
      gasLimit: 100000,
      gasPrice: ethers.utils.parseUnits(ethers.utils.formatEther(gasPriceExact), 'gwei'),
    });
    return temp;
  } catch (error) {
    console.warn('error in buyKelpToken', error);
  }
};

// ! Get specific BNB Price
export const getBnbPrice = async () => {
  try {
    const data = await contract?.getBNBPrice();
    return [ethers.utils.formatEther(data[0]), ethers.utils.formatEther(data[1])];
  } catch (error) {
    console.warn('error', error);
  }
};

// ! Function to get limit per Account
export const getLimitOfAccount = async (type: any) => {
  try {
    return await contract?.getLimitPerAccount(type);
  } catch (error) {
    console.warn(error);
  }
};

//! Function to get rates
export const getRate = async (type: any) => {
  try {
    const balanceInEth = await contract?.getRate(type);
    return ethers.utils.formatEther((await balanceInEth).toString());
  } catch (error) {
    console.warn(error);
  }
};

//! Function to get time of start
export const getStartTime = async (type: any) => {
  try {
    return await contract?.getStartTime(type);
  } catch (error) {
    console.warn(error);
  }
};

//! Function to get limit of total
export const getTotalLimit = async (type: any) => {
  try {
    return await contract?.getTotalLimit(type);
  } catch (error) {
    console.warn(error);
  }
};

// ! Function to get the status of pause
export const getPausedStatus = async (type: any) => {
  try {
    return await contract?.isPaused(type);
  } catch (error) {
    console.warn(error);
  }
};

// ! Frunction to get purchase data
export const purcahse = async (purchaseNumber: string, userAddress: string) => {
  try {
    return await contract?.purchases(purchaseNumber, userAddress);
  } catch (error) {
    console.warn(error);
  }
};

// ! Frunction to get purchase data
export const getSales = async (units: any) => {
  try {
    return await contract?.sales(units);
  } catch (error) {
    console.warn(error);
  }
};

// ! Frunction to get purchase data
export const getTotalSales = async (units: any) => {
  try {
    const temp = await contract?.totalSales(units);
    return ethers.utils.formatEther(temp.toString());
  } catch (error) {
    console.warn(error);
  }
};
