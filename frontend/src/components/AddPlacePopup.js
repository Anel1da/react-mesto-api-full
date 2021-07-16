import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  //стейт переменные
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  //обработчики
  const handleSetCardName = (evt) => {
    setCardName(evt.target.value);
  };
  const handleSetCardLink = (evt) => {
    setCardLink(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
    setCardLink("");
    setCardName("");
  };

  return (
    <PopupWithForm
      name="add-place"
      formTitle="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      submitButtonTitle="Создать"
      onSubmit={handleSubmit}
      loadingSubmitButtonTitle="Сохранение..."
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          id="place-title"
          className="popup__input popup__input_type_place-title"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={cardName}
          onChange={handleSetCardName}
          required
        />
        <span className="popup__input-error" id="place-title-error"></span>
      </label>
      <label className="popup__label">
        <input
          id="place-image"
          className="popup__input popup__input_type_place-image"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={cardLink}
          onChange={handleSetCardLink}
          required
        />
        <span className="popup__input-error" id="place-image-error"></span>
      </label>
    </PopupWithForm>
  );
}
