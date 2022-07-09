import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';

import MarketingPager from '../../components/DynamicPager';
import { MarketingType } from '../../constants/Marketing';
import { useAuthContext } from '../../hooks/useAuth';
import { useMarketingContext } from '../../hooks/useMarketing';
import { MarketingStackParamList, RootStackScreenProps } from '../../navigation/types';
import { publicMarketingCardList, privateMarketingCardList } from './constants/marketingData';

export const MarketingStack = createNativeStackNavigator<MarketingStackParamList>();

export default function MarketingScreen({
  route,
  navigation,
}: RootStackScreenProps<'Marketing'>): JSX.Element | null {
  console.log('MarketingScreen:', route?.params?.isShowPublicSale);
  const { setIsOptionalContentSeen } = useAuthContext();
  const { airdropConfig } = useMarketingContext();
  const [marketingCardIdx, setMarketingCardIdx] = useState<number>(0);

  const marketingCardList = useMemo(() => {

    if (route?.params?.isShowPublicSale) {
      return publicMarketingCardList;
    }
    switch (airdropConfig?.marketingType) {
      case MarketingType.PRIVATE:
        return privateMarketingCardList;
      case MarketingType.PUBLIC:
        return publicMarketingCardList;
      default:
      // TODO: Skip if no marketing available
    }
    return publicMarketingCardList;
  }, [airdropConfig]);

  const handleNextCard = useCallback(() => {
    if (route?.params?.isShowPublicSale) {
      navigation.navigate('PublicSale');
    }
    if (marketingCardList) {
      if (marketingCardIdx + 1 < marketingCardList.length) {
        setMarketingCardIdx((prevOnboardingCardIdx) => prevOnboardingCardIdx + 1);
      } else {
        setIsOptionalContentSeen(true);
      }
    }
  }, [marketingCardIdx, marketingCardList]);

  const marketingCard = useMemo(
    () => marketingCardList[marketingCardIdx],
    [marketingCardIdx, marketingCardList]
  );

  const marketingPagerComponent = useCallback(
    (props) => (
      <MarketingPager
        {...props}
        {...marketingCard}
        handleNextCard={handleNextCard}
        handleSkip={() => setIsOptionalContentSeen(true)}
      />
    ),
    [handleNextCard, marketingCard, airdropConfig, marketingCardList]
  );

  /**
   * Hold rendering until marketing type is resolved
   */
  if (airdropConfig?.marketingType === null) {
    return null;
  }
  return (
    <MarketingStack.Navigator>
      <MarketingStack.Screen
        name="MarketingPagerPanel"
        options={{
          headerShown: false,
        }}>
        {marketingPagerComponent}
      </MarketingStack.Screen>
    </MarketingStack.Navigator>
  );
}
