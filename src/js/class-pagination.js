import { Thema } from './class-thems';
import Pagination from 'tui-pagination';

export class Paginations extends Thema {
  constructor() {
    super();
    this.itemsPerPage = 20;
  }

  paginationStart = async () => {
    const respons = await this.fetchPopularFilms();
    this.renderFilmsCardMarkup(respons);
    this.itemsPerPage = 20;
    this.buildPagination();
  };

  paginationSearch = async () => {
    const respons = await this.fetchSearchFilms();
    console.log(this.refs.containerPagination);
    if (this.totalPages < 20) {
      this.refs.containerPagination.classList.add('visually-hidden');
    }
    if (this.totalPages > 20) {
      this.refs.containerPagination.classList.remove('visually-hidden');
    }

    this.renderFilmsCardMarkup(respons);
    this.itemsPerPage = 20;
    this.buildPagination();
  };

  // *********getTotalPages()***вернет актуальное значение******
  buildPagination = async () => {
    const optionPagin = {
      totalItems: this.totalPages,
      itemsPerPage: this.itemsPerPage,
      visiblePages: 5,
      page: this.currentPage,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };

    this.pagination = new Pagination(this.refs.containerPagination, optionPagin);

    this.pagination.on('afterMove', async evt => {
      this.currentPage = evt.page;
      // console.log(this.currentPage);
      this.setCurrentPage();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      this.paginationStart();
    });
  };
  // Зберігаєм в локалку вибрану сторінку
  setCurrentPage = () => {
    localStorage.setItem('currentPage', JSON.stringify(this.currentPage));
  };
  paginationWatched = () => {
    // console.log(this.arrQueue.length);
    this.totalPages = this.arrQueue.length;
    this.itemsPerPage = 9;
    this.buildPagination();
    this.renderFilmsCardWatched();
  };
  paginationQueue = arrQueue => {
    // console.log(this.arrQueue.length);
    this.totalPages = this.arrQueue.length;
    this.itemsPerPage = 9;
    this.buildPagination();
    this.renderFilmsCardQueue();
  };
}
