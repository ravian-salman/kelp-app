import axios from 'axios';

import { baseUrl } from '../constants/Urls';

export async function getAirdopConfig(): Promise<any> {
  try {
    const { data } = await axios.get(`${baseUrl}/airdrops-settings`, {
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data ?? 'Something went wrong';
    throw new Error(errorMessage);
  }
}

const token = '5JmhMw0aQWBEFroC';
// const apiEndpoint = 'https://gleam.io/api/v2/sites/2003209/competitions/9Aohq/actions';
const apiEndpoint = 'https://gleam.io/api/v2/sites/2003209/competitions';

export const getAirdropCompetitions = async () => {
  try {
    const { data } = await axios.get(apiEndpoint, {
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data ?? 'Something went wrong';
    throw new Error(errorMessage);
  }
};
