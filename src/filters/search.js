import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');

  form.addEventListener('keyup', function (e) {
    e.preventDefault();
    console.log(nameInput.value);
    if (nameInput.value) {
      const newStore = store.filter((item) => {
        let { name } = item;
        name = name.toLowerCase();
        if (name.startsWith(nameInput.value)) {
          return item;
        }
      });
      display(newStore, getElement('.products-container'), true);
      if (newStore.length < 1) {
        const container = getElement('.products-container');
        container.innerHTML = `
        <h3 class="filter-error">
        sorry, no products matched your search
        </h3>`;
      }
    } else {
      display(store, getElement('.products-container'), true);
    }
  });
};

export default setupSearch;
