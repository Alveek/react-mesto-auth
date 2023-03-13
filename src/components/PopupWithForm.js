import { useRef } from "react";
import Popup from "./Popup";

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  isLoading,
  buttonText,
  onSubmit,
  isValid,
  children,
}) {
  const currentForm = useRef(null);

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form
        className="form"
        ref={currentForm}
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button className="form__button" type="submit" disabled={!isValid}>
          {isLoading ? "Сохранение" : buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
