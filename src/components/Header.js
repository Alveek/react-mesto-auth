import { useState } from "react";
import logo from "../images/logo.svg";
import hamClosed from "../images/ham-closed.svg";
import hamOpened from "../images/ham-opened.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ email, onSignOut }) {
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  return (
    <header className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <button
          onClick={() => setMenuIsOpened((prev) => !prev)}
          className="header__menu-btn"
        >
          {menuIsOpened ? (
            <img src={hamOpened} alt="" />
          ) : (
            <img src={hamClosed} alt="" />
          )}
        </button>
      </div>
      <div className={`header__info${menuIsOpened ? "_visible" : ""}`}>
        {email && <p className="header__user-email">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__route" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__route" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link className="header__route" onClick={onSignOut} to="/sign-in">
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
