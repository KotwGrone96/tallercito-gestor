import { createBrowserRouter } from 'react-router-dom';
import Login from './../pages/login';
import Dashboard from '../pages/dashboard';
import Table from '../components/productTable/Table';
import AddProduct from '../pages/AddProduct';
import LittleStock from '../pages/LittleStock';
import { SessionContextProvider } from '../context/SessionContext';

const router = createBrowserRouter([
  {
    path: 'eltallercitogestor/',
    element: (
      <SessionContextProvider>
        <Login />
      </SessionContextProvider>
    ),
  },
  {
    path: 'eltallercitogestor/dashboard',
    element: (
      <SessionContextProvider>
        <Dashboard />
      </SessionContextProvider>
    ),

    children: [
      {
        path: 'todos',
        element: (
          <Table
            local='General'
            idLocal={0}
          />
        ),
      },
      {
        path: 'mercadoSC60',
        element: (
          <Table
            local='Mercado S.C. #60'
            idLocal={2}
          />
        ),
      },
      {
        path: 'mercadoSC84',
        element: (
          <Table
            local='Mercado S.C. #84'
            idLocal={3}
          />
        ),
      },
      {
        path: 'localSanMartin',
        element: (
          <Table
            local='local San Martin'
            idLocal={1}
          />
        ),
      },
      {
        path: 'agregar',
        element: <AddProduct />,
      },
      {
        path: 'pocostock',
        element: <LittleStock />,
      },
    ],
  },
]);

export default router;
