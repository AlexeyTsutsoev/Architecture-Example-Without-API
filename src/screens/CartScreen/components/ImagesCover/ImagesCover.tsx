import React, { FC } from 'react';
import { View, Image, ImageBackground } from 'react-native';

import EmptyProductIcon from '../../../../assets/svgs/productsIcons/EmptyProductIcon.svg';
import styles from './ImagesCover.style';
import { LineItem } from '../../../../API/responsesTypes';

type Props = {
  products: LineItem[];
};

const ImagesCover: FC<Props> = ({ products }) => {
  const mainCover = products[0]?.variant?.image?.product_url;
  const blurCover = products[1]?.variant?.image?.product_url;

  if (products.length < 2) {
    return (
      <View style={styles.singleImage}>
        {mainCover ? (
          <Image style={styles.oneImage} source={{ uri: mainCover }} />
        ) : (
          <View style={styles.emptyContainer}>
            <EmptyProductIcon />
          </View>
        )}
      </View>
    );
  }

  return (
    <ImageBackground
      style={[styles.container, styles.imageBackground]}
      blurRadius={10}
      source={{ uri: blurCover }}>
      <Image
        style={[styles.topImage, styles.container]}
        source={{ uri: mainCover }}
      />
    </ImageBackground>
  );
};

export default ImagesCover;
