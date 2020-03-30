export default class FormSubmit {
  constructor(
    formContainerSelector,
    formSelector,
    formSuccessClass,
    buttonSubmitSelector,
    fieldStateInvalidClass = 'form__field_state_invalid',
  ) {
    const formContainer = document.querySelector(formContainerSelector);
    const form = formContainer.querySelector(formSelector);
    const button = document.querySelector(buttonSubmitSelector);
    if (!formContainer || !form || !button) throw new Error('Не найдена кнопка или форма отправки.');

    this.form = form;
    this.formElements = [];
    this.formElementsInvalid = [];
    this.onlyLettersElements = ['name'];

    this.button = button;
    this.fieldStateInvalidClass = fieldStateInvalidClass;

    this.serverErrors = null;
    this.nameUser = document.querySelector('.user__username');
    this.language = document.querySelector('html').lang;
    this.messagesError = {
      ru: {
        text: 'Пожалуйста, укажите',
        emailEmpty: 'Пожалуйста, укажите Email',
        emailIncorrect: 'Некорректный Email',
        default: 'Это поле обязательно',
      },
      en: {
        text: 'Please, enter',
        emailEmpty: 'Please, enter email',
        emailIncorrect: 'Incorrect email',
        default: 'This field is required',
      }
    };

    this.init();
  }

  // Handlers
  init() {
    this.getFormElements();

    this.button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.formElementsInvalid = [];

      this.formElements.forEach((element) => {
        this.validateInput(element);
      });

      if (this.formElementsInvalid.length === 0) {
        this.requestForm(this.getDataForm());
      }
    });

    this.inputsEventInput();
  }

  inputsEventInput() {
    this.formElements.forEach((element) => {
      const eventName = element.type === 'checkbox' ? 'change' : 'input';

      element.addEventListener(eventName, () => {
        this.validateInput(element);
      });

      this.onlyLettersElements.forEach((name) => {
        if (element.name === name) {
          if (this.nameUser) {
            element.value = this.nameUser.textContent || '';
          }

          element.addEventListener('input', () => {
            element.value = element.value.replace(/[^a-zA-Zа-яёЁА-я- ]/g, '');
          });
        }
      });
    });
  }

  validateInput(element) {
    element.checkValidity();
    if (element.validity.valid) {
      this.removeInvalidState(element);
    } else {
      this.setInvalidState(element);
      this.formElementsInvalid.push(element.name);
    }
  }

  setInvalidState(element, textError) {
    if (element.type === 'checkbox') {
      element.parentNode.parentNode.classList.add(this.fieldStateInvalidClass);
    } else {
      element.parentNode.classList.add(this.fieldStateInvalidClass);
    }

    if (textError) {
      if (element.type === 'checkbox') {
        element.parentNode.nextElementSibling.textContent = textError;
      } else {
        element.nextElementSibling.textContent = textError;
      }
    } else {
      if (element.type === 'checkbox') {
        element.parentNode.nextElementSibling.textContent = this.validateSwitchError(element);
      } else {
        element.nextElementSibling.textContent = this.validateSwitchError(element);
      }
    }
  }

  removeInvalidState(element) {
    if (element.type === 'checkbox') {
      element.parentNode.parentNode.classList.remove(this.fieldStateInvalidClass);
      element.parentNode.nextElementSibling.textContent = '';
    } else {
      element.parentNode.classList.remove(this.fieldStateInvalidClass);
      element.nextElementSibling.textContent = '';
    }
  }

  validateSwitchError(element) {
    if (element.type === 'text') {
      return `${this.messagesError[this.language].text} ${FormSubmit.lowerCaseString(element.placeholder)}`;
    }

    if (element.type === 'email') {
      if (element.validity.valueMissing) {
        return this.messagesError[this.language].emailEmpty;
      }

    if (element.validity.patternMismatch) {
        return this.messagesError[this.language].emailIncorrect;
      }
    }

    if (element.type === 'checkbox') {
      return this.messagesError[this.language].default;
    }

    return;
  }

  getDataForm() {
    const data = {};

    [...this.form.elements].forEach((element) => {
      if (element.tagName === 'INPUT') {
        data[element.name] = element.value;
      }
    });

    return data;
  }

  requestForm(formData) {
    const urlFeeder = this.language === 'ru' ? '/feeder' : '/feeder?lang=en';
    this.button.disabled = true;

    fetch(urlFeeder, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.success) {
        this.button.disabled = false;
        this.setStateSuccessForm();
      } else {
        this.serverErrors = data;
        this.button.disabled = false;
        this.renderServerErrors();
      }
    }).catch((error) => {
      console.error('Ошибки:', error);
    });
  }

  setStateSuccessForm() {
    $('#subscription-chair-success').modal();

    this.removeStateSuccessForm();
  }

  removeStateSuccessForm() {
    this.formElements.forEach((element) => {
      if (element.type === 'checkbox') return;
      element.value = '';
    });
  }

  getFormElements() {
    [...this.form.elements].forEach((element) => {
      if (element.tagName === 'INPUT' || element.tagName === 'CHECKBOX') {
        this.formElements.push(element);
      }
    });
  }

  renderServerErrors() {
    if (this.serverErrors) {
      this.formElements.forEach((element) => {
        this.serverErrors.forEach((error) => {
          if (element.name === error.field) {
            this.setInvalidState(element, error.message);
          }
        });
      });
    }
  }

  static lowerCaseString(text) {
    return `${text[0].toLowerCase()}${text.slice(1)}`;
  }
};
