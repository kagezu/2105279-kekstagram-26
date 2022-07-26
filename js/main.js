
import { getData } from "./net-api.js";
import createPreviewElement from "./create-preview-element.js";
import createMessage from './create-message.js';
import { showBigPicture } from './big-picture.js';
import { activateFilterForm } from './filters.js';
import './form.js';

let pictureData;

const onClickPreview = (evt) => {
  if (evt.target.tagName === 'IMG') {
    showBigPicture(pictureData[evt.target.parentElement.id]);
  }
};

const showPreviewPicture = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((picture, index) => {
    const element = createPreviewElement(picture);
    element.id = index;
    element.addEventListener('click', onClickPreview);
    fragment.append(element);
  });
  document.querySelector('.pictures').prepend(fragment);
};

const loadData = () =>
  getData(
    (data) => {
      pictureData = data;
      activateFilterForm(showPreviewPicture, data);
    },
    () => createMessage(
      '#error_load',
      loadData
    ));

loadData();
