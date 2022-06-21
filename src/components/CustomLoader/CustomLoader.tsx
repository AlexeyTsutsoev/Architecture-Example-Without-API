import React, { FC } from 'react';
import * as Progress from 'react-native-progress';
import { deviceWidth } from '../../utils/scale/scale';
import colors from '../../utils/theme/colors/colors';

const CustomLoader: FC = () => {
  return (
    <Progress.Bar
      progress={0.4}
      width={deviceWidth() - 40}
      indeterminate
      borderColor={colors.main}
      color={colors.main}
    />
  );
};

export default CustomLoader;
