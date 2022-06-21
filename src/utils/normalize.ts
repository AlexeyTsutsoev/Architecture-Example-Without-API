import { DepartmentsResponse } from '../API/taxons';
import { Taxons } from '../redux/products/reducer';

type ResultType = Record<string, Taxons>;

const result: ResultType = {};

const normalize = (array: DepartmentsResponse[]): ResultType => {
  const getNormalizeData = (
    Recuringarray: DepartmentsResponse[],
    parentId: string | null = null,
  ): void => {
    return Recuringarray.forEach(department => {
      const { children, ...rest } = department;
      if (children && children.length > 0) {
        result[department.id] = {
          ...rest,
          children: children.map(taxon => taxon.id),
          parentId,
        };
        return getNormalizeData(children, department.id);
      }
      result[department.id] = {
        ...rest,
        children: [],
        parentId,
      };
      return;
    });
  };
  getNormalizeData(array);
  return result;
};

export default normalize;
