import { useRef, useState } from 'react';

export default function AddProduct() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSucces(true);
      setTimeout(() => {
        setSucces(false);
      }, 2000);
    }, 1000);
    formRef.current?.reset();
  };

  return (
    <>
      <div className='w-full'>
        {/* VENTANA MODAL */}
        <div
          id='modal'
          className={`${
            succes ? 'fixed' : ''
          } top-0 left-0 right-0 bottom-0 bg-transparent text-white z-50`}
        >
          <div
            className={`w-max h-max bg-green-500 p-4 absolute  left-0 right-0 bottom-0 m-auto rounded-lg shadow-lg font-medium transition-all duration-700 ${
              succes ? 'top-0 opacity-1' : '-top-32 opacity-0'
            }`}
          >
            Producto agregado exitosamente!
          </div>
        </div>
        {/* VENTANA MODAL */}
        <div className='w-full'>
          <h2 className='p-4 lg:pl-10 lg:pt-6 font-semibold italic text-2xl text-purple-900 lg:text-3xl'>
            Agregar Producto
          </h2>
        </div>
        <div className='w-full max-w-3xl m-auto p-4'>
          <form
            className='bg-violet-200 p-6 rounded-2xl shadow-xl'
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className='relative my-4'>
              <input
                type='text'
                id='nombreDeProducto'
                className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='nombreDeProducto'
                className='absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-violet-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
              >
                Nombre del Producto
              </label>
            </div>

            <div className='relative my-4'>
              <input
                type='text'
                id='proveedor'
                className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='proveedor'
                className='absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-violet-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
              >
                Proveedor
              </label>
            </div>
            <>
              <label
                htmlFor='underline_select'
                className='sr-only'
              >
                Underline select
              </label>
              <select
                id='underline_select'
                className='block py-2.5 w-full text-sm text-gray-500 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 peer rounded-t-lg px-2.5 pb-2.5 pt-5 focus:border-violet-600 cursor-pointer'
              >
                <option defaultValue='Elija una categoría'>Elija una categoría</option>
                <option value='US'>Disfraces</option>
                <option value='CA'>Cotillón</option>
                <option value='FR'>Pelotas</option>
                <option value='DE'>Tortas</option>
              </select>
            </>

            <div className='w-full flex justify-center items-center gap-4 my-4'>
              <div className='relative'>
                <input
                  type='text'
                  id='sku'
                  className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='sku'
                  className='absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-violet-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
                >
                  SKU
                </label>
              </div>
              <div className='relative'>
                <input
                  type='number'
                  id='cantidad'
                  min={1}
                  className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='cantidad'
                  className='absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-violet-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
                >
                  Cantidad Total
                </label>
              </div>
              <div className='relative'>
                <input
                  type='text'
                  id='precio'
                  className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='precio'
                  className='absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-violet-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
                >
                  Precio <span className='text-green-700'>$</span>
                </label>
              </div>
            </div>
            <>
              <div className='w-full flex justify-center py-4'>
                <label
                  className='block mb-2 text-sm font-medium text-white cursor-pointer bg-violet-500 p-2 rounded-xl hover:bg-violet-700'
                  htmlFor='default_size'
                >
                  Cargar imágen
                </label>
              </div>
              <input
                className='hidden mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-violet-300 cursor-pointer  focus:outline-none'
                id='default_size'
                type='file'
              />
            </>
            <div className='w-full pt-0 p-4 font-semibold text-violet-900 '>
              <h3 className='text-center text-xl  underline underline-offset-2'>
                Cantidades por Local
              </h3>
              <ul className='w-full gap-4 p-6 flex justify-center items-center flex-col list-disc'>
                <li className='grid grid-cols-3'>
                  <p className='col-span-2'>Mercado S.C. #60</p>
                  <input
                    type='number'
                    className='bg-gray-50 rounded-t-md max-w-[75px] focus:outline-violet-500 px-1'
                    min={0}
                    defaultValue={0}
                  />
                </li>
                <li className='grid grid-cols-3'>
                  <p className='col-span-2'>Mercado S.C. #23</p>
                  <input
                    type='number'
                    className='bg-gray-50 rounded-t-md max-w-[75px] focus:outline-violet-500 px-1'
                    min={0}
                    defaultValue={0}
                  />
                </li>
                <li className='grid grid-cols-3'>
                  <p className='col-span-2'>San Martín</p>
                  <input
                    type='number'
                    className='bg-gray-50 rounded-t-md max-w-[75px] focus:outline-violet-500 px-1'
                    min={0}
                    defaultValue={0}
                  />
                </li>
              </ul>
            </div>

            <button
              type='submit'
              className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center   '
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
                  Agregando...
                </>
              ) : (
                'Enviar'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
