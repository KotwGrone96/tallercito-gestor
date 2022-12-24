import { useLoaderData } from 'react-router-dom';
import { FetchResponse, ProductStock } from '../vite-env';
import { useState, useContext, useRef, useEffect } from 'react';
import { SessionContext } from '../context/SessionContext';
import simpleFetchPost from '../helpers/simpleFetchPost';

import CustomDistributeInput from '../components/CustomDistributeInput/CustomDistributeInput';
import { DistributeProductsContext } from '../context/DistributeProductsContext';

export default function DistributeProducts() {
  const { products, stores } = useLoaderData() as FetchResponse;
  const product = products![0];

  const form = useRef<HTMLFormElement | null>(null);
  const alertDiv = useRef<HTMLDivElement | null>(null);

  const { userSession } = useContext(SessionContext)!;
  const { setStoresData, storesData } = useContext(DistributeProductsContext)!;
  const [sendingForm, setSendingForm] = useState(false);
  const [exceededStock, setExceededStock] = useState(false);
  const [succes, setSucces] = useState(false);
  const [hasChange, setHasChange] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingForm(true);
    const formData = new FormData(form.current!);
    const LocalSC60 = formData.get('LocalSC60');
    const LocalSC84 = formData.get('LocalSC84');
    const LocalSanMartin = formData.get('LocalSanMartin');
    storesData!.user = userSession.user;
    storesData!.pass = userSession.pass;

    typeof storesData!.LocalSanMartin !== 'number'
      ? (storesData.LocalSanMartin.cantidadLocal = Number(LocalSanMartin!))
      : (storesData.LocalSanMartin = Number(LocalSanMartin!));

    typeof storesData!.LocalSC60 !== 'number'
      ? (storesData.LocalSC60.cantidadLocal = Number(LocalSC60!))
      : (storesData.LocalSC60 = Number(LocalSC60!));

    typeof storesData!.LocalSC84 !== 'number'
      ? (storesData.LocalSC84.cantidadLocal = Number(LocalSC84!))
      : (storesData.LocalSC84 = Number(LocalSC84!));

    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(storesData),
      `http://localhost:80/tallercito/distributeProducts.php?idProduct=${product.id}`
    );

    if (!res.ok) {
      setSendingForm(false);
      window.alert(res.msg);
      return;
    }
    // console.log(res);
    setSendingForm(false);
    setSucces(true);
    setTimeout(() => {
      setSucces(false);
    }, 1500);
  };

  const handleChange = () => {
    setHasChange(true);
    const formData = new FormData(form.current!);
    const LocalSC60 = Number(formData.get('LocalSC60')!);
    const LocalSC84 = Number(formData.get('LocalSC84')!);
    const LocalSanMartin = Number(formData.get('LocalSanMartin')!);
    const cantidadTotal = Number(product.cantidadTotal);
    if (LocalSC60 + LocalSC84 + LocalSanMartin > cantidadTotal) {
      setExceededStock(true);
      return;
    }
    setExceededStock(false);
  };

  const getData = async () => {
    const resStore1: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      `http://localhost:80/tallercito/getProductStock.php?idStore=1&idProduct=${product.id}`
    );
    const resStore2: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      `http://localhost:80/tallercito/getProductStock.php?idStore=2&idProduct=${product.id}`
    );
    const resStore3: FetchResponse = await simpleFetchPost(
      JSON.stringify(userSession),
      `http://localhost:80/tallercito/getProductStock.php?idStore=3&idProduct=${product.id}`
    );

    const store1: ProductStock | undefined = resStore1.productStock![0];
    const store2: ProductStock | undefined = resStore2.productStock![0];
    const store3: ProductStock | undefined = resStore3.productStock![0];

    const stores = {
      LocalSanMartin: store1 === undefined ? 0 : store1,
      LocalSC60: store2 === undefined ? 0 : store2,
      LocalSC84: store3 === undefined ? 0 : store3,
    };
    setStoresData(stores);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='w-full lg:pl-[260px]'>
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
            Productos distribuídos exitosamente!
          </div>
        </div>
        <div className='w-full'>
          <h2 className='p-4 lg:pl-10 lg:pt-6 font-semibold italic text-2xl text-purple-900 lg:text-3xl'>
            Distribuir
          </h2>

          <>
            <div className='w-full p-4 max-w-5xl m-a'>
              <div className='lg:flex lg:mb-6'>
                <img
                  src={`https://nelsongamerodev.com/eltallercitogestor/images/${product.img}`}
                  alt={product.nombreProducto}
                  className='m-auto lg:m-0 border p-2 border-violet-700 rounded-lg overflow-hidden w-40'
                />
                <div className='lg:flex flex-col items-start lg:pl-4'>
                  <h2 className='text-center py-2 font-semibold text-violet-700 underline underline-offset-2 lg:text-xl'>
                    {product.nombreProducto}
                  </h2>

                  <h3 className='text-center py-2 uppercase font-medium lg:text-xl'>
                    Cantidad Total :{' '}
                    <span className='text-violet-700 font-bold'>{product.cantidadTotal}</span>
                  </h3>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                ref={form}
              >
                <div className='w-full flex justify-center items-center flex-wrap gap-4'>
                  {stores?.map((store) => {
                    const nameNormalized = store.nombreDeLocal
                      .replaceAll(/\s?\.?#?/g, '')
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '');
                    return (
                      <CustomDistributeInput
                        key={store.id}
                        idLocal={store.id}
                        inputName={nameNormalized}
                        nombreDeLocal={store.nombreDeLocal}
                        handleChange={handleChange}
                        idProducto={product.id}
                      />
                    );
                  })}
                </div>
                {exceededStock ? (
                  <div
                    ref={alertDiv}
                    className='p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 max-w-sm m-auto'
                  >
                    <span className='font-medium'>Cuidado!</span> La suma de las cantidades por
                    local excede la cantidad total.
                  </div>
                ) : (
                  <button
                    type='submit'
                    disabled={hasChange ? undefined : true}
                    className={`text-white ${
                      hasChange ? 'bg-green-700 hover:bg-green-800 ' : 'bg-green-300/50'
                    } focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full lg:w-auto px-5 py-2.5 text-center m-auto block mt-6 max-w-[200px]`}
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
                        Distribuyendo...
                      </>
                    ) : (
                      'Distribuir productos'
                    )}
                  </button>
                )}
              </form>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
