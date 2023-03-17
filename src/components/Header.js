import React from "react";
import logo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" class="white">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" class="white">
          Регистрация
        </Link>
      )}
      {location.pathname === "/" && (
        <>
          {" "}
          <p style={{ color: "#fff" }}>{email}</p>
          <Link onClick={onSignOut} to="/sign-in" class="white">
            Выйти
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
