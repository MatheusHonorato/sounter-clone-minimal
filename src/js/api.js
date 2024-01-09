const BASE_URL = 'http://127.0.0.1:5500/';

// eslint-disable-next-line no-unused-vars
const api = async (url) => {
  const apiConnect = await fetch(BASE_URL + url);
  const apiJson = apiConnect.json();

  return apiJson;
};
