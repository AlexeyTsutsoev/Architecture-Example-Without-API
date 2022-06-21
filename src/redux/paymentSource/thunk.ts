import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentFromAPI } from '../../API/paymentSources';
import { Card } from '../../API/responsesTypes';
import { toCamelCase } from '../../utils/toCamelCase';
import { AppDispatch, RootState } from '../store';
import { Payment } from './reducer';

const parseItem = (item: Card) => {
  const result: any = {};
  for (let key in item) {
    let camelCassedKey = toCamelCase(key);
    result[camelCassedKey] = (item as any)[key];
  }
  return result as Payment;
};

export const getPaymentSource = createAsyncThunk<
  Payment[],
  void,
  { state: RootState; dispatch: AppDispatch }
>('paymentSource/getPaymentFromAPI', async () => {
  try {
    const { data } = await getPaymentFromAPI();
    const cards = data.items.map(item =>
      parseItem(item.source.payment_method.card!),
    );
    return cards;
  } catch (err: any) {
    console.log('ERR_FROM_THUNK_', err);
    return [];
  }
});
