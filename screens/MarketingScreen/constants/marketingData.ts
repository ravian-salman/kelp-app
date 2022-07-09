import OnboardingScreenImage1 from '../../../assets/images/onboarding/screen-1.svg';
import OnboardingScreenImage2 from '../../../assets/images/onboarding/screen-2.svg';
import OnboardingScreenImage3 from '../../../assets/images/onboarding/screen-3.svg';
import { CardType, Data } from '../../../components/DynamicPager/type';

export const publicMarketingCardList: Data[] = [
  {
    type: CardType.INFOGRAPHIC,
    id: '1',
    withCounter: true,
    content: [
      {
        title: 'Welcome to the Kelp [Airdrop!]<brandLightGreen>',
        description:
          'To build the next financial ecosystem, we are giving away 25 billion KELP tokens!',
        image: OnboardingScreenImage1,
      },
      {
        title: 'Share your [referral]<brandLightGreen> link',
        description:
          'Share your referral link to ensure you maintain one of the 250,000 spots that will receive the airdrop.',
        image: OnboardingScreenImage2,
      },
      {
        title: 'Claim your [Kelp]<brandLightGreen>',
        description:
          'Our automated process will deposit your KELP into this wallet. Note that every airdrop begins as locked tokens and will be released according to the Token Release Strategy. For more information on Kelp’s sophisticated token mechanics, visit https://kelp.finance',
        image: OnboardingScreenImage3,
      },
    ],
  },
];

export const privateMarketingCardList: Data[] = [
  {
    type: CardType.INFOGRAPHIC,
    id: '1',
    withCounter: true,
    content: [
      {
        title: 'Welcome to the Kelp [Private Sale]<brandLightGreen>',
        description:
          'To build the next financial ecosystem, we offering early access to KELP before the our pre-sale of the currency.',
        image: OnboardingScreenImage1,
      },
      {
        title: '[Fund]<brandLightGreen> your wallet',
        description:
          'This app is a fully decentralized cryptocurrency wallet.  We’ve built it from the ground up to be secure and multi-currency.  For the private sale, transfer in BNB to this wallet, ready for the sale.',
        image: OnboardingScreenImage2,
      },
      {
        title: '[Private]<brandLightGreen> Sale',
        description:
          'Here are the details of the sale. $250,000USD and a hard cap of $1,000,000 USD.  There is no personal limit and its first come, first serve.  ',
        image: OnboardingScreenImage3,
      },
    ],
  },
];
