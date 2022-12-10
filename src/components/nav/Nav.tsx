interface NavProps {
  isOpen: boolean;
  setIsOpen: () => any;
}
import { NavLink, useNavigate } from 'react-router-dom';
import { navItems } from './navItems';

export default function Nav({ isOpen, setIsOpen }: NavProps) {
  const navigate = useNavigate();

  const logOut = () => {
    navigate('/eltallercitogestor');
  };

  return (
    <>
      <nav
        className={`lg:hidden w-64 fixed top-20 left-0 z-[60] transition-transform duration-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-[110%]'
        }`}
        aria-label='Sidebar'
      >
        <div className='overflow-y-auto py-4 px-3 bg-purple-200 outline outline-purple-700'>
          <ul className='space-y-2'>
            {navItems.map((navItem) => (
              <li key={navItem.title}>
                <NavLink
                  to={navItem.path}
                  onClick={setIsOpen}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center p-2 text-base font-normal rounded-lg bg-purple-900 text-white'
                      : 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-purple-900 hover:text-white'
                  }
                >
                  {navItem.img}
                  <span className='ml-3'>{navItem.title}</span>
                </NavLink>
              </li>
            ))}

            <li>
              <p
                onClick={logOut}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-purple-900 hover:text-white cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  fill='currentColor'
                  className='w-6 h-6 text-red-500 transition duration-75'
                >
                  <path d='M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z' />
                </svg>

                <span className='flex-1 ml-3 whitespace-nowrap'>Salir</span>
              </p>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
