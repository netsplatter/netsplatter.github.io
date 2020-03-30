import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import axios from 'axios';
import Russian from '@uppy/locales/lib/ru_RU';

export default class FileUploader {
  constructor({ dashboardSelector } = {}) {

    this.uppy = null;
    this.dashboardSelector = dashboardSelector || '.uppy-loader__box';
    this.buttonUploaded = document.querySelector('.uppy-loader__button-load');
    this.buttonUploadedProgress = document.querySelector('.uppy-loader__button-load-progress');
    this.buttonModalClose = document.getElementById('upload-receipt-modal').querySelector('.modal__container-close');

    this.receiptId = null;
    this.receiptCreateUrl = `/receipt/create`;
    this.receiptLoadImageUrl = `receipt/load-image?id=`;
    this.receiptCompleteUploadUrl = `/receipt/complete?id=`;
    this.totalCountFiles = 0;
    this.callCountUploadSuccess = 0;

    this.init();
  }

  init() {
    this.uppy = new Uppy({
      locale: Russian,
      restrictions: {
        maxFileSize: 20971520,
        maxNumberOfFiles: 5,
        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png']
      }
    });

    this.setUppyPlugins();
    this.setUppyFileAddedEvent();
    this.setUppyFileRemovedEvent();
    this.setUppyUploadEvent();
    this.setUppyUploadSuccessEvent();

    this.buttonUploaded.addEventListener('click', () => {

      const files = this.uppy.getFiles();

      this.buttonUploaded.disabled = true;

      if (files.length > 0) {

        if (this.receiptId) {
          this.startUpload();
        } else {
          axios.get(this.receiptCreateUrl)
              .then(({data: {id}}) => {
                this.receiptId = id;
                this.startUpload();
              })
              .catch((error) => {
                this.showErrorModal(error.response.data.message);
                this.resetAfterUploadImages(true);
              });
        }

      }

    });

    this.buttonModalClose.addEventListener('click', () => {
      this.uppy.reset();
    });

    $('#upload-receipt-modal').on('modal:open', () => {
      axios.get(this.receiptCreateUrl)
          .then(({data: {id}}) => {
            this.receiptId = id;
          })
          .catch((error) => {
            this.showErrorModal(error.response.data.message);
            this.resetAfterUploadImages(true);
          });
    });
  }

  startUpload() {
    this.uppy.upload()
        .then((result) => {
          if (result.failed.length > 0) {
            console.error('Errors upload:');

            result.failed.forEach((file) => {
              console.error(file.error);
            });
          }
        })
        .catch((err) => {
          console.error('Error', err);
        });
  }

  showErrorModal(text) {
    let $errorModal = $('#error-modal');
    $errorModal.find('p.modal__title').text(text);
    $errorModal.modal();
  }

  setUppyUploadEvent() {
    this.uppy.on('upload', () => {
      const files = this.uppy.getFiles();

      this.uploadImages(files);
    });
  }

  setUppyPlugins() {
    this.uppy
      .use(Dashboard, {
        target: this.dashboardSelector,
        inline: true,
        width: '100%',
        height: 150,
        showProgressDetails: true,
        hideUploadButton: true,
      });
  }

  setUppyFileAddedEvent() {
    this.uppy.on('file-added', () => {
      this.buttonUploaded.disabled = false;
    });
  }

  setUppyFileRemovedEvent() {
    this.uppy.on('file-removed', () => {
      const files = this.uppy.getFiles();

      if (!files.length) {
        this.resetAfterUploadImages();
      }
    });
  }

  setUppyUploadSuccessEvent() {
    this.uppy.on('upload-success', () => {
      this.callCountUploadSuccess += 1;

      if (this.totalCountFiles === this.callCountUploadSuccess) {
        this.setCompleteReceipt()
          .then(() => {})
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.resetAfterUploadImages(true);

            // Open Modal success upload images (by JQuery)
            $('#upload-success-receipt-modal').modal();
          });
      }
    });
  }

  setUppyUploadErrorEvent() {
    this.uppy.on('upload-error', ({ id }) => {
      this.uppy.retryUpload(id);
    });
  }

  uploadImages(images) {
    this.totalCountFiles = images.length;
    const bytesTotal = images.reduce((acc, img) => acc + img.size, 0);
    const stateFilesUploadedBytes = {};

    this.buttonUploaded.classList.add('uppy-loader__button-load_loading');

    images.forEach(image => {
      const data = new FormData();
      data.append('file', image.data);

      axios.post(`${this.receiptLoadImageUrl}${this.receiptId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.loaded !== -100) {
            stateFilesUploadedBytes[image.id] = progressEvent.loaded;
            const bytesUploaded = Object.values(stateFilesUploadedBytes).reduce((acc, currentBytes) => acc + currentBytes, 0);
            const percentUploaded = Math.round( (bytesUploaded * 100) / bytesTotal);
            this.buttonUploadedProgress.style.left = `${ percentUploaded > -100 ? '0' : `${percentUploaded}%`}`;
          }
        }
      })
        .then(response => {
          this.uppy.emit('upload-success', { id: image.id, file: image.data }, response.status);
        })
        .catch(error => {
          this.resetButtonUpload();
          this.uppy.emit('upload-error', { id: image.id, file: image.data }, error.response.status);
        });
    });
  }

  resetAfterUploadImages() {
    this.uppy.reset();
    this.receiptId = null;
    this.callCountUploadSuccess = 0;
    this.totalCountFiles = 0;
    this.resetButtonUpload();
  }

  resetButtonUpload() {
    this.buttonUploaded.disabled = false;
    this.buttonUploaded.classList.remove('uppy-loader__button-load_loading');
    this.buttonUploadedProgress.style.left = '-100%';
  }

  async setCompleteReceipt() {
    try {
      return await axios.post(`${this.receiptCompleteUploadUrl}${this.receiptId}`);
    } catch (error) {
      console.error(error);
    }
  }

}
