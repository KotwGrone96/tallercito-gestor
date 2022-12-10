import { createContext, useState } from 'react';
import { Props, Product } from '../vite-env';

interface HandleTable {
  TableProducts: AllTableProducts;
  setTableProducts: React.Dispatch<React.SetStateAction<AllTableProducts>>;
  setNewProductAdded: React.Dispatch<React.SetStateAction<boolean>>;
  newProductAdded: boolean;
}

export interface AllTableProducts {
  allProducts: Product[];
  1: Product[];
  2: Product[];
  3: Product[];
}

export const TableContext = createContext<HandleTable | null>(null);

export const TableContextProvider = ({ children }: Props) => {
  const initialTable = {
    allProducts: [],
    1: [],
    2: [],
    3: [],
  };

  const [TableProducts, setTableProducts] = useState<AllTableProducts>(initialTable);
  const [newProductAdded, setNewProductAdded] = useState(false);

  const value: HandleTable = {
    TableProducts,
    setTableProducts,
    setNewProductAdded,
    newProductAdded,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};
