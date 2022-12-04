import { useContext, useRef, useEffect, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { SessionContext } from '../../context/SessionContext';
import simpleFetchPost from '../../helpers/simpleFetchPost';
import { Categories, FetchResponse } from './../../vite-env';

export default function Dropdown() {
  const { productsDropD, setProductsDropD, currentName, setCurrentName } =
    useContext(ProductsContext)!;
  const productsDropDown = useRef<HTMLDivElement | null>(null);

  const showMenu = () => {
    const dropdownProducts = productsDropDown.current!;
    if (!productsDropD) {
      dropdownProducts.classList.remove('hidden');
      setProductsDropD(true);
      return;
    }
    dropdownProducts.classList.add('hidden');
    setProductsDropD(false);
  };
  const { userSession } = useContext(SessionContext)!;

  const [categories, setCategories] = useState<Categories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const res: FetchResponse = await simpleFetchPost(
        JSON.stringify(userSession),
        'http://localhost:80/tallercito/getCategories.php'
      );

      if (!res.ok) {
        setIsLoading(false);
        return;
      }
      setCategories(res.categories!);
      setIsLoading(false);
    };

    getCategories();
  }, []);

  if (isLoading) {
    return (
      <button
        id='dropdownDefault'
        className='text-white bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center relative z-50 uppercase'
        type='button'
      >
        Cargando
        <svg
          aria-hidden='true'
          className='mx-2 w-4 h-4 text-gray-200 animate-spin fill-white'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
      </button>
    );
  }

  return (
    <>
      {categories.length === 0 ? (
        <button
          id='dropdownDefault'
          className='text-white bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center relative z-50 uppercase'
          type='button'
        >
          Sin Datos
        </button>
      ) : (
        <div>
          <button
            id='dropdownDefault'
            onClick={showMenu}
            className='text-white bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center relative z-50 uppercase'
            type='button'
          >
            {currentName}{' '}
            <svg
              className='ml-2 w-4 h-4'
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id='products-dropdown'
            ref={productsDropDown}
            className='absolute hidden z-10 w-44 bg-purple-200 rounded-xl divide-y divide-gray-100 shadow border border-purple-900 top-14'
          >
            <ul
              className=' text-sm text-gray-700 '
              aria-labelledby='dropdownDefault'
            >
              <li>
                <p
                  onClick={() => {
                    showMenu();
                    setCurrentName('Todos');
                  }}
                  className='block py-2 px-4 hover:bg-purple-700 hover:text-white rounded-t-lg cursor-pointer'
                >
                  Todos
                </p>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <p
                    onClick={() => {
                      showMenu();
                      setCurrentName(category.nombreCategoria);
                    }}
                    className='block py-2 px-4 hover:bg-purple-700 hover:text-white rounded-t-lg cursor-pointer'
                  >
                    {category.nombreCategoria}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
