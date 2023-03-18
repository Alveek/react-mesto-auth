import Popup from "./Popup";
import successIcon from "../images/success.svg";
import failIcon from "../images/error.svg";

function InfoTooltip({ isOpen, onClose, err }) {
  return (
    <Popup onClose={onClose} isOpen={isOpen} name={"infotooltip"}>
      <div className="infotooltip">
        <img
          className="infotooltip__image"
          src={err ? failIcon : successIcon}
          alt="Вы успешно зарегистрировались"
        />
        <p className="infotooltip__text">
          {err
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
