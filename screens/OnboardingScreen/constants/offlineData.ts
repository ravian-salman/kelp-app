import OnboardingScreenImage1 from '../../../assets/images/onboarding/screen-1.svg';
import OnboardingScreenImage2 from '../../../assets/images/onboarding/screen-2.svg';
import OnboardingScreenImage3 from '../../../assets/images/onboarding/screen-3.svg';
import { CardType, Data } from '../../../components/DynamicPager/type';

export const onboardingFallbackCardList: Data[] = [
  {
    type: CardType.INFOGRAPHIC,
    id: '1',
    withCounter: true,
    content: [
      {
        title: 'Welcome To [Kelp.]<brandLightGreen>',
        description: 'A mobile-first investment app to help you grow your wealth fast...like kelp!',
        image: OnboardingScreenImage1,
      },
      {
        title: 'Setup your [wallet]<brandLightGreen>',
        description: 'We’ve built a secure mobile wallet to store your Kelp.',
        image: OnboardingScreenImage2,
      },
      {
        title: 'Claim your [Kelp]<brandLightGreen>',
        description: 'Enter your email address used to signup for the airdrop',
        image: OnboardingScreenImage3,
      },
    ],
  },
  {
    type: CardType.AGREEMENT,
    id: '2',
    content: {
      title: 'Using [Kelp]<brandLightGreen>',
      points: [
        'Kelp is currently BETA software.  While we use Kelp ourselves everyday, please be advised that there might still be bugs lingering around.',
        '',
        'To the fullest extend permitted by applicable law:',
        '-All services provided by Kelp Finance Labs Inc. (Kelp Finance), its employees, freelancers, or other subcontractors are provided without representation and warranty of any kind,',
        '-Kelp Finance disclaims any and all direct and indirect liability for damage occurring under, or in connection with, this Protocol, especially, but not limited to loss of, or damage to, data, lost profit, compromised / hacked product or system, and or stolen / missing monetary funds',
        '',
        'You as the user hereby accept and acknowledge this protocol and all the information provided within to the fullest extent.  You as the user confirm that the content this document has been reviewed, tested and understood on their own behalf.',
        '',
        'You understand the risks involved in this software.',
      ],
      agreement: ['You understand the risks involved in this software.'],
    },
  },
];
