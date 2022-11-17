import { createBrowserRouter } from 'react-router-dom';
import Login from './../pages/login';
import Dashboard from '../pages/dashboard';
import Table from '../components/productTable/Table';
import AddProduct from '../pages/AddProduct';
import LittleStock from '../pages/LittleStock';

const router = createBrowserRouter([
  {
    path: 'eltallercitogestor',
    element: <Login />,
  },
  {
    path: 'eltallercitogestor/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'todos',
        element: <Table local='General' />,
      },
      {
        path: 'mercadoSC60',
        element: <Table local='Mercado S.C. #60' />,
      },
      {
        path: 'mercadoSC23',
        element: <Table local='Mercado S.C. #23' />,
      },
      {
        path: 'localSanMartin',
        element: <Table local='local San Martin' />,
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
