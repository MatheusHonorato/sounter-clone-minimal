const BASE_URL = 'https://matheushonorato.github.io/sounter-clone-minimal/';

// eslint-disable-next-line no-unused-vars
const api = async (url) => {
  const apiConnect = await fetch(BASE_URL + url);
  const apiJson = apiConnect.json();

  return apiJson;
};
