import simpleFetchPost from '../../helpers/simpleFetchPost';
import { useEffect, useState, useContext } from 'react';
import { FetchResponse, Product } from '../../vite-env';
import { SessionContext } from '../../context/SessionContext';

export default function SearchBar() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userSession } = useContext(SessionContext)!;

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const res: FetchResponse = await simpleFetchPost(
        JSON.stringify(userSession),
        'http://localhost:80/tallercito/getAllProducts.php'
      );
      if (!res.ok) {
        setIsLoading(false);
        return;
      }
      setProductsList(res.products!);
      setIsLoading(false);
    };

    getAllProducts();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className='w-full m-auto max-w-2xl p-4'>
          <form className='flex items-center'>
            <label
              htmlFor='simple-search'
              className='sr-only'
            >
              Search
            </label>
            <div className='relative w-full'>
              <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 '
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                type='text'
                id='simple-search'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5'
                placeholder='Cargando...'
                required
              />
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='w-full m-auto max-w-2xl p-4'>
        <form
          className='flex items-center'
          onSubmit={handleSubmit}
        >
          <label
            htmlFor='products'
            className='sr-only'
          >
            Search
          </label>
          <div className='relative w-full'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500 '
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              type='text'
              id='products'
              list='products-list'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5'
              placeholder='Buscar producto'
              required
            />
            <datalist id='products-list'>
              {productsList.map((product) => (
                <option
                  value={product.nombreProducto}
                  key={product.id}
                >
                  {product.sku}
                </option>
              ))}
            </datalist>
          </div>
          <button
            type='submit'
            className='p-2.5 ml-2 text-sm font-medium text-white bg-purple-700 rounded-lg border border-purple-900 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300   '
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <span className='sr-only'>Search</span>
          </button>
        </form>
      </div>
    </>
  );
}
