import { Link, Route, Switch } from "react-router-dom";

export default function Header({ loggedIn, handleLogOut, userEmail }) {
  return (
    <div className="header">
      <div className="header__logo"></div>
      <div className="header__auth">
        {loggedIn ? (
          <>
            <span className="header__email">{userEmail}</span>
            <Link
              to=""
              className="header__link header__link_logout"
              onClick={handleLogOut}
            >
              Выйти
            </Link>
          </>
        ) : (
          <Switch>
            {
              <Route path="/sign-up">
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              </Route>
            }
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}
