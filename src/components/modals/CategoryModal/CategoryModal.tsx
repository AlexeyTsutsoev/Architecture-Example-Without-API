import React, { FC, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import useScale from '../../../hooks/useScale';
import { useAppSelector } from '../../../redux/store';
import LittleBlackButton from '../../buttons/LittleBlackButton/LittleBlackButton';
import LittleRedButton from '../../buttons/LittleRedButton/LittleRedButton';
import CustomRadioGroup, {
  RadioItemType,
} from '../../inputs/CustomRadioGroup/CustomRadioGroup';
import styles from './CategoryModal.style';

type Props = {
  intermediateCategory: string;
  modalToggle: () => void;
  radioAction: (text: string) => void;
  cancelCategorues: () => void;
};

const CategoryModal: FC<Props> = ({
  modalToggle,
  intermediateCategory,
  radioAction,
  cancelCategorues,
}) => {
  // styles
  const scale = useScale();
  const stylesWithProps = useMemo(() => styles(scale), [scale]);

  // redux
  const categories = useAppSelector(state => state.products.categories);

  // state
  const [btnTitle, setBtnTitle] = useState<string>();

  // effects
  useEffect(() => {
    if (!intermediateCategory) {
      return;
    }
    const getButtonTitle = (currentId: string) => {
      let name = '';
      const recuring = (id: string) => {
        const current = categories?.allCategories[id];
        name = `${current?.name} / ${name}`;
        if (!current?.parentId) {
          return;
        }
        recuring(current.parentId);
      };
      recuring(currentId);
      return name;
    };
    setBtnTitle(getButtonTitle(intermediateCategory));
  }, [categories?.allCategories, intermediateCategory, setBtnTitle]);

  // memoize
  const categoriesForRender: RadioItemType[] = useMemo((): RadioItemType[] => {
    if (categories) {
      if (!intermediateCategory && categories) {
        return categories.rootIds?.map(item => {
          return { id: item, title: categories.allCategories[item].name };
        });
      }
      if (
        categories?.allCategories?.[intermediateCategory].children.length < 1
      ) {
        const parent = categories.allCategories[intermediateCategory].parentId;
        if (!parent) {
          return categories.rootIds.map(item => {
            return { id: item, title: categories.allCategories[item].name };
          });
        }
        return categories.allCategories[parent].children.map(item => ({
          id: item,
          title: categories?.allCategories?.[item].name,
        }));
      }
      if (intermediateCategory) {
        return categories?.allCategories?.[intermediateCategory].children.map(
          item => ({
            id: item,
            title: categories?.allCategories?.[item].name,
          }),
        );
      }
    }
    return [] as RadioItemType[];
  }, [categories, intermediateCategory]);

  return (
    <View style={stylesWithProps.modalContainer}>
      <View style={stylesWithProps.mainContent}>
        <Text style={stylesWithProps.subTitle}>Select category</Text>
        {!!intermediateCategory && (
          <Text style={stylesWithProps.title}>{btnTitle}</Text>
        )}
        <CustomRadioGroup
          selectedItem={intermediateCategory}
          items={categoriesForRender}
          setSelectedItem={radioAction}
        />
      </View>
      <View style={stylesWithProps.btnContainer}>
        <LittleRedButton
          title={intermediateCategory ? '< Back' : '< Cancel'}
          onPress={cancelCategorues}
        />
        <LittleBlackButton title="Apply >" onPress={modalToggle} />
      </View>
    </View>
  );
};

export default CategoryModal;
