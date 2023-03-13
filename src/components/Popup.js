import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div
        className={
          name === "image-preview"
            ? "popup__image-container"
            : "popup__container"
        }
      >
        {children}
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button opacity"
          aria-label="Закрыть попап"
        ></button>
      </div>
    </div>
  );
};

export default Popup;
