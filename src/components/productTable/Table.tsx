import NavDesktop from '../nav/NavDesktop';
import Dropdown from '../other/Dropdown';
import SearchBar from '../searchBar/SearchBar';
import ProductTable from './ProductTable';
import ProductTableDesktop from './ProductTableDesktop';

interface tableProps {
  local: string;
}

export default function Table({ local }: tableProps) {
  return (
    <>
      <div className='w-full'>
        <SearchBar />
        <div className='w-full m-auto max-w-2xl flex justify-center p-4 relative'>
          <Dropdown />
        </div>

        <div className='w-full max-w-5xl lg:max-w-none m-auto lg:m-0 p-4'>
          {/* <Table /> */}
          <ProductTable local={local} />
          <ProductTableDesktop local={local} />
        </div>
      </div>
    </>
  );
}
