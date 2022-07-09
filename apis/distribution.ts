import axios from 'axios';
import Constants from 'expo-constants';

import { baseUrl } from '../constants/Urls';

export async function triggerDistribution(wallet: string): Promise<any> {
  try {
    const response = await axios.post(
      `${baseUrl}/distributions`,
      {
        wallet,
        source: 'airdrop/app',
      },
      {
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          token: Constants.manifest.extra.ACCESS_TOKEN,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}
