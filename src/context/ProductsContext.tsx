import { createContext, useState } from 'react';
import { Props } from '../vite-env';

interface context {
  productsDropD: boolean;
  currentName: string;
  setProductsDropD: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductsContext = createContext<context | null>(null);

export const ProductsContextProvider = ({ children }: Props) => {
  const [productsDropD, setProductsDropD] = useState(false);
  const [currentName, setCurrentName] = useState('Todos');

  const value: context = { productsDropD, currentName, setProductsDropD, setCurrentName };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
