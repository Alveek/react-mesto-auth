import { useState } from "react";
import logo from "../images/logo.svg";
import hamClosed from "../images/ham-closed.svg";
import hamOpened from "../images/ham-opened.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  const location = useLocation();
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
