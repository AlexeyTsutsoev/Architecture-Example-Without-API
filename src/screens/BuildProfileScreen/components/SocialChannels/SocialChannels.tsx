import React, { FC, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useAppDispatch } from '../../../../redux/store';
import { socialLink, updateSocisalWebs } from '../../store/reducer';
import webs from '../../../../utils/constants/socialWebs';
import CustomCheckbox from '../../../../components/CustomCheckbox/CustomCheckbox';
import styles from './SocialChannels.style';
import useScale from '../../../../hooks/useScale';

const SocialChannels: FC = () => {
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  const [selectedWebs, setSelectedWebs] = useState<Array<socialLink>>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateSocisalWebs(selectedWebs));
  }, [dispatch, selectedWebs]);

  const selectedToggle = (item: socialLink) => {
    const isSelected = !!selectedWebs.find(web => web.id === item.id);
    isSelected
      ? setSelectedWebs(prev => prev.filter(web => web.id !== item.id))
      : setSelectedWebs(prev => [...prev, item]);
  };

  const formattedWebs = useMemo(() => {
    return webs.map(i => ({
      ...i,
      marginVertical: scale.scaleHeight(scale.randomInteger(5, 40)),
      marginHorizontal: scale.scaleWidth(scale.randomInteger(5, 40)),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<
    socialLink & { marginVertical: number; marginHorizontal: number }
  >) => {
    const isSelected = !!selectedWebs.find(web => web.id === item.id);
    return (
      <View
        style={{
          marginVertical: item.marginVertical,
          marginHorizontal: item.marginHorizontal,
        }}>
        <CustomCheckbox
          onPress={() => selectedToggle(item)}
          title={item.title}
          isSelected={isSelected}
        />
      </View>
    );
  };

  return (
    <View>
      <Text style={stylesWithProps.title}>Select social channels</Text>
      <Text style={stylesWithProps.selectText}>
        Select your top ones
        <Text style={stylesWithProps.selectedNum}>
          {' '}
          ({selectedWebs.length})
        </Text>
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => item.id}
        data={formattedWebs}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SocialChannels;
