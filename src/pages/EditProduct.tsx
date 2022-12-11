import { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableContext } from '../context/TableContext';
import simpleFetchPost from '../helpers/simpleFetchPost';
import { FetchResponse, Product } from '../vite-env';
import { SessionContext } from '../context/SessionContext';
import { ProductsContext } from '../context/ProductsContext';
import TableSkeleton from '../components/TableSkeleton/TableSkeleton';
import moment from 'moment';

export default function EditProduct() {
  const initialForm = {
    id: '',
    nombreProducto: '',
    sku: '',
    precio: 0,
    cantidad: 0,
    proveedor: '',
    fechaDeIngreso: '',
    fechaUltimaModificacion: '',
    categoria: '',
    img: '',
    user: '',
    pass: '',
  };

  const navigate = useNavigate();

  const { TableProducts, setTableProducts, setNewProductAdded } = useContext(TableContext)!;
  const { userSession } = useContext(SessionContext)!;
  const { categories, setCategories, proveedores, setProveedores } = useContext(ProductsContext)!;

  const [isLoading, setIsLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<Product>(initialForm);
  const [sendingForm, setSendingForm] = useState(false);
  const [succes, setSucces] = useState(false);

  const alertDiv = useRef<HTMLDivElement | null>(null);
  const categoriaSelect = useRef<HTMLSelectElement | null>(null);
  const proveedorSelect = useRef<HTMLSelectElement | null>(null);

  const getProduct = async (id: string | number) => {
    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      `https://nelsongamerodev.com/eltallercitogestor/api/getAllProducts.php`
    );
    setTableProducts({ ...TableProducts, allProducts: res.products! });
    const product = res.products!.find((prod) => prod.id === id);
    setCurrentProduct(product!);
    setIsLoading(false);
  };
  const getCategories = async () => {
    setIsLoading(true);
    if (categories.length > 0) {
      setIsLoading(false);
      return;
    }
    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      'https://nelsongamerodev.com/eltallercitogestor/api/getCategories.php'
    );

    if (!res.ok) {
      setIsLoading(false);
      return;
    }
    setCategories(res.categories!);
    setIsLoading(false);
  };
  const getProveedores = async () => {
    setIsLoading(true);
    if (proveedores.length > 0) {
      setIsLoading(false);
      return;
    }
    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      'https://nelsongamerodev.com/eltallercitogestor/api/getProveedores.php'
    );

    if (!res.ok) {
      setIsLoading(false);
      return;
    }
    setProveedores(res.proveedores!);
    setIsLoading(false);
  };

  useEffect(() => {
    const search = window.location.search;
    const param = new URLSearchParams(search);
    const id = param.get('id');

    if (id === null) {
      navigate('/eltallercitogestor/dashboard/todos');
      return;
    }
    if (TableProducts.allProducts.length === 0) {
      getProduct(id);
      getCategories();
      getProveedores();
      return;
    }

    const product = TableProducts.allProducts.find((prod) => prod.id === id);
    setCurrentProduct(product!);
    getCategories();
    getProveedores();
  }, []);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingForm(true);
    const date = Date.now();
    const newDate = moment(date).format('DD-MM-YYYY, h:mm a');
    const categoria = categoriaSelect.current!.value;
    const proveedor = proveedorSelect.current!.value;
    currentProduct.fechaUltimaModificacion = newDate;
    currentProduct.categoria = categoria;
    currentProduct.proveedor = proveedor;
    currentProduct.user = userSession.user;
    currentProduct.pass = userSession.pass;
    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(currentProduct),
      'https://nelsongamerodev.com/eltallercitogestor/api/editProduct.php'
    );
    if (!res.ok) {
      setSendingForm(false);
      window.alert(res.msg);
      return;
    }
    setNewProductAdded(true);
    setSucces(true);
    setSendingForm(false);
    setTimeout(() => {
      setSucces(false);
    }, 1500);
    setTimeout(() => {
      navigate('/eltallercitogestor/dashboard/todos');
    }, 2000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nombreDeProducto') {
      const regExp = new RegExp(e.target.pattern);
      const test = regExp.test(e.target.value);
      test
        ? (alertDiv.current?.classList.remove('block'), alertDiv.current?.classList.add('hidden'))
        : (alertDiv.current?.classList.remove('hidden'), alertDiv.current?.classList.add('block'));
    }
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleChamgeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='w-full lg:pl-[260px]'>
        <div className='w-full'>
          <h2 className='p-4 lg:pl-10 lg:pt-6 font-semibold italic text-2xl text-purple-900 lg:text-3xl'>
            Editar Producto
          </h2>
        </div>
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
            Registro actualizado correctamente!
          </div>
        </div>
        {isLoading || currentProduct.nombreProducto === '' ? (
          <TableSkeleton />
        ) : (
          <>
            <div className='w-full max-w-5xl m-auto lg:flex justify-start items-start p-4'>
              <div className='w-48 m-auto p-4 lg:m-0 lg:w-56'>
                <img
                  className='m-auto lg:m-0 border p-2 border-violet-700 rounded-lg overflow-hidden w-40 lg:w-full'
                  src={`https://nelsongamerodev.com/eltallercitogestor/images/${currentProduct?.img}`}
                  alt={currentProduct?.nombreProducto}
                />
                <p className='pt-4 font-medium'>
                  Última modificación: <br />{' '}
                  <span className='text-violet-700'>{currentProduct.fechaUltimaModificacion}</span>
                </p>
                <p className='pt-4 font-medium'>
                  Fecha de creación: <br />{' '}
                  <span className='text-violet-700'>{currentProduct.fechaDeIngreso}</span>
                </p>
              </div>
              <form
                className='bg-violet-200 p-6 rounded-2xl shadow-xl max-w-xl m-auto lg:m-0'
                onSubmit={handleSubmit}
              >
                <div className='relative my-4'>
                  <input
                    type='text'
                    id='nombreDeProducto'
                    name='nombreProducto'
                    className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                    placeholder=' '
                    pattern='([a-zñáéíóúA-ZÁÉÍÓÚÑ]+[\s-]?)+[A-Za-zñÑáéíóúÁÉÍÓÚ]$'
                    minLength={3}
                    maxLength={100}
                    defaultValue={currentProduct?.nombreProducto}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor='nombreDeProducto'
                    className='absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-violet-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
                  >
                    Nombre del Producto
                  </label>
                </div>
                <div
                  ref={alertDiv}
                  className='hidden p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
                >
                  <span className='font-medium'>Cuidado!</span> Solo mayúsculas, minúsculas,
                  espacios y guiones. No terminar con espacios en blanco y máximo 100 caracteres.
                </div>

                <>
                  <label
                    htmlFor='underline_select_2'
                    className='font-medium'
                  >
                    Proveedor
                  </label>
                  {isLoading ? (
                    <select className='block py-2.5 w-full text-sm text-gray-500 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 peer rounded-t-lg px-2.5 pb-2.5 pt-5 focus:border-violet-600 cursor-pointer mb-6'>
                      <option defaultValue='Elija una categoría'>Cargando...</option>
                    </select>
                  ) : (
                    <select
                      id='underline_select_2'
                      name='proveedor'
                      onChange={handleChamgeSelect}
                      ref={proveedorSelect}
                      className='block py-2.5 w-full text-sm text-gray-500 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 peer rounded-t-lg px-2.5 pb-2.5 pt-5 focus:border-violet-600 cursor-pointer mb-6'
                    >
                      {/* <option defaultValue='Elija una categoría'>{currentProduct?.proveedor}</option> */}
                      {proveedores.map((proveedor) => {
                        if (proveedor.nombreProveedor === currentProduct?.proveedor) {
                          return (
                            <option
                              key={proveedor.id}
                              value={proveedor.id}
                              selected
                            >
                              {proveedor?.nombreProveedor}
                            </option>
                          );
                        }

                        return (
                          <option
                            value={proveedor.id}
                            key={proveedor.id}
                          >
                            {proveedor.nombreProveedor}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </>
                <>
                  <label
                    htmlFor='underline_select'
                    className='font-medium'
                  >
                    Categoría
                  </label>
                  {isLoading ? (
                    <select
                      id='underline_select'
                      className='block py-2.5 w-full text-sm text-gray-500 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 peer rounded-t-lg px-2.5 pb-2.5 pt-5 focus:border-violet-600 cursor-pointer'
                    >
                      <option defaultValue='Elija una categoría'>Cargando...</option>
                    </select>
                  ) : (
                    <select
                      id='underline_select'
                      name='categoria'
                      onChange={handleChamgeSelect}
                      ref={categoriaSelect}
                      className='block py-2.5 w-full text-sm text-gray-500 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 peer rounded-t-lg px-2.5 pb-2.5 pt-5 focus:border-violet-600 cursor-pointer'
                    >
                      {categories.map((category) => {
                        if (category.nombreCategoria === currentProduct?.categoria) {
                          return (
                            <option
                              key={category.id}
                              value={category.id}
                              selected
                            >
                              {category.nombreCategoria}
                            </option>
                          );
                        }

                        return (
                          <option
                            value={category.id}
                            key={category.id}
                          >
                            {category.nombreCategoria}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </>

                <div className='w-full flex justify-center items-center gap-4 my-4'>
                  <div className='relative'>
                    <input
                      type='text'
                      id='sku'
                      name='sku'
                      onChange={handleChange}
                      className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                      placeholder=' '
                      defaultValue={currentProduct.sku}
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
                      name='cantidad'
                      onChange={handleChange}
                      min={1}
                      className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                      placeholder=' '
                      defaultValue={currentProduct.cantidad}
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
                      name='precio'
                      pattern='[0-9]+(.?)[0-9]+$'
                      onChange={handleChange}
                      className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-violet-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer'
                      placeholder=' '
                      defaultValue={currentProduct.precio}
                    />
                    <label
                      htmlFor='precio'
                      className='absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-violet-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
                    >
                      Precio <span className='text-green-700'>$</span>
                    </label>
                  </div>
                </div>

                <button
                  type='submit'
                  className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center   '
                >
                  {sendingForm ? (
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
                    'Guardar cambios'
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
