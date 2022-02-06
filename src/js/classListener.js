import debounce from 'debounce';
import { LocalSave } from './class-localsave';

export class Listener extends LocalSave {
  constructor() {
    super();
  }
  listenerStart = () => {
    this.EventListenerAll(); //стартуем объязательные слушатели
    this.lokalStart();
  };

  EventListenerAll = () => {
    // Лісенер лого
    this.refs.logo.addEventListener('click', () => {
      this.onWatchedClick(); //это заглушка перекидывающая пользователя всегда в просмотренные так как стартовая функция рендерит просмотренные
      this.setLibraryTrue(false);
      this.goHomePage();
      this.onHomeClick();
    });
    // Лісерен хоум
    this.refs.homeBt.addEventListener('click', () => {
      this.onWatchedClick(); //это заглушка перекидывающая пользователя всегда в просмотренные так как стартовая функция рендерит просмотренные
      this.setLibraryTrue(false);
      this.goHomePage();
      this.onHomeClick();
    });
    // Лісенер на інпут
    this.refs.inputFilm.addEventListener('input', debounce(this.onInputSearch, 1000));
    // Лісенер на клік по мови
    this.refs.enBox.addEventListener('click', () => {
      this.onEnClick();
      this.setLocalLanguage();
      const libraryBtClasses = this.refs.libraryBt.className.split(" ")
      if (libraryBtClasses.includes('button-nav--current')) {
        return;
      }
      this.paginationStart(this.searchQuery); // если пользователь сменил язык и у него сохранено поисковое слово значит передаем тру а иначе популярные фильмы найдет
    });

    this.refs.uaBox.addEventListener('click', () => {
      this.onUaClick();
      this.setLocalLanguage();
      const libraryBtClasses = this.refs.libraryBt.className.split(" ")
      if (libraryBtClasses.includes('button-nav--current')) {
        return;
      }
      this.paginationStart(this.searchQuery); // если пользователь сменил язык и у него сохранено поисковое слово значит передаем тру а иначе популярные фильмы найдет
    });
    // Лісенер на кліки по вибору теми
    this.refs.themaBt.addEventListener('click', () => {
      this.onThemaClick();
      this.setLocalThema();
    });
    // Лісенер на кліки по кнопці бібліотека
    this.refs.libraryBt.addEventListener('click', () => {
      this.currentPage = 1;
      this.onWatchedClick(); // чтобы возвращало на стартовую вкладку Watched
      this.setLibraryTrue(true);
      // зразу записую тру для кнопки переглянуті
      this.setHeaderWatchedBtnTrue(true);
      this.onLibraryClick();
      this.paginationLibrarySave(true); //true для просмотреных фильмов
    });
    // Лісенер по кліку на модалку кнопка переглянуті
    this.refs.modalWatchedBt.addEventListener('click', () => {
      if (this.arrWatched.includes(this.liID)) {
        this.arrWatched.splice(this.arrWatched.indexOf(this.liID), 1);
        // це треба додавати тільки якщо ми відкрили модалку
        // коли знаходимось у бібліотеці(виправить баг зі зниканням карточок)
        if (this.libraryTrue) {
          this.paginationLibrarySave(true);
        }
      } else {
        this.arrWatched.push(this.liID);
        if (this.libraryTrue) {
          this.paginationLibrarySave(true);
        }
      }
      this.setFilmWached();
      this.isFilmsSave();
    });
    // Лісенер по кліку на модалку кнопка черга
    this.refs.modalQueueBt.addEventListener('click', () => {
      if (this.arrQueue.includes(this.liID)) {
        this.arrQueue.splice(this.arrQueue.indexOf(this.liID), 1);
        // це треба додавати тільки якщо ми відкрили библиотеку
        if (this.libraryTrue) {
          this.paginationLibrarySave(false);
        }
      } else {
        this.arrQueue.push(this.liID);
        if (this.libraryTrue) {
          this.paginationLibrarySave(false);
        }
      }
      this.setFilmQueue();
      this.isFilmsSave();
    });

    this.openModalFooter();
    // слушатель для кнопок библиотеки в хедере
    this.refs.headerWathedBtn.addEventListener('click', () => {
      this.currentPage = 1;
      this.onWatchedClick();
      this.setHeaderWatchedBtnTrue(true);
      this.paginationLibrarySave(this.libraryTrueBt); //true для просмотреных фильмов
    });
    this.refs.headerQueueBtn.addEventListener('click', () => {
      this.currentPage = 1;
      this.onQueueClick();
      this.setHeaderWatchedBtnTrue(false);
      this.paginationLibrarySave(); //false для НЕ просмотреных фильмов
    });
  };
  //поиск фильма по введеному слову
  onInputSearch = evt => {
    this.currentPage = 1;
    this.setCurrentPage();
    if (!evt.target.value.trim()) {
      localStorage.removeItem('search-input-text');
      this.paginationStart(evt.target.value.trim().toLowerCase()); //от того есть ли поисковое слово будет тру либо фолс и метод поймет какой запрос нужен
      return;
    }
    this.searchQuery = evt.target.value.trim().toLowerCase();
    this.data = evt.target.value.trim().toLowerCase();
    this.setLocalInput();
    this.paginationStart(evt.target.value.trim().toLowerCase()); //от того есть ли поисковое слово будет тру либо фолс и метод поймет какой запрос нужен
  };
  //  возвращает к популярным фильмам стартовой страницы
  goHomePage = evt => {
    this.currentPage = 1;
    localStorage.removeItem('search-input-text');
    localStorage.removeItem('currentPage');
    this.refs.inputFilm.value = '';
    this.currentPage = 1;
    this.paginationStart(false);
  };
}
