import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function ConfirmDeletePopup({
  card,
  isOpen,
  onClose,
  onSubmitDelete,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitDelete(card);
  };
  return (
    <PopupWithForm
      name="confim_delete"
      formTitle="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      submitButtonTitle="Да"
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
