import constate from 'constate';
import { useEffect, useState } from 'react';

import { getAirdopConfig } from '../apis/airdropConfig';

function useMarketing() {
  const [airdropConfig, setAirdropConfig] = useState<any>({});

  useEffect(() => {
    getAirdopConfig().then((data) => setAirdropConfig(data));
  }, []);
  return {
    airdropConfig,
  };
}

const [MarketingProvider, useMarketingContext] = constate(useMarketing);

export { useMarketingContext, MarketingProvider };
