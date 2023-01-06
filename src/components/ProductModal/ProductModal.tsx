import { Product, FetchResponse } from '../../vite-env';
import { useRef, useState, useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import simpleFetchPost from '../../helpers/simpleFetchPost';
import { TableContext } from '../../context/TableContext';

interface Props {
  isOpen: boolean;
  product: Product;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productIndex: number;
}

export default function ProductModal({ isOpen, product, setIsOpen, productIndex }: Props) {
  const inputVal = useRef<null | HTMLInputElement>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const { userSession } = useContext(SessionContext)!;
  const { modifyStockValue } = useContext(TableContext)!;

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      lastValue: product.cantidad,
      idRow: product.idRowStore,
      newValue: inputVal.current?.value,
      toSubtract: product.cantidad - Number(inputVal.current?.value),
      idProducto: product.id,
      user: userSession.user,
      pass: userSession.pass,
    };

    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(data),
      'https://nelsongamerodev.com/eltallercitogestor/api/editStockByStore.php'
    );

    if (!res.ok) {
      setLoading(false);
      window.alert(res.msg);
      return;
    }
    setSucces(true);
    setLoading(false);

    const toSubtract = product.cantidad - Number(inputVal.current?.value);
    const newGneralValue = product.cantidadTotal! - toSubtract;

    modifyStockValue(newGneralValue, Number(inputVal.current?.value), product, productIndex);

    setTimeout(() => {
      setSucces(false);
      setIsOpen(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) == product.cantidad) {
      setHasChanges(false);
      return;
    }
    setHasChanges(true);
  };

  return (
    <>
      {isOpen ? (
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full min-h-screen fixed top-0 left-0 z-[200] bg-black/40 flex justify-center items-center`}
        >
          {/* Main modal */}

          <div className='relative w-full h-full max-w-xl md:h-auto '>
            <div
              id='modal'
              className={`${
                succes ? 'fixed block' : 'hidden'
              } top-0 left-0 right-0 bottom-0 bg-transparent text-white z-50`}
            >
              <div
                className={`w-max h-max bg-green-500 p-4 absolute  left-0 right-0 bottom-0 m-auto rounded-lg shadow-lg font-medium transition-all duration-700 ${
                  succes ? 'top-0 opacity-1' : '-top-32 opacity-0'
                }`}
              >
                Producto actualizado exitosamente!
              </div>
            </div>
            {/* Modal content */}
            <div className='relative bg-purple-200 rounded-lg shadow'>
              {/* Modal header */}
              <div className='flex items-start justify-between p-4 border-b rounded-t bg-violet-500'>
                <h3 className='text-xl font-semibold text-white '>{product.local}</h3>
                <button
                  type='button'
                  className='text-white-400 bg-transparent hover:bg-purple-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  '
                  onClick={() => {
                    setIsOpen(false);
                    setHasChanges(false);
                  }}
                >
                  <svg
                    className='w-5 h-5 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
              {/* Modal body */}
              <div className='py-4 text-gray-700 flex items-center justify-center'>
                <div>
                  <h3 className='font-medium text-lg'>{product.nombreProducto}</h3>
                  <span className='py-2 block'>SKU: #{product.sku}</span>
                  <img
                    src={`https://nelsongamerodev.com/eltallercitogestor/images/${product.img}`}
                    alt={product.nombreProducto}
                    className='w-20 h-20 lg:w-32 lg:h-32 object-contain'
                  />
                </div>
                <div className='flex flex-col lg:pl-4 gap-2'>
                  <label
                    htmlFor='cantidadLocalInput'
                    className=' font-medium underline underline-offset-2'
                  >
                    Cantidad en el local
                  </label>

                  <input
                    type='number'
                    id='cantidadLocalInput'
                    defaultValue={product.cantidad}
                    className='w-20 lg:w-28 px-4 rounded-xl focus:outline-1 focus:outline-purple-700'
                    min={0}
                    max={product.cantidad}
                    autoFocus
                    ref={inputVal}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h3 className='text-2xl pl-6'>Cantidad Total : {product.cantidadTotal}</h3>
              {/* Modal footer */}
              <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b '>
                <button
                  data-modal-hide='staticModal'
                  type='button'
                  onClick={handleSubmit}
                  className={`text-white ${
                    hasChanges ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-700/30'
                  } focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                  disabled={hasChanges ? false : true}
                >
                  {loading ? (
                    <>
                      <svg
                        role='status'
                        className='inline mr-3 w-4 h-4 text-white animate-spin'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='#E5E7EB'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentColor'
                        />
                      </svg>
                      Actualizando...
                    </>
                  ) : (
                    'Actualizar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
