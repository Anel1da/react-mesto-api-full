export default function ImagePopup({ name, link, isOpen, onClose }) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_preview">
        <button
          className="popup__close-button popup__close-button_preview"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <figure className="preview">
          <img className="preview__image" src={link} alt={name} />
          <figcaption>
            <h2 className="preview__title">{name}</h2>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
