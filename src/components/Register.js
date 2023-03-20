import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Register = ({ setErr, setIsInfoTooltipOpen }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .register(values.email, values.password)
      .then((res) => {
        setErr(false);
        setIsInfoTooltipOpen((prev) => !prev);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <p className="auth-form__welcome">Регистрация</p>
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
        Зарегистрироваться
      </button>
      <div className="auth-form__text">
        <span>Уже зарегистрированы? </span>
        <Link to="/sign-in" className="auth-form__link">
          Войти
        </Link>
      </div>
    </form>
  );
};

export default Register;
