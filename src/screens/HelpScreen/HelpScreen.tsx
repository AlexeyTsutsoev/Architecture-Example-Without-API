import React, { FC } from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  Linking,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../../redux/store';

import BigButton from '../../components/buttons/BigButton/BigButton';
import { SettingParamList } from '../../navigation/SettingNavigation/SettingNavigation';

import BlueArrowRight from '../../assets/svgs/general/BlueArrowRight.svg';
import styles from './HelpScreen.style';
import { HelpItem, mockValues } from './info';

type NavigationProps = StackNavigationProp<SettingParamList, 'HelpScreen'>;

const HelpScreen: FC = () => {
  // navigation
  const naviation = useNavigation<NavigationProps>();

  const navigateToHelpDescription = (item: HelpItem) => {
    naviation.navigate('HelpDescriptionScreen', { item });
  };

  // redux
  const supportPhone = useAppSelector(
    state => state.main.user?.khoynSupportPhoneNumber,
  );

  //linking
  const openWhatsApp = async () => {
    try {
      const whatsAppNumber = '+' + (supportPhone ?? '');

      const msg = 'Hello, please help me with the Khoyn app';

      const url = `whatsapp://send?text=${msg}&phone=${whatsAppNumber}`;
      Linking.openURL(url)
        .then(data => {
          console.log('WhatsApp Opened successfully ' + data);
        })
        .catch(() => {
          const isIos = Platform.OS === 'ios';
          if (isIos) {
            Linking.openURL(
              'itms-apps://itunes.apple.com/us/app/apple-store/whatsapp-messenger?mt=8',
            );
            return;
          }

          Linking.openURL('market://details?id=com.whatsapp');
        });
    } catch (err: any) {
      console.log(err);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<HelpItem>) => {
    return (
      <TouchableOpacity onPress={() => navigateToHelpDescription(item)}>
        <View style={styles.itemConteiner}>
          <Text style={styles.itemText}>{item.title}</Text>
          <BlueArrowRight />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={mockValues}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.bottomContainer}>
        <BigButton title="Chat to Agent" onPress={openWhatsApp} />
        <Text style={styles.bottomText}>
          Have another question? Talk to your support agent.
        </Text>
      </View>
    </View>
  );
};

export default HelpScreen;
