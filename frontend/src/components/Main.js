import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDeleteCardConfirm,
  onCardLike,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__photo"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <button
            className="profile__updateAvatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
            aria-label="Редактировать профиль"
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places">
        {cards.map((card) => (
          <Card
            {...card}
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteCardConfirm={onDeleteCardConfirm}
          />
        ))}
      </section>
    </div>
  );
}
