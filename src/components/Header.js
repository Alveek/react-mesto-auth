import React from "react";
import logo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div className="header__info">
        {email && <p className="header__user-email">{email}</p>}
        {location.pathname === "/sign-up" && (
          <Link className="header__route" to="/sign-in">
            Войти
          </Link>
        )}
        {location.pathname === "/sign-in" && (
          <Link className="header__route" to="/sign-up">
            Регистрация
          </Link>
        )}
        {location.pathname === "/" && (
          <Link className="header__route" onClick={onSignOut} to="/sign-in">
            Выйти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
