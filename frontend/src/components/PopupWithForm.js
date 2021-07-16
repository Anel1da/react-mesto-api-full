export default function PopupWithForm({
  name,
  formTitle,
  submitButtonTitle,
  isOpen,
  onClose,
  onSubmit,
  children,
  isLoading,
  loadingSubmitButtonTitle,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{formTitle}</h2>

        <form className={`form form__${name}`} name={name} onSubmit={onSubmit}>
          {children}

          <button className="popup__submit-button" type="submit">
            {isLoading ? loadingSubmitButtonTitle : submitButtonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}
