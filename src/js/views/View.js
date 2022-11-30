import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const loadingSpinner = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('beforeend', loadingSpinner);
  }
  renderMessage(message = this._message) {
    const successMarkup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', successMarkup);
  }
  renderError(message = this._errorMessage) {
    const errorMarkup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', errorMarkup);
  }
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const recipeMarkup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', recipeMarkup);
  }
}
