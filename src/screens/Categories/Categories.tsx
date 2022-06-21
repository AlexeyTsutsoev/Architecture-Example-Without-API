import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, Text, ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  incrementCurrentPage,
  reloadProducts,
  setFilters,
  setSearch,
} from '../../redux/products/reducer';
import { loadProducts } from '../../redux/products/thunks';

import useScale from '../../hooks/useScale';

import SplashScreen from '../SplashScreen/SplashScreen';
import { RootHomeParamList } from '../../navigation/HomeNavigation/HomeNavigation';
import CustomSearchInput from '../../components/inputs/CustomSearchInput/CustomSearchInput';
import CollectionItem from '../../components/UIComponents/CollectionItem/CollectionItem';
import MainModal from '../../components/modals/MainModal/MainModal';
import FiltersModal from '../../components/modals/FiltersModal/FiltersModal';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import { RadioItemType } from '../../components/inputs/CustomRadioGroup/CustomRadioGroup';
import EmptyContainer from './components/EmptyContainer/EmptyContainer';
import BubbleComponent from '../../components/UIComponents/BubbleComponent/BubbleComponent';

import styles from './Categories.style';
import prepareProduct, { PreparedProduct } from '../../utils/prepareProduct';

type CustomRouteProps = RouteProp<RootHomeParamList, 'Categories'>;

type HeaderType = {
  title: string;
  onPress: () => void;
};

const radioData: RadioItemType[] = [
  { id: (Date.now() - 604800000).toString(), title: 'Last Week' },
  { id: (Date.now() - 604800000 * 2).toString(), title: 'Last Two Week' },
];

const Categories: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // redux
  const dispatch = useAppDispatch();

  // navigation
  const { params } = useRoute<CustomRouteProps>();

  // state
  const [isVisible, setVisible] = useState<boolean>(
    Boolean(params.isSHowFilter),
  );
  const [canAction, setCanAction] = useState<boolean>(false);
  const [value, setValue] = useState<string>(params.searchValue ?? '');
  const { isLoading, products, pageInfo } = useAppSelector(
    state => state.products,
  );

  // prepare product
  const preparedProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    return products.map(product =>
      prepareProduct({ type: 'product', item: product }),
    );
  }, [products]);

  //filters
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [low, setLow] = useState<number>(100);
  const [high, setHigh] = useState<number>(5000);
  const [intermediateCategory, setIntermediateCategory] = useState<string>('');

  const resetFitlers = useCallback(() => {
    setSelectedTime('');
    setLow(100);
    setHigh(5000);
    setValue('');
    setIntermediateCategory('');
  }, []);

  const onReset = useCallback(() => {
    dispatch(reloadProducts());
    resetFitlers();
    setVisible(false);
    dispatch(loadProducts());
  }, [dispatch, resetFitlers]);

  const dispatchFilters = useCallback(() => {
    dispatch(
      setFilters({
        low: low,
        high: high,
        created_at: selectedTime,
        currentCategoryId: intermediateCategory,
      }),
    );
    setVisible(false);
    dispatch(loadProducts());
  }, [dispatch, high, intermediateCategory, low, selectedTime]);

  const visibleToggle = () => {
    setVisible(prev => !prev);
  };

  const loadMoreHandler = () => {
    if (canAction && !isLoading) {
      if (pageInfo.currentPage < pageInfo.page_count) {
        dispatch(incrementCurrentPage());
        dispatch(loadProducts());
      }
    }
  };

  const reloadRange = () => {
    setLow(100);
    setHigh(5000);
  };

  const reloadSelectedTime = () => {
    setSelectedTime('');
  };

  const searchRequest = () => {
    dispatch(reloadProducts());
    dispatch(setSearch(value));
    dispatch(loadProducts());
  };

  // renders
  const renderItem = ({ item }: ListRenderItemInfo<PreparedProduct>) => {
    return <CollectionItem product={item} />;
  };

  const renderHeader = () => {
    let filters: HeaderType[] = [];

    if (low !== 100 || high !== 5000) {
      filters.push({ title: `R${low} - R${high}`, onPress: reloadRange });
    }
    if (selectedTime) {
      const selectedItem = radioData.find(item => item.id === selectedTime);
      selectedItem &&
        filters.push({
          title: selectedItem.title,
          onPress: reloadSelectedTime,
        });
    }
    return filters.length === 0 ? (
      <Text style={stylesWithProps.title}>{params?.title ?? 'Products'}</Text>
    ) : (
      <View style={stylesWithProps.headerFilterStyles}>
        {filters.map(item => (
          <BubbleComponent
            key={item.title}
            title={item.title}
            onPress={item.onPress}
          />
        ))}
      </View>
    );
  };

  const renderFooter = () => {
    return isLoading ? <CustomLoader /> : null;
  };

  return (
    <View style={stylesWithProps.container}>
      <View style={stylesWithProps.itemContainer}>
        <CustomSearchInput
          value={value}
          onChangeText={setValue}
          onPressAccessory={visibleToggle}
          accessoryRight
          onSubmitEditing={searchRequest}
        />
      </View>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyContainer onReset={onReset} />}
          ListHeaderComponent={renderHeader}
          style={stylesWithProps.contentContainer}
          data={preparedProducts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0}
          onEndReached={loadMoreHandler}
          onScrollBeginDrag={() => {
            setCanAction(true);
          }}
          onScrollEndDrag={() => {
            setCanAction(false);
          }}
          onMomentumScrollBegin={() => {
            setCanAction(true);
          }}
        />
      )}
      <MainModal isVisible={isVisible} onPressOut={visibleToggle}>
        <FiltersModal
          setHigh={setHigh}
          setLow={setLow}
          onReset={onReset}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          radioData={radioData}
          onApply={dispatchFilters}
          onCancel={visibleToggle}
          intermediateCategory={intermediateCategory}
          setIntermediateCategory={setIntermediateCategory}
        />
      </MainModal>
    </View>
  );
};

export default Categories;
