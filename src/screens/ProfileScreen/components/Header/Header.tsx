import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import CustomSearchInput from '../../../../components/inputs/CustomSearchInput/CustomSearchInput';
import useScale from '../../../../hooks/useScale';

import ConversionsIcon from '../../../../assets/svgs/storeIcons/ConversionsIcon.svg';
import TotalEarningsIcon from '../../../../assets/svgs/storeIcons/TotalEarningsIcon.svg';
import TotalSalesIcon from '../../../../assets/svgs/storeIcons/TotalSalesIcon.svg';
import TrafficIcon from '../../../../assets/svgs/storeIcons/TrafficIcon.svg';

import styles from './Header.style';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  reloadResllerProduct,
  setResellerSearch,
} from '../../../../redux/resellerProducts/reducer';
import { loadResellerProducts } from '../../../../redux/resellerProducts/thunk';
import { getRevenueFromServer } from '../../../../API/reports';
import CustomLoader from '../../../../components/CustomLoader/CustomLoader';

const Header: FC = () => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // redux
  const dispatch = useAppDispatch();
  const { q } = useAppSelector(state => state.resellerProduct.filters);
  const merchId = useAppSelector(state => state.main.ownMerchant?.id);

  // search state
  const [search, setSearch] = useState<string>(q ?? '');

  // statistic states
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalRevenue, setTotalRevenue] = useState<string>('$3,200.00');
  const [totalSales, setTotalSales] = useState<string>('$3,200.00');
  const [traffic, setTraffic] = useState<number>(500);
  const [conversion, setConversion] = useState<string>('15%');

  // callbacks
  const loadStatistic = useCallback(async () => {
    try {
      setLoading(true);
      if (!merchId) {
        Alert.alert('No Own Merchant');
        setTotalRevenue('$0');
        setTotalSales('$0');
        setTraffic(0);
        setConversion('None');
        return;
      }
      const { data } = await getRevenueFromServer(merchId);
      setTotalRevenue(`${data.revenue_currency} ${data.revenue_cents}`);
    } catch (err: any) {
      console.log('ERR_FROM_LOAD_STAT', err);
    } finally {
      setLoading(false);
    }
  }, [merchId]);

  // effects
  useEffect(() => {
    loadStatistic();
  }, [loadStatistic]);

  // helpers
  const onEndEditingSerach = () => {
    dispatch(reloadResllerProduct());
    dispatch(setResellerSearch(search));
    dispatch(loadResellerProducts());
  };

  return (
    <>
      <View
        style={[
          stylesWithProps.statisticContainer,
          isLoading && stylesWithProps.staticticLoading,
        ]}>
        {isLoading && (
          <View style={stylesWithProps.loaderContainer}>
            <CustomLoader />
          </View>
        )}
        <View style={stylesWithProps.statisticItem}>
          <TotalSalesIcon style={stylesWithProps.iconStyle} />
          <View style={stylesWithProps.textContainer}>
            <Text allowFontScaling style={stylesWithProps.statTitle}>
              {totalSales}
            </Text>
            <Text allowFontScaling style={stylesWithProps.statSubTitle}>
              Total Sales
            </Text>
          </View>
        </View>
        <View style={stylesWithProps.statisticItem}>
          <TotalEarningsIcon style={stylesWithProps.iconStyle} />
          <View style={stylesWithProps.textContainer}>
            <Text allowFontScaling style={stylesWithProps.statTitle}>
              {totalRevenue}
            </Text>
            <Text allowFontScaling style={stylesWithProps.statSubTitle}>
              Total Earnings
            </Text>
          </View>
        </View>
        <View style={stylesWithProps.statisticItem}>
          <TrafficIcon style={stylesWithProps.iconStyle} />
          <View style={stylesWithProps.textContainer}>
            <Text allowFontScaling style={stylesWithProps.statTitle}>
              {traffic}
            </Text>
            <Text allowFontScaling style={stylesWithProps.statSubTitle}>
              Traffic
            </Text>
          </View>
        </View>
        <View style={stylesWithProps.statisticItem}>
          <ConversionsIcon style={stylesWithProps.iconStyle} />
          <View style={stylesWithProps.textContainer}>
            <Text allowFontScaling style={stylesWithProps.statTitle}>
              {conversion}
            </Text>
            <Text allowFontScaling style={stylesWithProps.statSubTitle}>
              Conversions
            </Text>
          </View>
        </View>
      </View>
      <CustomSearchInput
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={onEndEditingSerach}
      />
      <Text style={[stylesWithProps.headerTitle, stylesWithProps.statTitle]}>
        Products
      </Text>
    </>
  );
};

export default Header;
