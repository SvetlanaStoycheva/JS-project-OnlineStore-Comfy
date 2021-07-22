import { getElement, allProductsUrl } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
  const companiesEl = getElement('.companies');

  let allCompanies = [];
  let uniqueCompanies = [];
  store.map((item) => {
    allCompanies.push(item.company);
    uniqueCompanies = ['All', ...new Set(allCompanies)];
  });

  companiesEl.innerHTML = uniqueCompanies
    .map((item) => {
      return `
      <button class="company-btn">${item}</button>
      `;
    })
    .join('');

  companiesEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('company-btn')) {
      let newStore = [];
      //   console.log(e.target.textContent);
      if (e.target.textContent === 'All') {
        newStore = store;
      } else {
        newStore = store.filter(
          (item) => item.company === e.target.textContent
        );
      }
      display(newStore, getElement('.products-container'));
    }
  });
};

export default setupCompanies;
