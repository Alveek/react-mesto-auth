import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Login = ({ onLogin, setErr, setIsInfoTooltipOpen, setEmail }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setValues,
    resetForm,
  } = useFormAndValidation();

  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //
  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   });
  // };
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
    <div className="login" style={{ color: "#fff" }}>
      <p className="login__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form__input form__input_user_email"
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
          className={`form__input-error user-email-input-error ${
            isValid ? "" : "form__input-error_active"
          }`}
        >
          {errors.email}
        </span>
        <input
          className="form__input form__input_user_password"
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
          className={`form__input-error user-password-input-error ${
            isValid ? "" : "form__input-error_active"
          }`}
        >
          {errors.password}
        </span>
        <button type="submit" className="form__button" disabled={!isValid}>
          Войти
        </button>
      </form>
      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="signup__link">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default Login;
