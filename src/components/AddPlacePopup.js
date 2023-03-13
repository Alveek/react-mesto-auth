import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, isLoading, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      onAddPlace({
        name: values.cardName,
        link: values.cardLink,
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      buttonText="Создать"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className="form__input form__input_card_name"
        value={values.cardName || ""}
        onChange={handleChange}
        id="card-name-input"
        name="cardName"
        type="text"
        placeholder="Название"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className={`form__input-error card-name-input-error ${
          isValid ? "" : "form__input-error_active"
        }`}
      >
        {errors.cardName}
      </span>
      <input
        className="form__input form__input_card_link"
        value={values.cardLink || ""}
        onChange={handleChange}
        id="card-link-input"
        name="cardLink"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span
        className={`form__input-error card-name-input-error ${
          isValid ? "" : "form__input-error_active"
        }`}
      >
        {errors.cardLink}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
