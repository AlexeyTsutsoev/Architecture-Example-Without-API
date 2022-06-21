import React, { FC, useMemo } from 'react';
import { View, Text, Alert } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import BigButton from '../../components/buttons/BigButton/BigButton';
import PressableText from '../../components/buttons/PressableText/PressableText';
import useTabViewInfo from '../../hooks/useTabViewInfo';
import Tab from './Tab/Tab';
import BigCheckIcon from '../../assets/svgs/general/BigCheckIcon.svg';
import styles from './TutorialScreen.style';
import { useAppDispatch } from '../../redux/store';
import useScale from '../../hooks/useScale';
import { buildProfile } from '../../redux/main/thunks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RegistrationNavigator/RegistrationNavigator';
import { useNavigation } from '@react-navigation/core';

const routes = [
  { key: 'first', id: 0 },
  { key: 'second', id: 1 },
  { key: 'third', id: 2 },
  { key: 'fourth', id: 3 },
];

const renderScene = SceneMap({
  first: () => (
    <Tab
      title="Curate Your Shop"
      description="Select which products should go into your store by
  clicking “Add to Store” on your fave’s!"
    />
  ),
  second: () => (
    <Tab
      title="Share store link on social"
      description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
    />
  ),
  third: () => (
    <Tab
      title="Get paid!"
      description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
    />
  ),
  fourth: () => (
    <Tab
      title="Step 4"
      description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
    />
  ),
});

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'TutorialScreen'
>;

const TutorialScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const dispatch = useAppDispatch();
  const { index, setIndex, moveToNextTab } = useTabViewInfo();
  const isLastTab = index > 2;

  const setAuth = async () => {
    try {
      await dispatch(buildProfile()).unwrap();
    } catch (err: any) {
      Alert.alert(err);
      navigation.reset({ index: 0, routes: [{ name: 'SignUpScreen' }] });
    }
  };

  const navigateToNext = () => {
    if (isLastTab) {
      setAuth();
      return;
    }
    moveToNextTab();
  };

  const renderTabBar = () => {
    return (
      <View style={stylesWithProps.dotContainer}>
        {routes.map(route => (
          <View
            key={route.key}
            style={[
              stylesWithProps.dot,
              route.id === index && stylesWithProps.selectedDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={stylesWithProps.container}>
      <View style={stylesWithProps.mainContainer}>
        <View style={stylesWithProps.TitleContainer}>
          <BigCheckIcon />
          <Text style={stylesWithProps.title}>
            {'Your Boohoo\nMini-Store is Up!'}
          </Text>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          tabBarPosition="bottom"
        />
      </View>
      <View style={stylesWithProps.bottomContainer}>
        <BigButton
          type="black"
          onPress={navigateToNext}
          title={isLastTab ? 'Get started >' : 'Proceed >'}
        />
        {!isLastTab && (
          <PressableText title="Skip Tutorial" onPress={setAuth} />
        )}
      </View>
    </View>
  );
};

export default TutorialScreen;
