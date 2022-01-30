import { Thema } from './class-thems';
import Pagination from 'tui-pagination';

export class Paginations extends Thema {
  constructor() {
    super();
  }
  paginationStart = async () => {
    const respons = await this.fetchPopularFilms();
    this.renderFilmsCardMarkup(respons);
    this.buildPagination();
  };
  // *********getTotalPages()***вернет актуальное значение******
  buildPagination = async () => {
    const optionPagin = {
      totalItems: this.totalPages,
      itemsPerPage: 10,
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
      // localStorage.setItem('currentPage', evt.page);
      this.currentPage = await evt.page;
      console.log(this.currentPage);

      this.paginationStart();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  };
  // getCurrentPage = () => {
  //   const curPage = localStorage.getItem('currentPage');
  //   return JSON.parse(curPage);
  // };
}
