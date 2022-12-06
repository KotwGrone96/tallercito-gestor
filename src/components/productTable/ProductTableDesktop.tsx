import { Product } from './../../vite-env';

interface tableProps {
  local: string;
  products: Product[];
}

export default function ProductTableDesktop({ local, products }: tableProps) {
  return (
    <div className='overflow-x-auto relative shadow-md sm:rounded-lg hidden lg:block'>
      <div className='flex justify-between items-center pb-4 bg-purple-200 '>
        <div>
          <h2 className='pt-4 px-4 text-lg font-bold text-purple-700 uppercase underline underline-offset-2'>
            {local}
          </h2>
        </div>
      </div>
      <table className='w-full text-sm text-left text-black '>
        <thead className='text-xs text-white uppercase bg-purple-500  '>
          <tr>
            <th
              scope='col'
              className='p-4'
            >
              <div className='flex items-center'>
                <p>SKU</p>
              </div>
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Nombre
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Precio
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Categoría
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Cantidad
            </th>
            <th
              scope='col'
              className='py-3 px-6'
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className='bg-purple-200 border-b'
            >
              <td className='p-4 w-4'>
                <div className='flex items-center'>
                  <p className='font-bold'>{product.sku}</p>
                </div>
              </td>
              <th
                scope='row'
                className='flex items-center py-4 px-6 text-black whitespace-nowrap '
              >
                <img
                  className='w-10 h-10 rounded-full'
                  src={`https://nelsongamerodev.com/eltallercitogestor/images/${product.img}`}
                  alt={product.nombreProducto}
                />
                <div className='pl-3'>
                  <div className='text-base font-medium'>{product.nombreProducto}</div>
                </div>
              </th>
              <td className='py-4 px-6 text-green-700 font-semibold'>$ {product.precio}</td>
              <td className='py-4 px-6'>{product.categoria}</td>
              <td className='py-4 px-6'>
                <div className='flex items-center'>
                  <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2' /> {product.cantidad}
                </div>
              </td>
              <td className='py-4 px-6'>
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
              </td>
            </tr>
          ))}
          {/* <tr className='bg-purple-200 border-b'>
            <td className='p-4 w-4'>
              <div className='flex items-center'>
                <p className='font-bold'>#1234</p>
              </div>
            </td>
            <th
              scope='row'
              className='flex items-center py-4 px-6 text-black whitespace-nowrap '
            >
              <img
                className='w-10 h-10 rounded-full'
                src={img}
                alt='Jese image'
              />
              <div className='pl-3'>
                <div className='text-base font-medium'>Disfraz Superman</div>
              </div>
            </th>
            <td className='py-4 px-6 text-green-700 font-semibold'>$ 1234</td>
            <td className='py-4 px-6'>Disfraces</td>
            <td className='py-4 px-6'>
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2' /> 204
              </div>
            </td>
            <td className='py-4 px-6'>
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
            </td>
          </tr>

          <tr className='bg-purple-200 border-b'>
            <td className='p-4 w-4'>
              <div className='flex items-center'>
                <p className='font-bold'>#1234</p>
              </div>
            </td>
            <th
              scope='row'
              className='flex items-center py-4 px-6 text-black whitespace-nowrap '
            >
              <img
                className='w-10 h-10 rounded-full'
                src={img}
                alt='Jese image'
              />
              <div className='pl-3'>
                <div className='text-base font-medium'>Disfraz Superman</div>
              </div>
            </th>
            <td className='py-4 px-6 text-green-700 font-semibold'>$ 1234</td>
            <td className='py-4 px-6'>Disfraces</td>
            <td className='py-4 px-6'>
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2' /> 204
              </div>
            </td>
            <td className='py-4 px-6'>
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
            </td>
          </tr>
          <tr className='bg-purple-200 border-b'>
            <td className='p-4 w-4'>
              <div className='flex items-center'>
                <p className='font-bold'>#1234</p>
              </div>
            </td>
            <th
              scope='row'
              className='flex items-center py-4 px-6 text-black whitespace-nowrap '
            >
              <img
                className='w-10 h-10 rounded-full'
                src={img}
                alt='Jese image'
              />
              <div className='pl-3'>
                <div className='text-base font-medium'>Disfraz Superman</div>
              </div>
            </th>
            <td className='py-4 px-6 text-green-700 font-semibold'>$ 1234</td>
            <td className='py-4 px-6'>Disfraces</td>
            <td className='py-4 px-6'>
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2' /> 204
              </div>
            </td>
            <td className='py-4 px-6'>
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
            </td>
          </tr>
          <tr className='bg-purple-200 border-b'>
            <td className='p-4 w-4'>
              <div className='flex items-center'>
                <p className='font-bold'>#1234</p>
              </div>
            </td>
            <th
              scope='row'
              className='flex items-center py-4 px-6 text-black whitespace-nowrap '
            >
              <img
                className='w-10 h-10 rounded-full'
                src={img}
                alt='Jese image'
              />
              <div className='pl-3'>
                <div className='text-base font-medium'>Disfraz Superman</div>
              </div>
            </th>
            <td className='py-4 px-6 text-green-700 font-semibold'>$ 1234</td>
            <td className='py-4 px-6'>Disfraces</td>
            <td className='py-4 px-6'>
              <div className='flex items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2' /> 10
              </div>
            </td>
            <td className='py-4 px-6'>
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
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
