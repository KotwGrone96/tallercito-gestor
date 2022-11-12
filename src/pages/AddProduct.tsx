export default function AddProduct() {
  return (
    <>
      <div className='w-full'>
        <div className='w-full'>
          <h2 className='p-4 lg:pl-10 lg:pt-6 font-semibold italic text-2xl text-purple-900 lg:text-3xl'>
            Agregar Producto
          </h2>
        </div>
        <div className='w-full max-w-3xl m-auto p-4'>
          <form className='bg-violet-200 p-6 rounded-2xl'>
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
                  Cantidad
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

            <button
              type='submit'
              className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center   '
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
