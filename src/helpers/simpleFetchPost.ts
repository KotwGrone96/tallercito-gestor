export default async function simpleFetchPost(body: string, url: RequestInfo) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const data = await res.json();
  return data;
}

export const addProductFetch = async (body: FormData, url: RequestInfo) => {
  const res = await fetch(url, {
    method: 'POST',

    body,
  });
  const data = await res.json();
  return data;
};
