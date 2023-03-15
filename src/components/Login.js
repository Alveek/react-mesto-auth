import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

const Login = ({ handleLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password).then((data) => {
      if (data.token) {
        setFormValue({ email: "", password: "" });
        handleLogin();
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className="login" style={{ color: "#fff" }}>
      <p className="login__welcome">Добро пожаловать!</p>
      <form
        onSubmit={handleSubmit}
        className="login__form"
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <label htmlFor="username">e-mail:</label>
        <input
          required
          id="email"
          name="email"
          type="email"
          value={formValue.email || ""}
          onChange={handleChange}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          required
          id="password"
          name="password"
          type="password"
          value={formValue.password || ""}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Войти
          </button>
        </div>
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
