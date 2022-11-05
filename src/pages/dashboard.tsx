import NavBtn from './../assets/navbtn.svg';
import SearchBar from '../components/searchBar/SearchBar';
import Dropdown from '../components/other/Dropdown';
import { ProductsContextProvider } from '../context/ProductsContext';
import ProductImg from './../assets/product.jpg';

export default function Dashboard() {
  return (
    <ProductsContextProvider>
      <>
        <header className='w-screen h-20 bg-purple-900 flex justify-between items-center px-6'>
          <div className='w-9 h-9 cursor-pointer'>
            <img
              className='w-full h-full object-cover'
              style={{
                filter:
                  'invert(100%) sepia(0%) saturate(0%) hue-rotate(313deg) brightness(106%) contrast(103%)',
              }}
              src={NavBtn}
              alt='navbtn'
            />
          </div>
          <div>
            <h2 className='text-2xl font-bold italic text-white'>El Tallercito</h2>
          </div>
        </header>
        <SearchBar />
        <div className='w-full m-auto max-w-2xl flex justify-center p-4 relative'>
          <Dropdown />
        </div>

        <div className='w-full max-w-5xl m-auto p-4'>
          {/* COMPONENTE PRINCIPAL DE PRODUCTOS */}
          <div className='p-4 w-full bg-purple-200 rounded-lg border shadow-md sm:p-8  '>
            <div className='flex justify-between items-center mb-4'>
              <h5 className='text-xl font-bold leading-none text-purple-700 underline uppercase underline-offset-2'>
                Local San Martín
              </h5>
              <p className='text-sm font-medium text-purple-700 uppercase'>Cantidad Total</p>
            </div>
            <div className='flow-root'>
              <ul
                role='list'
                className='divide-y divide-gray-200 '
              >
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <img
                        className='w-14 h-14 rounded-full'
                        src={ProductImg}
                        alt='Neil image'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-gray-900 truncate '>
                        Disfraz Superman
                      </p>
                      <p className='text-sm text-gray-900 truncate '>
                        Precio: <span className='text-green-700 font-semibold'>$1500</span>
                      </p>
                      <p className='text-sm text-gray-900 truncate '>
                        SKU: <span className='font-bold'>1234</span>
                      </p>
                      <div className='p-2 flex justify-start items-center w-full'>
                        <>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            +
                          </button>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            -
                          </button>
                        </>
                      </div>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900 '>
                      320
                    </div>
                  </div>
                </li>
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <img
                        className='w-14 h-14 rounded-full'
                        src={ProductImg}
                        alt='Neil image'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-gray-900 truncate '>
                        Disfraz Princesa
                      </p>
                      <p className='text-sm text-gray-900 truncate '>
                        Precio: <span className='text-green-700 font-semibold'>$700</span>
                      </p>
                      <p className='text-sm text-gray-900 truncate '>
                        SKU: <span className='font-bold'>4321</span>
                      </p>
                      <div className='p-2 flex justify-start items-center w-full'>
                        <>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            +
                          </button>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            -
                          </button>
                        </>
                      </div>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900 '>
                      56
                    </div>
                  </div>
                </li>{' '}
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <img
                        className='w-14 h-14 rounded-full'
                        src={ProductImg}
                        alt='Neil image'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-gray-900 truncate '>Espuma</p>
                      <p className='text-sm text-gray-900 truncate '>
                        Precio: <span className='text-green-700 font-semibold'>$500</span>
                      </p>
                      <p className='text-sm text-gray-900 truncate '>
                        SKU: <span className='font-bold'>5241</span>
                      </p>
                      <div className='p-2 flex justify-start items-center w-full'>
                        <>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            +
                          </button>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            -
                          </button>
                        </>
                      </div>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900 '>
                      421
                    </div>
                  </div>
                </li>{' '}
                <li className='py-3 sm:py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <img
                        className='w-14 h-14 rounded-full'
                        src={ProductImg}
                        alt='Neil image'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-gray-900 truncate '>
                        Globos de fiesta
                      </p>
                      <p className='text-sm text-gray-900 truncate '>
                        Precio: <span className='text-green-700 font-semibold'>$527</span>
                      </p>
                      <p className='text-sm text-gray-900 truncate '>
                        SKU: <span className='font-bold'>4168</span>
                      </p>
                      <div className='p-2 flex justify-start items-center w-full'>
                        <>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            +
                          </button>
                          <button
                            type='button'
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                          >
                            -
                          </button>
                        </>
                      </div>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900 '>
                      50
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </ProductsContextProvider>
  );
}
