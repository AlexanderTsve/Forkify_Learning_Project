import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { FIRST_PAGE_NUM } from '../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clickedBtn = e.target.closest('.btn--inline');
      if (!clickedBtn) {
        return;
      }
      const goToPage = Number(clickedBtn.dataset.goto);
      handler(goToPage);
    });
  }
  _generateArrowBtnMarkup(pageNum, arrowOrientation, orderPlace) {
    return `
      <button data-goto="${pageNum}" class="btn--inline pagination__btn--${orderPlace}">
        <svg class="search__icon">
          <use href="${icons}#icon-${arrowOrientation}">
          </use>
        </svg>
        <span>Page ${pageNum}</span>
      </button>
      `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (currentPage === FIRST_PAGE_NUM && numPages > FIRST_PAGE_NUM) {
      let pageNumber = currentPage + FIRST_PAGE_NUM;
      return this._generateArrowBtnMarkup(pageNumber, 'arrow-right', 'next');
    }
    if (currentPage > 1 && numPages === currentPage) {
      let pageNumber = currentPage - FIRST_PAGE_NUM;
      return this._generateArrowBtnMarkup(pageNumber, 'arrow-left', 'prev');
    }
    if (currentPage > 1 && numPages > currentPage) {
      let pageNumber = currentPage - FIRST_PAGE_NUM;
      let secondPageNum = currentPage + FIRST_PAGE_NUM;
      return [
        this._generateArrowBtnMarkup(pageNumber, 'arrow-left', 'prev'),
        this._generateArrowBtnMarkup(secondPageNum, 'arrow-right', 'next'),
      ].join('');
    }
    return '';
  }
}

export default new PaginationView();
