import React, { FC, useMemo, useState } from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';

import { RootHomeParamList } from '../../../navigation/HomeNavigation/HomeNavigation';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { SceneRendererProps, TabView } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';

import MainModal from '../../../components/modals/MainModal/MainModal';
import useScale from '../../../hooks/useScale';
import gradient from '../../../utils/theme/gradient';

import BackArrowIcon from '../../../assets/svgs/general/BackArrowIcon.svg';
import CloseIcon from '../../../assets/svgs/general/CloseIcon.svg';
import AddItem from '../../../assets/svgs/general/AddItem.svg';
import RemoveItem from '../../../assets/svgs/general/RemoveItem.svg';

import styles from './CustomHeader.style';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';

type Props = {
  name: string;
  covers?: string[];
  isAddedToReseller: boolean;
  onAddPress: () => void;
  isLoading: boolean;
};

type NavigationProps = StackNavigationProp<
  RootHomeParamList,
  'ProductDetailScreen'
>;

type ImageScene = {
  image: string;
  key: string;
};

const CustomHeader: FC<Props> = ({
  name,
  covers,
  isAddedToReseller,
  onAddPress,
  isLoading,
}) => {
  // navigation
  const navigation = useNavigation<NavigationProps>();

  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // image tab view info
  const [index, setIndex] = useState<number>(0);
  const [isShowFull, setShowFull] = useState<boolean>(false);

  const routes: ImageScene[] =
    covers?.map((item, i) => ({
      image: item,
      key: `tab-${i}`,
    })) ?? [];

  const renderScene = ({
    route,
  }: SceneRendererProps & { route: ImageScene }) => {
    return (
      <Pressable
        style={stylesWithProps.conentContainer}
        onPress={showFullToggle}>
        <Image
          style={stylesWithProps.image}
          resizeMode="contain"
          source={{ uri: route.image }}
        />
      </Pressable>
    );
  };

  const renderTabBar = () => {
    return (
      <View style={stylesWithProps.dotContainer}>
        {routes.map(route => (
          <View
            key={route.key}
            style={[
              stylesWithProps.dot,
              parseInt(route.key.split('-')[1], 10) === index &&
                stylesWithProps.selectedDot,
            ]}
          />
        ))}
      </View>
    );
  };

  // helpers
  const goBack = () => {
    navigation.goBack();
  };

  const showFullToggle = () => {
    setShowFull(prev => !prev);
  };

  return (
    <View style={stylesWithProps.container}>
      <MainModal
        type="center"
        isVisible={isShowFull}
        onPressOut={showFullToggle}>
        <SafeAreaView>
          <View style={stylesWithProps.conentContainer}>
            <CloseIcon style={stylesWithProps.closeIcon} />
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              renderTabBar={renderTabBar}
              tabBarPosition="bottom"
            />
          </View>
        </SafeAreaView>
      </MainModal>
      <Pressable
        style={[stylesWithProps.pressableWrapper, stylesWithProps.arrowWrapper]}
        onPress={goBack}>
        <BackArrowIcon />
      </Pressable>
      <Pressable
        style={[
          stylesWithProps.pressableWrapper,
          stylesWithProps.addRemoveWrapper,
        ]}
        onPress={onAddPress}>
        {isAddedToReseller ? <RemoveItem /> : <AddItem />}
      </Pressable>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={() => null}
      />
      <LinearGradient
        colors={gradient}
        style={stylesWithProps.gradientContainer}>
        <Text style={stylesWithProps.title}>{name}</Text>
        {renderTabBar()}
      </LinearGradient>
      {isLoading && (
        <View style={stylesWithProps.loadingContainer}>
          <CustomLoader />
        </View>
      )}
    </View>
  );
};

export default CustomHeader;
