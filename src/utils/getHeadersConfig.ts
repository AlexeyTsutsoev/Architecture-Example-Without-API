import { ProductsHeaders } from '../API/taxons';

export const getHeadersConfig = ({
  XKhoynResellerId,
  XKhoynMerchantId,
}: ProductsHeaders) => {
  return {
    'X-Khoyn-Reseller-Id': XKhoynResellerId,
    'X-Khoyn-Merchant-Id': XKhoynMerchantId,
  };
};
