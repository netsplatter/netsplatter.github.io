import FileUploader from './components/FileUploader';
import CopyPromocode from './components/CopyPromocode';
import FormSubmit from './components/FormSubmit';
import LazyLoad from "vanilla-lazyload";
import { navigationInit } from './components/navigation';

document.addEventListener('DOMContentLoaded', () => {
  const navigation = document.querySelector('.nav');
  const uppyLoader = document.querySelector('.uppy-loader');
  const promocode = document.querySelector('.promocode');
  const form = document.querySelector('.modal__form');
  const lazyLoading = document.querySelector('.lazy-loading');

  if (navigation) {
    navigationInit();
  }

  if (uppyLoader) {
    window.fileUploader = new FileUploader();
  }

  if (promocode) {
    window.copyPromocode = new CopyPromocode();
  }

  if (form) {
    new FormSubmit(
      '.modal__content_view_form',
      '.modal__form .form__area',
      'form_state_success',
      '.modal__form-button',
    );
  }

  if (lazyLoading) {
    new LazyLoad({
      elements_selector: '.lazy-loading',
    });
  }
});
