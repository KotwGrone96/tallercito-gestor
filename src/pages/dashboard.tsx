import NavBtn from './../assets/navbtn.svg';
import CloseNavBtn from './../assets/closenavbtn.svg';
import SearchBar from '../components/searchBar/SearchBar';
import Dropdown from '../components/other/Dropdown';
import { ProductsContextProvider } from '../context/ProductsContext';
import Nav from '../components/nav/Nav';
import NavDesktop from '../components/nav/NavDesktop';
import { useState } from 'react';
import Table from '../components/productTable/Table';

export default function Dashboard() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const handleResponsiveNav = () => {
    if (navIsOpen) {
      setNavIsOpen(false);
      return;
    }
    setNavIsOpen(true);
  };

  return (
    <ProductsContextProvider>
      <>
        <header className='w-full h-20 bg-purple-900 flex justify-between items-center px-6'>
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
            <h2 className='text-2xl font-bold italic text-white'>El Tallercito</h2>
          </div>
        </header>
        <main className='w-full relative min-h-screen'>
          <Nav
            isOpen={navIsOpen}
            setIsOpen={handleResponsiveNav}
          />
          <div className='lg:flex items-start w-full '>
            <NavDesktop />
            <div className='w-full'>
              <SearchBar />
              <div className='w-full m-auto max-w-2xl flex justify-center p-4 relative'>
                <Dropdown />
              </div>

              <div className='w-full max-w-5xl lg:max-w-none m-auto lg:m-0 p-4'>
                <Table />
              </div>
            </div>
          </div>
        </main>
      </>
    </ProductsContextProvider>
  );
}
