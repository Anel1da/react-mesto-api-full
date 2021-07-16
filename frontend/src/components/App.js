import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup.js";
import Spinner from "./Spinner";
import { Login } from "./Login";
import { Register } from "./Register";
import { api } from "./../../src/utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import { InfoTooltip } from "./InfoTooltip";
import tooltipDeny from "./../images/tooltip-deny.svg";
import tooltipSuccess from "./../images/tooltip-success.svg";
import * as auth from "./../utils/auth";

function App() {
  // стейт переменные
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = React.useState({
    icon: "",
    message: "",
  });
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: " ",
    avatar: " ",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [userData, setUserData] = React.useState({ email: "", password: "" });
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();

  // хуки, получающие данные с сервера
  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    api
      .getUsersInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  // ОБРАБОТЧИКИ СОБЫТИЙ

  //работа с попапами
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleInfoToolTipOpen = () => {
    setIsInfoToolTipOpen(true);
  };

  const handleDeleteCardConfirm = (card) => {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  };
  const handleCardClick = ({ name, link }) => {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
  };

  // постановка и снятие лайка
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  //удаление карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // обработчик редактирования профиля
  const handleUpdateUser = (newData) => {
    setIsLoading(true);
    api
      .editUsersProfile(newData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // обработчик обновления аватара
  const handleUpdateAvatar = (newData) => {
    setIsLoading(true);
    api
      .updateAvatar(newData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  // обработчик добавления карточки
  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  //Регистрация пользователя
  const handleRegister = ({ email, password }) => {
    return auth
      .register({ email, password })
      .then((data) => {
        handleInfoToolTipMessage({
          icon: tooltipSuccess,
          message: "Вы успешно зарегистрировались!",
        });
        handleInfoToolTipOpen(true);
        history.push("/sign-in");
      })
      .catch((error) => {
        handleInfoToolTipMessage({
          icon: tooltipDeny,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      });
  };

  //авторизация пользователя
  const handleLogin = ({ email, password }) => {
    return auth
      .authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setUserEmail(email);

        handleInfoToolTipMessage({
          icon: tooltipSuccess,
          message: "Вы успешно авторизовались!",
        });
        handleInfoToolTipOpen(true);
        history.push("/");
      })

      .catch((error) => {
        handleInfoToolTipMessage({
          icon: tooltipDeny,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      });
  };

  //проверка токена
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          setLoggedIn(true);
          history.push("/");
          setUserEmail(data.data.email);
        })
        .catch((error) => console.log(error));
    } else {
      setLoggedIn(false);
    }
  };

  //отрисовка спинера

  if (loggedIn === null) {
    return <Spinner />;
  }

  //изменение тултипа в зависимости от статуса регистрации
  const handleInfoToolTipMessage = ({ icon, message }) => {
    setInfoToolTipMessage({ icon: icon, message: message });
  };

  //выход

  const handleLogOut = () => {
    setUserData({ email: "", password: "" });
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        userEmail={userData.email}
        handleLogOut={handleLogOut}
        userEmail={userEmail}
      />

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteCardConfirm={handleDeleteCardConfirm}
          onCardLike={handleCardLike}
          userData={userData}
        />
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
      {loggedIn && <Spinner />}
      {loggedIn && <Footer />}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <ConfirmDeletePopup
        onClose={closeAllPopups}
        isOpen={isDeleteCardPopupOpen}
        onSubmitDelete={handleCardDelete}
        card={selectedCard}
      />

      <ImagePopup
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        {...selectedCard}
      />
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        infoToolTipMessage={infoToolTipMessage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
