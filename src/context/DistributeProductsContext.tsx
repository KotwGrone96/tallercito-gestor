import { createContext, useState } from 'react';
import { Props, StoresStock, ProductStock } from '../vite-env';

interface StoreData {
  LocalSanMartin: number | ProductStock;
  LocalSC60: number | ProductStock;
  LocalSC84: number | ProductStock;
  user?: string;
  pass?: string;
}

interface DistributeProducts {
  storesData: StoreData;
  setStoresData: React.Dispatch<React.SetStateAction<StoreData>>;
}

export const DistributeProductsContext = createContext<DistributeProducts | null>(null);

export const DistributeProductsProvider = ({ children }: Props) => {
  const initialStoreData = {
    LocalSanMartin: 0,
    LocalSC60: 0,
    LocalSC84: 0,
  };

  const [storesData, setStoresData] = useState<StoreData>(initialStoreData);

  const value = { storesData, setStoresData };

  return (
    <DistributeProductsContext.Provider value={value}>
      {children}
    </DistributeProductsContext.Provider>
  );
};
