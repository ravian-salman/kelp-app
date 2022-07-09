import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';

import { getAirdropCompetitions } from '../../../apis/airdropConfig';
import InstagramIcon from '../../../assets/images/publicSale/instagram.svg';
import KelpIcon from '../../../assets/images/publicSale/kelp.svg';
import ProductHuntIcon from '../../../assets/images/publicSale/productHunt.svg';
import RedditIcon from '../../../assets/images/publicSale/reddit.svg';
import ShareIcon from '../../../assets/images/publicSale/share.svg';
import TelegramIcon from '../../../assets/images/publicSale/telegram.svg';
import TwitterIcon from '../../../assets/images/publicSale/twitter.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useMarketingContext } from '../../../hooks/useMarketing';
import { useWalletContext } from '../../../hooks/useWallet';
import { RootStackScreenProps } from '../../../navigation/types';
import { clipDecimal } from '../../../utils/currency';
import CountdownTimer from '../../CountdownTimer';
import { PoppinsBold, PoppinsMedium, PoppinsRegular } from '../../StyledText';
import { SafeAreaView, View } from '../../Themed';
import { PublicSaleDashboardStyles as styles } from './styles';

export default function PublicSaleDashboard({
  navigation,
}: RootStackScreenProps<'SaleDashboard'>): JSX.Element {
  const colorScheme = useColorScheme();

  const { airdropConfig } = useMarketingContext();

  const { gleamData, getGleamAction } = useWalletContext();

  const [rank, setRank] = useState(112456);
  const [totalParticipant, setTotalParticipant] = useState(250000);

  const [points, setPoints] = useState(4);
  console.log('actions===== ', gleamData?.entry_methods);

  const findCompetionItem = (item = {}) => {
    return {
      twitter_follow: {
        title: `Follow @${item?.config1} on Twitter`,
        icon: <TwitterIcon height={24} width={24} />,
        backgroundColor: '#1DA1F2',
      },
      reddit_visit: {
        title: `Join ${item?.config2} on Reddit`,
        icon: <RedditIcon height={24} width={24} />,
        backgroundColor: '#FF5700',
      },
      instagram_visit_profile: {
        title: `Visit @${item?.config3} on Instagram`,
        icon: <InstagramIcon height={24} width={24} />,
        backgroundColor: '#833AB4',
      },
      producthunt_upvote: {
        title: `Vote for ${item?.config2} on Product Hunt`,
        icon: <ProductHuntIcon height={24} width={24} />,
        backgroundColor: '#DA552F',
      },
      email_subscribe: {
        title: `Subscribe to our email list`,
        icon: <KelpIcon height={24} width={24} />,
        backgroundColor: '#46D6A2',
      },
      share_action: {
        title: `Share with your friends`,
        icon: <ShareIcon height={24} width={24} />,
        backgroundColor: '#F26B21',
      },
      telegram_enter: {
        title: `Join the Kelp Telegram Channel`,
        icon: <TelegramIcon height={24} width={24} />,
        backgroundColor: '#833AB4',
      },
      blog_rss: {
        title: `Subscribe to my ${item?.config1} RSS Feed`,
        icon: <KelpIcon height={24} width={24} />,
        backgroundColor: '#46D6A2',
      },
      bonus: {
        title: `Confirm Your Entry`,
        icon: <RedditIcon height={24} width={24} />,
        backgroundColor: '#F26B21',
      },
    };
  };

  useEffect(() => {
    const fetchAirDropCompetitions = async () => {
      try {
        const entrydata = await getAirdropCompetitions();
        getGleamAction(entrydata?.['data']?.[0]);
      } catch (error) {
        console.log(
          '[PublicSaleDashboard] fetchAirDropCompetitions error: ',
          JSON.stringify(error)
        );
      }
    };

    fetchAirDropCompetitions();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

      <ScrollView style={[styles.cardContainer]}>
        <View style={styles.contentContainer}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <PoppinsBold
              style={[styles.headingMainText, { color: Colors[colorScheme].brandLightGreen }]}>
              Kelp Airdrop
            </PoppinsBold>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PreSale');
              }}>
              <PoppinsRegular
                style={[
                  styles.headingSecondaryText,
                  { color: Colors[colorScheme].contentSecondary },
                ]}>
                Pre sale
              </PoppinsRegular>
            </TouchableOpacity>
          </View>

          {/* Countdown */}
          {airdropConfig?.countdownTimer && (
            <CountdownTimer
              date={
                gleamData?.ends_at
                  ? moment(gleamData?.ends_at).toDate()
                  : moment(airdropConfig.countdownTimer).toDate()
              }
              onTimerComplete={() => navigation.replace('Root')}
            />
          )}

          {/* Rank */}
          <View style={[styles.infoCardContainer, { marginTop: 5 }]}>
            <View style={styles.infoCardWrapper}>
              <PoppinsBold
                style={[
                  styles.infoCardNumber,
                  {
                    color: Colors[colorScheme].brandLightGreen,
                  },
                ]}>
                {clipDecimal(rank)[0]}
              </PoppinsBold>
              <PoppinsBold
                style={[
                  styles.infoCardText,
                  {
                    color: Colors[colorScheme].contentSecondary,
                  },
                ]}>
                CURRENT POSITION OUT OF {clipDecimal(totalParticipant)[0]}
              </PoppinsBold>
            </View>
          </View>

          {/* Points */}
          <View style={[styles.infoCardContainer, { marginTop: 25 }]}>
            <View style={styles.infoCardWrapper}>
              <PoppinsBold
                style={[
                  styles.infoCardNumber,
                  {
                    color: Colors[colorScheme].brandLightGreen,
                  },
                ]}>
                {clipDecimal(points)[0]}
              </PoppinsBold>
              <PoppinsRegular
                style={[
                  styles.infoCardText,
                  {
                    color: Colors[colorScheme].contentSecondary,
                  },
                ]}>
                YOUR POINTS
              </PoppinsRegular>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <PoppinsBold style={styles.descriptionHeading}>The Kelp Airdrop</PoppinsBold>

            <PoppinsRegular style={styles.description}>
              The more you participate, the higher your position, and the greater the chance to
              receive the airdrop!
            </PoppinsRegular>
          </View>

          {/* Checklist */}
          <View style={styles.checklistContainer}>
            {gleamData?.entry_methods?.map((item: { type?: any; worth?: any }, idx: React.Key) => (
              <View
                key={idx}
                style={[
                  styles.checklistItemWrapper,
                  {
                    marginTop: idx === 0 ? 0 : 10,
                  },
                ]}>
                <View
                  style={[
                    styles.checklistItemIcon,
                    {
                      backgroundColor: findCompetionItem(item)?.[item?.type]?.backgroundColor,
                    },
                  ]}>
                  {findCompetionItem(item)?.[item?.type]?.icon}
                </View>

                <View style={styles.checklistItemTitleContainer}>
                  <PoppinsMedium style={styles.checklistItemTitle}>
                    {findCompetionItem(item)?.[item?.type]?.title}
                  </PoppinsMedium>
                </View>

                <View
                  style={[
                    styles.checklistItemPointsContainer,
                    {
                      backgroundColor: Colors[colorScheme].brandLightGreen,
                    },
                  ]}>
                  <PoppinsRegular style={styles.checklistItemPoints}>+{item.worth}</PoppinsRegular>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
