import React from "react";
import logo from "../images/logo.svg";
import {useLocation, Link} from "react-router-dom";

function Header({email, onSignOut}) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место"/>
      {email && <p style={{color: "#fff"}}>{email}</p>}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="white">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="white">
          Регистрация
        </Link>
      )}
      {location.pathname === "/" && (
        <>

          <Link onClick={onSignOut} to="/sign-in" className="white">
            Выйти
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
