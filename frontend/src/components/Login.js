import React from "react";
import { useState } from "react";

export const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(userData);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">
          <input
            id="email-input"
            className="auth__input"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={handleChange}
            value={userData.email}
            required
          />
          <span className="auth__input-error" id="email-input-error"></span>
        </label>
        <label className="auth__label">
          <input
            id="password-input"
            className="auth__input"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="8"
            maxLength="30"
            autoComplete="off"
            onChange={handleChange}
            value={userData.password}
            required
          />
          <span className="auth__input-error" id="password-input-error"></span>
        </label>

        <button className="auth__submit-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
};
