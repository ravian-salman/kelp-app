import { Icon } from '@ui-kitten/components';
import React, { useCallback, useState, useEffect } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';

import EnhancedText from '../EnhancedText';
import PagerProgressBar from '../PagerProgressBar';
import { PoppinsBold, PoppinsMedium, PoppinsRegular } from '../StyledText';
import { View, SafeAreaView, Button } from '../Themed';
import styles from './styles';
import { CardType, Data } from './type';
import { useWalletContext } from '../../hooks/useWallet';
import axios from 'axios';
import { Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

type DynamicPagerProps = Data & {
  handleNextCard: () => void;
  handleSkip: () => void;
  handleCancelIcon: () => void;
};

export default function DynamicPager({
  handleNextCard,
  handleSkip,
  handleCancelIcon,
  ...rest
}: DynamicPagerProps): JSX.Element | null {
  /**
   * As id is one of the props, as soon as the id changes, react will be forced
   * to create a new element from scratch, hence a new state would be built.
   * Thus no two multi content card will end up using the same state.
   */
  const { type } = rest;
  //const competitions_data = {} ;

  const [contentIdx, setContentIdx] = useState(0);
  const { address } = useWalletContext();

  const resetContextIdx = () => {
    setContentIdx(0);
  };

  const handleNextContent = useCallback(() => {
    const { content } = rest;

    if (Array.isArray(content) && contentIdx + 1 < content.length) {
      setContentIdx(contentIdx + 1);
    } else {
      handleNextCard();
    }
  }, [contentIdx]);

  const handleSkipContent = () => {
    handleNextCard();
  };

  useEffect(() => {
    axios
      .post('http://10.10.13.35:5000/api/users/newaddress/', { address: address })
      .then((resp) => {
        console.log('message:', resp.data);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    console.log('Visible items are', viewableItems);
    setContentIdx(viewableItems?.[0]?.index);
  }, []);

  console.log('type:', type);
  switch (type) {
    case CardType.INFOGRAPHIC: {
      const { content } = rest;
      const contentArray = Array.isArray(content) ? content : [content];

      return (
        <SafeAreaView>
          <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />
          <View
            style={[
              styles.cardContainer,
              {
                position: 'relative',
              },
            ]}>
            <View style={styles.contentWrapper}>
              <FlatList
                data={contentArray}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 50,
                }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  const { title, image, description } = item;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.dynamicContentWrapper,
                        { justifyContent: 'center', width: Dimensions.get('screen').width },
                      ]}>
                      <View style={styles.imageContainer}>
                        {React.createElement(image, {
                          height: 247,
                          width: 247,
                          preserveAspectRatio: 'xMidYMax',
                        })}
                      </View>
                      <View style={styles.titleContainer}>
                        <EnhancedText style={styles.title}>{title}</EnhancedText>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <PoppinsRegular style={styles.description}>{description}</PoppinsRegular>
                      </View>
                    </View>
                  );
                }}
              />
            </View>

            <View style={styles.progressBarContainer}>
              <TouchableOpacity style={styles.skipButtonView} onPress={handleSkipContent}>
                <PoppinsMedium style={styles.txtSkipAndNext}>SKIP</PoppinsMedium>
              </TouchableOpacity>
              <PagerProgressBar length={contentArray.length} index={contentIdx} />
              <TouchableOpacity style={styles.nextButtonView} onPress={handleNextContent}>
                <PoppinsMedium style={styles.txtSkipAndNext}>NEXT</PoppinsMedium>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }
    case CardType.AGREEMENT: {
      const { content } = rest;

      const { title, points } = content;

      const pointArray = Array.isArray(points) ? points : [points];

      return (
        <SafeAreaView>
          <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <Pressable onPress={handleSkip}>
                <TouchableOpacity
                  onPress={() => {
                    handleCancelIcon();
                    resetContextIdx();
                  }}
                  style={styles.iconWrapper}>
                  <Icon
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    name="close-outline"
                    fill="#3f3f3f"
                  />
                </TouchableOpacity>
              </Pressable>
            </View>
            <View
              style={[
                styles.titleContainer,
                {
                  marginTop: 70,
                },
              ]}>
              <EnhancedText style={styles.title}>{title}</EnhancedText>
            </View>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
              }}
              style={styles.agreementScrollArea}>
              <View style={styles.agreementPointsContainer}>
                {pointArray.map((point, idx) => {
                  if (point === '') {
                    return <View key={idx} style={{ paddingTop: 16 }}></View>;
                  } else if (point[0] === '-') {
                    return (
                      <Unorderedlist key={idx}>
                        <PoppinsRegular style={styles.agreementPoints}>
                          {point.slice(1)}
                        </PoppinsRegular>
                      </Unorderedlist>
                    );
                  } else {
                    return (
                      <PoppinsRegular key={idx} style={styles.agreementPoints}>
                        {point}
                      </PoppinsRegular>
                    );
                  }
                })}
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button size="giant" style={styles.button} onPress={handleNextCard}>
                I UNDERSTAND AND ACCEPT
              </Button>
            </View>
          </View>
        </SafeAreaView>
      );
    }
    case CardType.FINAL: {
      const { content } = rest;

      const { title, subTitle, image } = content;

      return (
        <SafeAreaView>
          <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />
          <View style={styles.cardContainer}>
            <View style={styles.contentWrapper}>
              <View style={styles.imageContainer}>
                {React.createElement(image, {
                  height: 263,
                  width: 263,
                  preserveAspectRatio: 'xMidYMax',
                })}
              </View>
              <View style={styles.titleContainer}>
                <PoppinsBold style={styles.title}>{title}</PoppinsBold>
              </View>
              <View style={styles.subTitleContainer}>
                <EnhancedText
                  style={[
                    styles.title,
                    {
                      fontSize: 25,
                    },
                  ]}>
                  {subTitle}
                </EnhancedText>
              </View>
            </View>
            <View style={[styles.buttonContainer, { marginTop: 110 }]}>
              <Button size="giant" style={styles.button} onPress={handleNextCard}>
                NEXT
              </Button>
            </View>
          </View>
        </SafeAreaView>
      );
    }
    default:
      return null;
  }
}
