import { createContext, useState } from 'react';
import { Props, Product } from '../vite-env';

interface HandleTable {
  TableProducts: AllTableProducts;
  setTableProducts: React.Dispatch<React.SetStateAction<AllTableProducts>>;
  setNewProductAdded: React.Dispatch<React.SetStateAction<boolean>>;
  newProductAdded: boolean;

  modifyStockValue: (
    newGneralValue: number,
    newVal: number,
    product: Product,
    productIndex: number
  ) => void;
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

  const modifyStockValue = (
    newGneralValue: number,
    newVal: number,
    product: Product,
    productIndex: number
  ) => {
    if (TableProducts[1].length > 0) {
      const arr = TableProducts[1];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == product.id) {
          TableProducts[1][i].cantidadTotal = newGneralValue;
          break;
        }
      }
    }
    if (TableProducts[2].length > 0) {
      const arr = TableProducts[2];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == product.id) {
          TableProducts[2][i].cantidadTotal = newGneralValue;
          break;
        }
      }
    }
    if (TableProducts[3].length > 0) {
      const arr = TableProducts[3];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == product.id) {
          TableProducts[3][i].cantidadTotal = newGneralValue;
          break;
        }
      }
    }
    const singleProd: Product = TableProducts[product.idLocal!][productIndex];
    singleProd.cantidadTotal = newGneralValue;
    singleProd.cantidad = newVal;

    if (TableProducts.allProducts.length == 0) return;
    const arr = TableProducts.allProducts;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == product.id) {
        TableProducts.allProducts[i].cantidad = newGneralValue;
        break;
      }
    }
  };

  const value: HandleTable = {
    TableProducts,
    setTableProducts,
    setNewProductAdded,
    newProductAdded,

    modifyStockValue,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};
