import { createBrowserRouter } from 'react-router-dom';
import Login from './../pages/login';
import Dashboard from '../pages/dashboard';
import Table from '../components/productTable/Table';
import AddProduct from '../pages/AddProduct';
import LittleStock from '../pages/LittleStock';
import { SessionContextProvider } from '../context/SessionContext';
import { TableContextProvider } from '../context/TableContext';

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
        <TableContextProvider>
          <Dashboard />
        </TableContextProvider>
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
            name='storeSanCristobal60'
          />
        ),
      },
      {
        path: 'mercadoSC84',
        element: (
          <Table
            local='Mercado S.C. #84'
            idLocal={3}
            name='storeSanCristobal84'
          />
        ),
      },
      {
        path: 'localSanMartin',
        element: (
          <Table
            local='local San Martin'
            idLocal={1}
            name='storeSanMartin'
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
