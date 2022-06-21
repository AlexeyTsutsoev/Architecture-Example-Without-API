import { format } from 'date-fns';

export const formatFromString = (strDate: string) => {
  return format(new Date(strDate), 'dd MMMM yyyy');
};
