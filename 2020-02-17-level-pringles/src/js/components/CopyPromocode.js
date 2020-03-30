export default class CopyPromocode {
  constructor() {
    this.mainContainerSelector = '.lk__promocode-container';
    this.promocodeStateCopyClass = 'promocode_state_copy';
    this.promocodeSelector = '.promocode__code';
    this.buttonsPromocodeSelector = '.btn_promocode';
    this.buttonsPromocode = null;

    this.init();
  }

  onButtonPromocodeClick = (button) => () => {
    const parent = button.closest(this.mainContainerSelector);

    if (parent) {
      const code = parent.querySelector(this.promocodeSelector);

      if (code) {
        Clipboard.copy(code.textContent);
        parent.classList.add(this.promocodeStateCopyClass);
        setTimeout(() => {
            parent.classList.remove(this.promocodeStateCopyClass);
        }, 2000);

          //window.navigator.clipboard.writeText(code.textContent)
          // .then(() => {
          //   parent.classList.add(this.promocodeStateCopyClass);
          //
          //   setTimeout(() => {
          //     parent.classList.remove(this.promocodeStateCopyClass);
          //   }, 2000);
          // })
          // .catch(err => {
          //   console.log('Something went wrong', err);
          // });
      }
    }
  };

  init(containerButtons) {
    this.getPromocodeButtons(containerButtons);
    this.setEventListenersOnButtons();
  }

  getPromocodeButtons(containerButtons) {
    const buttonsPromocodeSelector = containerButtons ? `${containerButtons} ${this.buttonsPromocodeSelector}`: this.buttonsPromocodeSelector;
    const buttonsPromocode = document.querySelectorAll(buttonsPromocodeSelector);

    if (!CopyPromocode.checkPromocodeButtons(buttonsPromocode)) return;

    this.buttonsPromocode = [... buttonsPromocode];
  }

  setEventListenersOnButtons() {
    if (!CopyPromocode.checkPromocodeButtons(this.buttonsPromocode)) return;

    this.buttonsPromocode.forEach(button => {
      const onClick = this.onButtonPromocodeClick(button);
      button.addEventListener('click', onClick);
    });
  }

  static checkPromocodeButtons(buttons) {
    if (!buttons) {
      console.error('Not found buttons for promocode');
    }

    return Boolean(buttons);
  }
}

window.Clipboard = (function (window, document, navigator) {
  let textArea,
    copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    let range,
      selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };

  return {
    copy: copy
  };
})(window, document, navigator);
