import Popup from "./Popup";
import successIcon from "../images/success.svg";
import failIcon from "../images/error.svg";

function InfoTooltip({ isOpen, onClose, err }) {
  return (
    <Popup onClose={onClose} isOpen={isOpen} name={"infotooltip"}>
      {!err && (
        <>
          <img src={successIcon} alt="#" />
          <p>Вы успешно зарегистрировались!</p>
        </>
      )}

      {err && (
        <>
          <img height="120px" src={failIcon} alt="#" />
          <p>Что-то пошло не так! Попробуйте ещё раз.</p>
        </>
      )}
    </Popup>
  );
}

export default InfoTooltip;
