import throttle from 'lodash.throttle';
import webStorage from './storage.js';

const formRef = document.querySelector('form');
const KEY = 'feedback-form-state';

pageCheck();

function onInput(evt) {
  let savedValue = webStorage.load(KEY);
  if (savedValue === undefined) {
    savedValue = {};
  }

  const { name, value } = evt.target;
  savedValue[name] = value;

  webStorage.save(KEY, savedValue);
}

formRef.addEventListener('input', throttle(onInput, 500));

function pageCheck() {
  const savedValue = webStorage.load(KEY);
  if (savedValue === undefined) {
    return;
  }

  Object.entries(savedValue).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

const onSubmit = evt => {
  evt.preventDefault();
  const { email, message } = evt.target;
  if (email.value === '' || message.value === '') {
    return;
  }

  const userData = {};

  const data = new FormData(formRef);

  data.forEach((value, name) => {
    userData[name] = value;
  });

  console.log(userData);

  webStorage.remove(KEY);

  evt.target.reset();
};
formRef.addEventListener('submit', onSubmit);
