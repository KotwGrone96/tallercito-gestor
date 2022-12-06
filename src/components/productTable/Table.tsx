import Dropdown from '../DropDown/Dropdown';
import SearchBar from '../searchBar/SearchBar';
import ProductTable from './ProductTable';
import ProductTableDesktop from './ProductTableDesktop';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from './../../context/SessionContext';
import simpleFetchPost from './../../helpers/simpleFetchPost';
import { FetchResponse, Product } from './../../vite-env';
import TableSkeleton from './../TableSkeleton/TableSkeleton';

interface tableProps {
  local: string;
  idLocal: number;
}

export default function Table({ local, idLocal }: tableProps) {
  const { userSession } = useContext(SessionContext)!;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);

      if (idLocal === 0) {
        const res: FetchResponse = await simpleFetchPost(
          JSON.stringify(userSession),
          `http://localhost:80/tallercito/getAllProducts.php`
        );

        setProducts(res.products!);
        setIsLoading(false);
        return;
      }
      const res: FetchResponse = await simpleFetchPost(
        JSON.stringify(userSession),
        `http://localhost:80/tallercito/getProductsByStore.php?id=${idLocal}`
      );
      setProducts(res.products!);
      setIsLoading(false);
    };

    userSession.user === '' ? '' : getProducts();
  }, [userSession.user, idLocal]);

  return (
    <>
      <div className='w-full'>
        <SearchBar />
        <div className='w-full m-auto max-w-2xl flex justify-center p-4 relative'>
          <Dropdown />
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className='w-full max-w-5xl lg:max-w-none m-auto lg:m-0 p-4'>
            <ProductTable
              local={local}
              products={products}
            />
            <ProductTableDesktop
              local={local}
              products={products}
            />
          </div>
        )}
      </div>
    </>
  );
}
