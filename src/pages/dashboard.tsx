import NavBtn from './../assets/navbtn.svg';
import CloseNavBtn from './../assets/closenavbtn.svg';
import { ProductsContextProvider } from '../context/ProductsContext';
import Nav from '../components/nav/Nav';
import NavDesktop from '../components/nav/NavDesktop';
import { useState, useContext } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import TableSkeleton from '../components/TableSkeleton/TableSkeleton';
import { Helmet } from 'react-helmet';

export default function Dashboard() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const handleResponsiveNav = () => {
    if (navIsOpen) {
      setNavIsOpen(false);
      return;
    }
    setNavIsOpen(true);
  };
  const { alreadyLogged } = useContext(SessionContext)!;

  const navigation = useNavigation();

  if (!alreadyLogged) {
    <Helmet>
      <title>El Tallercito - Dashboard</title>
    </Helmet>;
    return (
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-purple-100'>
        <h3 className='p-8 text-2xl font-semibold italic text-purple-700 lg:text-4xl'>
          Cargando...
        </h3>
        <svg
          aria-hidden='true'
          className='mr-2 w-8 h-8 text-gray-200 animate-spin fill-purple-700 lg:w-12 lg:h-12'
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
        <span className='sr-only'>Loading...</span>
      </div>
    );
  }

  return (
    <ProductsContextProvider>
      <>
        <Helmet>
          <title>El Tallercito - Dashboard</title>
        </Helmet>
        <header className='w-full h-20 bg-purple-900 flex justify-between items-center px-6 fixed z-[100]'>
          <div
            className='w-9 h-9 cursor-pointer lg:hidden'
            onClick={handleResponsiveNav}
          >
            <img
              className='w-full h-full object-cover'
              style={{
                filter:
                  'invert(100%) sepia(0%) saturate(0%) hue-rotate(313deg) brightness(106%) contrast(103%)',
              }}
              src={`${navIsOpen ? CloseNavBtn : NavBtn}`}
              alt='navbtn'
            />
          </div>
          <div>
            <h2 className='text-2xl lg:text-4xl font-bold italic text-white'>El Tallercito</h2>
          </div>
        </header>
        <main className='w-full relative min-h-screen pt-20'>
          <Nav
            isOpen={navIsOpen}
            setIsOpen={handleResponsiveNav}
          />
          <div className='lg:flex items-start w-full '>
            <NavDesktop />
            {navigation.state === 'loading' ? (
              <div className='w-full lg:pl-[260px]'>
                <TableSkeleton />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </>
    </ProductsContextProvider>
  );
}
