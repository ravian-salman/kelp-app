import React, { useCallback, useEffect, useState } from 'react';

import DynamicOnboardingPager from '../../components/DynamicPager';
import { CardType, Data } from '../../components/DynamicPager/type';
import { Onboarding } from '../../constants/OnboardingStatus';
import { useAuthContext } from '../../hooks/useAuth';
import { onboardingFallbackCardList } from './constants/offlineData';

export default function OnboardingScreen() {
  const { setOnboardingState } = useAuthContext();

  const [onboardingCardIdx, setOnboardingCardIdx] = useState<number>(0);
  const [onboardingCardList, setOnboardingCardList] = useState<Data[] | undefined>(undefined);

  let onboardingCard = onboardingFallbackCardList[onboardingCardIdx];
  /**
   * This is where we'll make the call for dynamic
   * onboarding data, if it fails, we fallback to
   * the local content
   */
  useEffect(() => {
    setOnboardingCardList(onboardingFallbackCardList);
  }, []);

  const handleSkipOnboarding = useCallback(() => {
    const agreementIndex = onboardingCardList?.findIndex(
      (item) => item.type === CardType.AGREEMENT
    );

    if (agreementIndex && agreementIndex !== -1) {
      setOnboardingCardIdx(agreementIndex);
    }
  }, [onboardingCardList]);

  const handleNextCard = useCallback(() => {
    if (onboardingCardList) {
      if (onboardingCardIdx + 1 < onboardingCardList.length) {
        setOnboardingCardIdx((prevOnboardingCardIdx) => prevOnboardingCardIdx + 1);
      } else {
        setOnboardingState(Onboarding.PHRASE_AND_SECURITY_PENDING);
      }
    }
  }, [onboardingCardIdx, onboardingCardList]);

  const handleCancelOnboarding = useCallback(() => {
    console.log('onboardingCardIdx==>>', onboardingCardIdx);

    setOnboardingCardIdx(0);
    onboardingCard = onboardingFallbackCardList[0];
  }, [onboardingCardIdx]);

  return (
    <DynamicOnboardingPager
      {...onboardingCard}
      handleNextCard={handleNextCard}
      handleSkip={handleSkipOnboarding}
      handleCancelIcon={handleCancelOnboarding}
    />
  );
}
