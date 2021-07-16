// переменные

export const addPlaceOpenButton = document.querySelector(".profile__add-button");
export const editProfileOpenButton = document.querySelector(".profile__edit-button");
export const formAddPlace = document.querySelector(".form_add-place");
export const cardSelector = '.template_type_default';
export const formEditProfile = document.querySelector(".form_edit-profile");
export const nameInput = formEditProfile.querySelector(".popup__input_type_name");
export const jobInput = formEditProfile.querySelector(".popup__input_type_job");
export const popupUpdateAvatarOpenButton = document.querySelector(".profile__updateAvatar-button");
export const formUpdateAvatar = document.querySelector(".form_update-avatar")
export const ESC_KEY = "Escape";
export const validationSettings = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorSelector: ".popup__input-error",
    inputErrorClass: 'popup__input-error',
    inputErrorClassActive: 'popup__input-error_active',
    inputErrorStyleActive: "popup__input_type-error"
}