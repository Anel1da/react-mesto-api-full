import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarInputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
    avatarInputRef.current.value = null;
  };

  return (
    <PopupWithForm
      name="update-avatar"
      formTitle="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loadingSubmitButtonTitle="Сохранение..."
      isLoading={isLoading}
      submitButtonTitle="Сохранить"
    >
      <label className="popup__label">
        <input
          id="avatar"
          className="popup__input popup__input_type_avatar"
          type="url"
          name="link"
          placeholder="Ссылка на фото"
          ref={avatarInputRef}
          required
        />
        <span className="popup__input-error" id="avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}
