import { getElement } from '../utils.js';
import display from '../displayProducts.js';
import { formatPrice } from '../utils.js';

const setupPrice = (store) => {
  const form = getElement('.price-form');
  const input = getElement('.price-filter');
  const priceValue = getElement('.price-value');

  let priceRange = [];
  store.map((item) => {
    priceRange.push(item.price);
  });
  priceRange.sort((a, b) => a - b);
  const minPrice = priceRange[0];
  const maxPrice = priceRange[priceRange.length - 1];
  input.min = minPrice;
  input.max = maxPrice;
  input.value = maxPrice;
  priceValue.textContent = formatPrice(maxPrice);

  form.addEventListener('input', function () {
    const value = Number(input.value);
    // console.log(value);
    priceValue.textContent = formatPrice(value);
    const newStore = store.filter((item) => item.price <= value);
    display(newStore, getElement('.products-container'), true);
  });
};

export default setupPrice;
