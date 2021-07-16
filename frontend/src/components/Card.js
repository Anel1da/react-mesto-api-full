import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardClick,
  onDeleteCardConfirm,
  onCardLike,
}) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteCardComfirm = () => {
    onDeleteCardConfirm(card);
  };

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `place__remove-icon ${
    isOwn && "place__remove-icon_active"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place__like-icon ${
    isLiked && "place__like-icon_active"
  }`;

  return (
    <figure className="place">
      <img
        className="place__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteCardComfirm}
      ></button>
      <figcaption className="place__discription">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Мне нравится"
          ></button>
          <div className="place__like-counter">{card.likes.length}</div>
        </div>
      </figcaption>
    </figure>
  );
}
