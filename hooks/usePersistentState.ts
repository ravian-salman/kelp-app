import { DEVELOPMENT } from '@env';
import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store';
import { useEffect, useRef, useState } from 'react';

export function usePersistentState<T>(
  initialValue: T | undefined,
  storeKey: string
): [T | undefined | null, React.Dispatch<React.SetStateAction<T | undefined | null>>] {
  /**
   * undefined - uninitialized store
   * null - empty store
   * anything else - valid store value
   */
  const initialized = useRef(false);
  const [value, setValue] = useState<T | undefined | null>(undefined);

  // useEffect(() => {
  //   (true || DEVELOPMENT) && deleteItemAsync(storeKey);
  // }, []);

  /**
   * Store values in store every time it changes
   * Check against undefined (store cannot be un-initialized)
   */
  useEffect(() => {
    if (initialized.current && value !== undefined) {
      const jsonValue = JSON.stringify(value);
      setItemAsync(storeKey, jsonValue);
    }
  }, [value]);

  /**
   * Retrieve value from store
   * check against null
   */
  useEffect(() => {
    getItemAsync(storeKey).then((data) => {
      if (data !== undefined) {
        const parsedData = data ? JSON.parse(data) : null;
        setValue(parsedData === null && initialValue ? initialValue : parsedData);
      }
      initialized.current = true;
    });
  }, []);

  return [value, setValue];
}
