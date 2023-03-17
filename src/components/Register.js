import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";

const Register = ({ setErr, setIsInfoTooltipOpen }) => {
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
    auth
      .register(formValue.email, formValue.password)
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
    <div className="register" style={{ color: "#fff" }}>
      <p className="register__welcome">Пожалуйста, зарегистрируйтесь.</p>
      <form
        onSubmit={handleSubmit}
        className="register__form"
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValue.email || ""}
          onChange={handleChange}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formValue.password || ""}
          onChange={handleChange}
        />

        <div className="register__button-container">
          <button type="submit" className="register__link">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
