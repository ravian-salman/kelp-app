import constate from 'constate';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Onboarding } from '../constants/OnboardingStatus';
import { usePersistentState } from './usePersistentState';

function useAuth() {
  const [user, setUser] = usePersistentState<any>(undefined, 'USER');
  const [incorrectPinAttemptCount, setIncorrectPinAttemptCount] = useState(0);
  const [onboardingState, setOnboardingState] = usePersistentState<Onboarding>(
    Onboarding.USER_AGREEMENT_PENDING,
    'ONBOARDING_STATE'
  );
  const [isEnableBioMetric, setIsEnableBioMetric] = usePersistentState<boolean>(
    false,
    'IS_BIONMETRIC_ENABLE'
  );
  const [localPin, setLocalPin] = usePersistentState<string | undefined>(undefined, 'PIN');
  const [isAuthComplete, setIsAuthComplete] = useState<boolean>(false);

  /**
   * If onboarding complete then initialize with true since optional content
   * should be not be shown again if skipped
   */
  const isOptionalContentSeenInitialized = useRef(false);
  const [isOptionalContentSeen, setIsOptionalContentSeen] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    if (!isOptionalContentSeenInitialized.current && onboardingState) {
      setIsOptionalContentSeen(onboardingState === Onboarding.COMPLETE);
      isOptionalContentSeenInitialized.current = true;
    }
  }, [onboardingState]);

  /**
   * If more than 3 incorrect pin are entered
   * the user info is removed from store
   */
  useEffect(() => {
    if (incorrectPinAttemptCount > 2) {
      setUser(null);
      setIncorrectPinAttemptCount(0);
    }
  }, [incorrectPinAttemptCount]);

  const incrementIncorrectAttemptCount = useCallback(() => {
    setIncorrectPinAttemptCount((prevCount) => prevCount + 1);
  }, []);

  return {
    user,
    isAuthComplete,
    onboardingState,
    setIsAuthComplete,
    incrementIncorrectAttemptCount,
    setOnboardingState,
    isEnableBioMetric,
    setIsEnableBioMetric,
    setLocalPin,
    localPin,
    isOptionalContentSeen,
    setIsOptionalContentSeen,
  };
}

const [AuthProvider, useAuthContext] = constate(useAuth);

export { useAuthContext, AuthProvider };
