import React from "react";
import logo from "../images/logo.svg";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <button onClick={onSignOut}>Exit</button>
      <p style={{ color: "#fff" }}>{email}</p>
    </header>
  );
}

export default Header;
