function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image-preview ${card ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__image-description">{card?.name}</p>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button opacity"
          aria-label="Закрыть попап"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
