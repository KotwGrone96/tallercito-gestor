import { createContext, useState } from 'react';
import { Props, Categories, Proveedor } from '../vite-env';

interface context {
  productsDropD: boolean;
  currentName: string;
  setProductsDropD: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
  categories: Categories[];
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>;
  setProveedores: React.Dispatch<React.SetStateAction<Proveedor[]>>;
  proveedores: Proveedor[];
}

export const ProductsContext = createContext<context | null>(null);

export const ProductsContextProvider = ({ children }: Props) => {
  const [productsDropD, setProductsDropD] = useState(false);
  const [currentName, setCurrentName] = useState('Todos');
  const [categories, setCategories] = useState<Categories[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const value: context = {
    productsDropD,
    currentName,
    setProductsDropD,
    setCurrentName,
    categories,
    setCategories,
    proveedores,
    setProveedores,
  };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
