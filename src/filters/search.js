import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = () => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');

  form.addEventListener('keyup', function (e) {
    e.preventDefault();
    console.log(nameInput.value);
  });
};

export default setupSearch;
