import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  //стейт переменные
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //обработчики
  const handleSetName = (evt) => {
    setName(evt.target.value);
  };

  const handleSetDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="editProfile"
      formTitle="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonTitle="Сохранить"
      loadingSubmitButtonTitle="Сохранение..."
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          id="name"
          className="popup__input  popup__input_type_name"
          type="text"
          placeholder="Имя"
          name="name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleSetName}
          required
        />
        <span className="popup__input-error" id="name-error"></span>
      </label>
      <label className="popup__label">
        <input
          id="job"
          className="popup__input popup__input_type_job"
          type="text"
          placeholder="Вид деятельности"
          name="job"
          minLength="2"
          maxLength="200"
          onChange={handleSetDescription}
          value={description}
          required
        />
        <span className="popup__input-error" id="job-error"></span>
      </label>
    </PopupWithForm>
  );
}
