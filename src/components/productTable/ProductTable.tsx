import { Product } from './../../vite-env';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { createPortal } from 'react-dom';
import ProductModal from '../ProductModal/ProductModal';

interface tableProps {
  local: string;
  products: Product[];
  idLocal: Number;
}

export default function ProductTable({ local, products, idLocal }: tableProps) {
  const { currentName } = useContext(ProductsContext)!;

  const [productIndex, setProductIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const openM = (id: number) => {
    setOpenModal(true);
    setProductIndex(id);
  };

  return (
    <div>
      {createPortal(
        <ProductModal
          isOpen={openModal}
          product={products[productIndex]}
          setIsOpen={setOpenModal}
          productIndex={productIndex}
        />,
        document.getElementById('productModal')!
      )}
      <div className='p-4 w-full bg-purple-200 rounded-lg border shadow-md sm:p-8 lg:hidden'>
        <div className='flex justify-between items-center mb-4'>
          <h5 className='text-xl font-bold leading-none text-purple-700 underline uppercase underline-offset-2'>
            {local}
          </h5>
          <p className='text-sm font-medium text-purple-700 uppercase'>Cantidad Total</p>
        </div>
        <div className='flow-root'>
          {products.length == 0 ? (
            <h3 className='pt-4 font-medium text-gray-700'>No hay productos para mostrar</h3>
          ) : (
            <ul
              role='list'
              className='divide-y divide-gray-200 '
            >
              {products
                .filter((product) => {
                  if (currentName == 'Todos') return true;
                  return currentName == product.categoria;
                })
                .map((product, index) => (
                  <li
                    key={product.id}
                    className='py-3 sm:py-4'
                  >
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <img
                          className='w-14 h-14 rounded-full object-contain'
                          src={`https://nelsongamerodev.com/eltallercitogestor/images/${product.img}`}
                          alt={product.nombreProducto}
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-semibold text-gray-900 truncate '>
                          {product.nombreProducto}
                        </p>
                        <p className='text-sm text-gray-900 truncate '>
                          Precio:{' '}
                          <span className='text-green-700 font-semibold'>${product.precio}</span>
                        </p>
                        <p className='text-sm text-gray-900 truncate '>
                          SKU: <span className='font-bold'>{product.sku}</span>
                        </p>
                        <div className='p-2 flex justify-start items-center w-full'>
                          {idLocal === 0 ? (
                            <>
                              <Link to={`../distribuir/${product.id}`}>
                                <button
                                  type='button'
                                  className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:blue-green-300 rounded-lg text-lg px-3 py-1 mr-2'
                                >
                                  Distribuir
                                </button>
                              </Link>
                              <Link to={`../editarProducto?id=${product.id}`}>
                                <button
                                  type='button'
                                  className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-base px-3 py-1 mr-2'
                                >
                                  Editar
                                </button>
                              </Link>
                            </>
                          ) : (
                            <>
                              {/* <button
                              type='button'
                              onClick={() => openM(Number(index))}
                              className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                            >
                              +
                            </button> */}
                              <button
                                onClick={() => openM(Number(index))}
                                type='button'
                                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-3 py-1 mr-2'
                              >
                                Restar
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 '>
                        {product.cantidad}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
