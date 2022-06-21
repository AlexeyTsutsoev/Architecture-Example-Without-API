import { useState } from 'react';

type ReturnedType = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  moveToBack: () => void;
  moveToNextTab: () => void;
};

const useTabViewInfo = (): ReturnedType => {
  const [index, setIndex] = useState<number>(0);

  const moveToNextTab = () => {
    setIndex(prev => prev + 1);
  };

  const moveToBack = () => {
    setIndex(prev => prev - 1);
  };

  return { index, setIndex, moveToBack, moveToNextTab };
};

export default useTabViewInfo;
