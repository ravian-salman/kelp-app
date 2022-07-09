import { MarketingType } from '../constants/Marketing';

export type MarketingInfo = {
  type: MarketingType;
  date: Date;
};

export async function getActiveMarketingInfo(): Promise<MarketingInfo> {
  return {
    type: MarketingType.PRIVATE,
    date: new Date(2022, 12, 31),
  };
}
