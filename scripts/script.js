// Кнопки

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupEditClose = popupEdit.querySelector('.popup__close-icon');
const popupAddClose = popupAdd.querySelector('.popup__close-icon');
const popupImageClose = popupImage.querySelector('.popup__close-icon');

// Формы

const formProfile = popupEdit.querySelector('.form');
const userNameInput = formProfile.querySelector('#user-name');
const userJobInput = formProfile.querySelector('#user-job');

const formCards = popupAdd.querySelector('.form');
const placeNameInput = formCards.querySelector('#place-name');
const placeImgInput = formCards.querySelector('#place-img');

// Профиль

const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Карточки

const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

// Открытая картинка

const elImage = popupImage.querySelector('.opened-image__image');
const elCaption = popupImage.querySelector('.opened-image__caption');


// Карточки из коробки

const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: './images/element-karachaevsk.jpg'
  },
  {
    name: 'Алтай',
    link: './images/element-altai.jpg'
  },
  {
    name: 'Кабардино-Балкария',
    link: './images/element-kabardino-balkaria.jpg'
  },
  {
    name: 'Крым',
    link: './images/element-crimea.jpg'
  },
  {
    name: 'Байкал',
    link: './images/element-baikal.jpg'
  },
  {
    name: 'Смоленск',
    link: './images/element-smolensk.jpg'
  }
];


// Открытие и закрытие модальных окон

function popupOpen(popup) {
  popup.classList.add('popup_animated');
  popup.classList.add('popup_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}


// Открытие и закрытие модального окна с картинкой

function popupImageOpen(popupImageData) {
  popupOpen(popupImage);

  elImage.src = popupImageData.link;
  elImage.alt = popupImageData.name;
  elCaption.textContent = popupImageData.name;
}

popupImageClose.addEventListener('click', () => {
  popupClose(popupImage);
});


// Функции создания и добавления карточек

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const likeButton = cardElement.querySelector('.element__like-icon');
  const trashButton = cardElement.querySelector('.element__trash-icon');

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  elementTitle.textContent = cardData.name;

  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-icon_active');
  });

  trashButton.addEventListener('click', evt => {
    const card = evt.target.closest('.element');
    card.remove();
  });

  elementImage.addEventListener('click', evt => {
    const targetImage = evt.target;

    popupImageOpen({
      name: targetImage.alt,
      link: targetImage.src
    });
  });

  return cardElement;
}

function addCard(cardData, cardContainer, newCard) {
  const card = createCard(cardData);

  if (newCard) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}


// Карточки из коробки

initialCards.forEach(item => {
  addCard(item, cardsList, false);
});


// Модальное окно редактирования профиля

editButton.addEventListener('click', () => {
  popupOpen(popupEdit);

  userNameInput.value = profileTitle.textContent;
  userJobInput.value = profileSubtitle.textContent;
});

popupEditClose.addEventListener('click', () => {
  popupClose(popupEdit);
});

// Отправка формы редактирования профиля

function editProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = userNameInput.value;
  profileSubtitle.textContent = userJobInput.value;

  popupClose(popupEdit);
}

formProfile.addEventListener('submit', editProfile);


// Модальное окно добавления карточки

addButton.addEventListener('click', () => {
  popupOpen(popupAdd);

  placeNameInput.value = '';
  placeImgInput.value = '';
});

popupAddClose.addEventListener('click', () => {
  popupClose(popupAdd);
});

// Отправка формы добавления карточки

formCards.addEventListener('submit', evt => {
  evt.preventDefault();

  addCard({
    name: placeNameInput.value,
    link: placeImgInput.value
  }, cardsList, true);

  popupClose(popupAdd);
});


// console.log();
// debugger;
