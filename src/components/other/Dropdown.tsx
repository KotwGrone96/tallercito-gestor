import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

export default function Dropdown() {
  const context = useContext(ProductsContext);
  const { productsDropD, setProductsDropD, currentName, setCurrentName } = context!;

  const showMenu = () => {
    const dropdownProducts = document.getElementById('products-dropdown') as HTMLDivElement;
    if (!productsDropD) {
      dropdownProducts.classList.remove('hidden');
      setProductsDropD(true);
      return;
    }
    dropdownProducts.classList.add('hidden');
    setProductsDropD(false);
  };

  return (
    <>
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
          <li>
            <p
              onClick={() => {
                showMenu();
                setCurrentName('Máscaras');
              }}
              className='block py-2 px-4 hover:bg-purple-700 hover:text-white rounded-t-lg cursor-pointer'
            >
              Máscaras
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                showMenu();
                setCurrentName('Disfraces');
              }}
              className='block py-2 px-4 hover:bg-purple-700 hover:text-white cursor-pointer'
            >
              Disfraces
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                showMenu();
                setCurrentName('Piñatas');
              }}
              className='block py-2 px-4 hover:bg-purple-700 hover:text-white cursor-pointer'
            >
              Piñatas
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                showMenu();
                setCurrentName('Golosinas');
              }}
              className='block py-2 px-4 hover:bg-purple-700 hover:text-white rounded-b-xl cursor-pointer'
            >
              Golosinas
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
