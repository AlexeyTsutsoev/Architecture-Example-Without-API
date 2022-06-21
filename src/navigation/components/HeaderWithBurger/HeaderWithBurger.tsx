import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { StackHeaderProps } from '@react-navigation/stack';
import useScale from '../../../hooks/useScale';
import styles from './HeaderWithBurger.style';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import MenuItem from '../../../components/buttons/MenuItem/MenuItem';
import VElipses from '../../../assets/svgs/general/VElipses.svg';
import CloseIcon from '../../../assets/svgs/general/CloseIcon.svg';
import CopyIcon from '../../../assets/svgs/general/CopyIcon.svg';
import RocketIcon from '../../../assets/svgs/general/RocketIcon.svg';
import PlusIcon from '../../../assets/svgs/general/PlusIcon.svg';

type Props = BottomTabHeaderProps | StackHeaderProps;

const HeaderWithBurger: FC<Props> = ({ options, navigation }) => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const navigateToEditMirror = () => {
    navigation.navigate('EditMirrorScreen');
  };

  const navigateToNewproduct = () => {
    navigation.navigate('AddNewProduct');
  };

  const navigateToPowerUp = () => {
    navigation.navigate('PowerUpScreen');
  };

  return (
    <View style={stylesWithProps.container}>
      <Text style={stylesWithProps.title}>{options.title?.toUpperCase()}</Text>
      <Menu style={stylesWithProps.menuWrapper}>
        <MenuTrigger>
          <View style={stylesWithProps.dotsWrapper}>
            <VElipses />
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={navigateToPowerUp}>
            <MenuItem title="Power Up" icon={() => <RocketIcon />} />
          </MenuOption>
          <MenuOption onSelect={navigateToEditMirror}>
            <MenuItem title="Edit My Mirror" icon={() => <CopyIcon />} />
          </MenuOption>
          <MenuOption onSelect={navigateToNewproduct}>
            <MenuItem title="Add a product" icon={() => <PlusIcon />} />
          </MenuOption>
          <MenuOption onSelect={navigateToEditMirror}>
            <MenuItem title="Remove all" icon={() => <CloseIcon />} />
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HeaderWithBurger;
