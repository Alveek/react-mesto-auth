import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ onClose, isOpen, isLoading, onUpdateAvatar }) {
  const avatarLink = useRef(null);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      onUpdateAvatar({
        avatar: avatarLink.current.value,
      });
    }
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className="form__input form__input_avatar_link"
        value={values.avatarLink || ""}
        ref={avatarLink}
        id="avatar-link-input"
        name="avatarLink"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <span
        className={`form__input-error avatar-link-input-error ${
          isValid ? "" : "form__input-error_active"
        }`}
      >
        {errors.avatarLink}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
