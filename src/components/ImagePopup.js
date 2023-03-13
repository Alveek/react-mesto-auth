import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup onClose={onClose} isOpen={card} name={"image-preview"}>
      <img className="popup__image" src={card?.link} alt={card?.name} />
      <p className="popup__image-description">{card?.name}</p>
    </Popup>
  );
}

export default ImagePopup;
