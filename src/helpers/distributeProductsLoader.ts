import { FetchResponse } from '../vite-env';

export const loader = async ({ params }) => {
  const query1 = await fetch('https://nelsongamerodev.com/eltallercitogestor/api/getStores.php');
  const { stores }: FetchResponse = await query1.json();
  const query2 = await fetch(
    `https://nelsongamerodev.com/eltallercitogestor/api/getSingleProduct.php?id=${params.id}`
  );
  const { products }: FetchResponse = await query2.json();
  return { stores, products };
};
