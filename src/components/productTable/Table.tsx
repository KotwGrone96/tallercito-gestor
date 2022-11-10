import ProductTable from './ProductTable';
import ProductTableDesktop from './ProductTableDesktop';

export default function Table() {
  return (
    <>
      <ProductTable local={'General'} />
      <ProductTableDesktop local={'General'} />
    </>
  );
}
