import { combineReducers } from 'redux';

import profileInfo from '../screens/BuildProfileScreen/store/reducer';
import main from './main/mainReducer';
import collections from './collections/reducer';
import products from './products/reducer';
import addresses from './addresses/reducer';
import orders from './orders/reducer';
import resellerProduct from './resellerProducts/reducer';
import paymentSource from './paymentSource/reducer';

const fullStore = {
  main,
  profileInfo,
  collections,
  products,
  addresses,
  orders,
  resellerProduct,
  paymentSource,
};

const rootReducer = combineReducers(fullStore);

export default rootReducer;
