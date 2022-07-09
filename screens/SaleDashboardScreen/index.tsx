import React from 'react';

import { PrivateSaleDashboard, PublicSaleDashboard } from '../../components/SalePanelCollection';
import { MarketingType } from '../../constants/Marketing';
import { useMarketingContext } from '../../hooks/useMarketing';
import { RootStackScreenProps } from '../../navigation/types';

export default function SaleDashboardScreen(
  props: RootStackScreenProps<'SaleDashboard'>
): JSX.Element {
  const { airdropConfig } = useMarketingContext();

  switch (airdropConfig?.marketingType) {
    case MarketingType.PRIVATE:
      return <PrivateSaleDashboard {...props} />;
    case MarketingType.PUBLIC:
      return <PublicSaleDashboard {...props} />;
    default:
      throw new Error('Marketing type not supported');
  }
}
