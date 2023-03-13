import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, isLoading, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setValues,
    resetForm,
  } = useFormAndValidation();

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      setIsValid(true);
    }

    if (!isOpen) {
      resetForm();
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-info"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className="form__input form__input_user_name"
        id="user-name-input"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        type="text"
        placeholder="Ваше имя"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className={`form__input-error user-name-input-error ${
          isValid ? "" : "form__input-error_active"
        }`}
      >
        {errors.name}
      </span>
      <input
        className="form__input form__input_user_job"
        id="user-job-input"
        name="about"
        value={values.about || ""}
        onChange={handleChange}
        type="text"
        placeholder="Род деятельности"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className={`form__input-error user-job-input-error ${
          isValid ? "" : "form__input-error_active"
        }`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
