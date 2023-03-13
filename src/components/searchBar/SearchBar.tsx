import simpleFetchPost from '../../helpers/simpleFetchPost';
import React, { useEffect, useState, useContext } from 'react';
import { FetchResponse, Product } from '../../vite-env';
import { SessionContext } from '../../context/SessionContext';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const { userSession } = useContext(SessionContext)!;
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    const getAllProducts = async () => {
      const res: FetchResponse = await simpleFetchPost(
        JSON.stringify(userSession),
        'https://nelsongamerodev.com/eltallercitogestor/api/getAllProducts.php'
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
  // const openSearchBarMenu = () => {
  //   openMenu ? setOpenMenu(false) : setOpenMenu(true);
  // };

  // const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   openSearchBarMenu();
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') {
      setOpenMenu(false);
      return;
    }
    setOpenMenu(true);

    const searchValue = e.target.value
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    setSearchInputValue(searchValue);
  };

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
        <form className='flex items-center'>
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
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 cursor-pointer'
              placeholder='Buscar producto'
              onChange={handleChange}
            />

            <ul
              className={`${
                openMenu ? 'block' : 'hidden'
              } w-full absolute left-0 top-12 z-[60] max-h-[150px] lg:max-h-[200px] text-white rounded-2xl overflow-y-scroll`}
            >
              {productsList
                .filter((product) => {
                  if (searchInputValue === '') return true;
                  const productName = product.nombreProducto
                    .toLocaleLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');

                  return (
                    productName.includes(searchInputValue) || product.sku.includes(searchInputValue)
                  );
                })
                .map((product) => (
                  <Link
                    key={product.id}
                    to={`../editarProducto?id=${product.id}`}
                    className='first:rounded-t-2xl last:rounded-b-2xl'
                  >
                    <li className='w-full border  border-b-white p-2 bg-purple-700 hover:bg-purple-500 cursor-pointer'>
                      <div className='flex items-center justify-start gap-4 relative'>
                        <img
                          className='w-8 h-8 rounded-full object-contain '
                          src={`https://nelsongamerodev.com/eltallercitogestor/images/${product.img}`}
                          alt={product.nombreProducto}
                        />
                        <h5 className='font-medium'>{product.nombreProducto}</h5>
                      </div>
                      <p className='font-medium pl-12'>
                        SKU: #<span>{product.sku}</span>
                      </p>
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
          {/* <button
            type='submit'
            className='p-2.5 ml-2 text-sm font-medium text-white bg-purple-700 rounded-lg border border-purple-900 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300   '
          >
            {openMenu ? (
              <span className='w-5 h-5 px-[5px]'>X</span>
            ) : (
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
            )}
            <span className='sr-only'>Search</span>
          </button> */}
        </form>
      </div>
    </>
  );
}
