import Gumshoe from 'gumshoejs';
import SmoothScroll from 'smooth-scroll';

export const navigationInit = () => {
  const navigation = document.querySelector('.nav');

  if (navigation) {
    window.spyNavigation = new Gumshoe('.nav__link', {
      navClass: 'nav__item_active',
    });

    window.smoothScroll = new SmoothScroll('.nav__link', {
      speed: 300
    });
  }
};
