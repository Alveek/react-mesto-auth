import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Login = ({ onLogin, setErr, setIsInfoTooltipOpen, setEmail }) => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setValues({ email: "", password: "" });
          onLogin(data);
          auth.checkToken(data.token).then((res) => setEmail(res.data.email));
          navigate("/");
        }
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <p className="auth-form__welcome">Вход</p>
      <input
        className="auth-form__input form__input_user_email"
        id="user-email-input"
        name="email"
        value={values.email || ""}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className={`form__input-error auth-form__input-error ${
          isValid ? "" : "form__input-error_active"
        }`}
      >
        {errors.email}
      </span>
      <input
        className="auth-form__input form__input_user_password"
        id="user-password-input"
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        type="password"
        placeholder="Пароль"
        minLength="6"
        maxLength="200"
        required
      />
      <span
        className={`form__input-error auth-form__input-error ${
          isValid ? "" : "form__input-error_active"
        }`}
      >
        {errors.password}
      </span>
      <button
        type="submit"
        className="auth-form__submit-button"
        disabled={!isValid}
      >
        Войти
      </button>
    </form>
  );
};

export default Login;
