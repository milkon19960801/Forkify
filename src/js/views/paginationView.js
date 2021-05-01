import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const gotoPage = Number(btn.dataset.goto);
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const btnNext = `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page${currentPage + 1} </span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button> 
    `;
    const btnPrev = `    
    <button  data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <span>Page ${currentPage - 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
    </button>
    `;

    if (currentPage === 1 && numPages > 1) return btnNext;

    if (currentPage === numPages && numPages > 1) return btnPrev;

    if (currentPage < numPages) {
      return btnPrev + btnNext;
    }
    return ``;
  }
}

export default new PaginationView();
