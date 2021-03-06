import { getStorageItem, setStorageItem } from './utils.js';

let store = getStorageItem('store');
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { company, colors, price, name, featured },
    } = product;
    const { url } = product.fields.image[0];

    return { id, featured, name, price, colors, company, image: url };
  });
  setStorageItem('store', store);
};

const findProduct = (id) => {
  let product = store.find((item) => item.id === id);
  return product;
};
export { store, setupStore, findProduct };
