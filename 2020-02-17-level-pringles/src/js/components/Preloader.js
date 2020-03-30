export default class Preloader {
  constructor(initParams) {
    const defaultParams = {
      preloaderSelector: '.preloader',

      preloaderIconSelector: '.preloader__icon',
      preloaderIconFillClass: 'preloader__icon_state_fill',
    };

    const params = { ...defaultParams, ...initParams };
    const preloader = document.querySelector(params.preloaderSelector);

    if (!preloader) {
      console.error('Please, set preloader selector or preloader icon.');
      return;
    }

    const preloaderIcon = preloader.querySelector(params.preloaderIconSelector);

    this.preloader = preloader;
    this.preloaderIcon = preloaderIcon;
    this.preloaderIconFillClass = params.preloaderIconFillClass;

    this.init();
  }

  onDocumentReady = () => {
    if (document.readyState === 'complete') {
      this.removePreloader();
    }
  };

  onAnimationEndIcon = () => {
    this.preloaderIcon.classList.add(this.preloaderIconFillClass);
  };

  init() {
    this.appendPreloader();
    this.preloaderIcon.addEventListener('animationend', this.onAnimationEndIcon);
    document.addEventListener('readystatechange', this.onDocumentReady);
  }

  appendPreloader() {
    document.body.appendChild(this.preloader);
  }

  removePreloader() {
    this.preloader.remove();
  }
}
