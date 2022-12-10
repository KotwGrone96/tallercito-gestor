import Dropdown from '../DropDown/Dropdown';
import SearchBar from '../searchBar/SearchBar';
import ProductTable from './ProductTable';
import ProductTableDesktop from './ProductTableDesktop';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from './../../context/SessionContext';
import simpleFetchPost from './../../helpers/simpleFetchPost';
import { FetchResponse } from './../../vite-env';
import TableSkeleton from './../TableSkeleton/TableSkeleton';
import { TableContext } from './../../context/TableContext';

interface tableProps {
  local: string;
  idLocal: number;
  name?: string;
}

export default function Table({ local, idLocal }: tableProps) {
  const { userSession } = useContext(SessionContext)!;
  const { TableProducts, setTableProducts, newProductAdded, setNewProductAdded } =
    useContext(TableContext)!;
  const [isLoading, setIsLoading] = useState(true);

  const getAllProducts = async () => {
    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      `https://nelsongamerodev.com/eltallercitogestor/api/getAllProducts.php`
    );

    setTableProducts({ ...TableProducts, allProducts: res.products! });

    setIsLoading(false);
  };

  const getProductsByStore = async () => {
    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      `https://nelsongamerodev.com/eltallercitogestor/api/getProductsByStore.php?id=${idLocal}`
    );
    setTableProducts({ ...TableProducts, [idLocal]: res.products! });
    setIsLoading(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      if (idLocal === 0) {
        if (newProductAdded) {
          await getAllProducts();
          setNewProductAdded(false);
          return;
        }
        if (TableProducts.allProducts.length > 0) {
          setIsLoading(false);
          return;
        }
        await getAllProducts();
        return;
      }

      if (TableProducts[idLocal].length > 0) {
        setIsLoading(false);
        return;
      }
      await getProductsByStore();
    };

    userSession.user === '' ? '' : getProducts();
  }, [userSession.user, idLocal]);

  return (
    <>
      <div className='w-full lg:pl-[260px]'>
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
              products={idLocal === 0 ? TableProducts.allProducts : TableProducts[idLocal]}
              idLocal={idLocal}
            />
            <ProductTableDesktop
              local={local}
              products={idLocal === 0 ? TableProducts.allProducts : TableProducts[idLocal]}
              idLocal={idLocal}
            />
          </div>
        )}
      </div>
    </>
  );
}
