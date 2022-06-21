import {
  ProductTypeFromServer,
  ResellerVariant,
  Variant,
} from '../API/responsesTypes';
import { CamelCasedResellerProdustType } from '../redux/resellerProducts/reducer';

export interface PreparedProduct {
  id: string;
  resellerCatalogId: string;
  name: string;
  description: string;
  productUrl: string;
  imageUrl: string;
  price: string;
  shipping: string;
  masterVariant: ResellerVariant;
  isAddedToResellerCatalog: boolean;
  variants?: Variant[];
  covers: string[];
  displayMargin: string;
  numericPrice: number;
  percentageMarkup: number;
}

type Options1 = {
  type: 'product';
  item: ProductTypeFromServer;
};

type Options2 = {
  type: 'reseller';
  item: CamelCasedResellerProdustType;
};

const prepareProduct = (options: Options1 | Options2): PreparedProduct => {
  if (options.type === 'product') {
    const { item } = options;
    const covers = item.images.map(image => image.original_url);

    return {
      id: item.id,
      resellerCatalogId: item.reseller_catalog_item_id ?? item.id,
      isAddedToResellerCatalog: Boolean(item.added_to_reseller_catalog),
      name: item.name,
      description: item.description,
      productUrl: item.product_url,
      imageUrl: item.images[0]?.original_url ?? item.image?.original_url,
      price: `${item.display_amount} each`,
      shipping: item.shipping_methods[0].name,
      masterVariant: item.master_variant,
      variants: item.variants,
      displayMargin: item.reseller_display_approx_margin,
      numericPrice: parseFloat(item.price),
      percentageMarkup: 0,
      covers,
    };
  }
  const { item } = options;
  const covers = item.images.map(image => image.product_url);
  return {
    id: item.productId,
    resellerCatalogId: item.id,
    isAddedToResellerCatalog: true,
    name: item.name,
    description: item.description,
    productUrl: item.productUrl,
    imageUrl: item.images[0].product_url,
    price: `${item.displayAmount} each`,
    shipping: item.shippingMethods[0].name,
    masterVariant: item.masterVariant,
    variants: item.variants,
    displayMargin: item.resellerDisplayApproxMargin,
    numericPrice: parseFloat(item.price),
    percentageMarkup: item.percentageMarkup,
    covers,
  };
};

export default prepareProduct;
