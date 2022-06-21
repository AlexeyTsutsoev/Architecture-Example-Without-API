import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RegistrationNavigator/RegistrationNavigator';

import { SceneMap, TabView } from 'react-native-tab-view';

import useTabViewInfo from '../../hooks/useTabViewInfo';

import BottomButton from './components/BottomButton';
import MainInfoForm from './components/MainInfoForm/MainInfoForm';
import StoreName from './components/StoreName/StoreName';
import LinkSocials from './components/LinkSocials/LinkSocials';
import SocialChannels from './components/SocialChannels/SocialChannels';

import styles from './BuildProfileScreen.style';

const routes = [
  { key: 'first', id: 0 },
  { key: 'second', id: 1 },
  { key: 'third', id: 2 },
  { key: 'fourth', id: 3 },
];

const renderScene = SceneMap({
  first: () => <MainInfoForm />,
  second: () => <StoreName />,
  third: () => <SocialChannels />,
  fourth: () => <LinkSocials />,
});

type NavigationProps = StackNavigationProp<RootStackParamList, 'BuildProfile'>;

const BuildProfileScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { index, setIndex, moveToBack, moveToNextTab } = useTabViewInfo();
  const btnText = index > 2 ? 'Create profile' : 'Proceed >';

  const navigateToNext = () => {
    if (index > 2) {
      navigation.navigate('TutorialScreen');
      return;
    }
    moveToNextTab();
  };

  const renderTabBar = () => {
    return (
      <View style={styles.dotContainer}>
        {routes.map(route => (
          <View
            key={route.key}
            style={[styles.dot, route.id === index && styles.selectedDot]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabView}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          tabBarPosition="bottom"
        />
      </View>
      <View style={styles.bottomContainer}>
        <BottomButton
          route={routes[index].key}
          text={btnText}
          onPress={navigateToNext}
          onBack={moveToBack}
        />
      </View>
    </View>
  );
};

export default BuildProfileScreen;
