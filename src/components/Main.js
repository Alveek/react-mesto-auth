import { useContext } from "react";
import iconPencil from "../images/icon-pencil.svg";
import Card from "./Card";
import Loader from "./Loader";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onTrashClick,
  dataIsLoaded,
  dataLoadingError,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      {!dataIsLoaded ? (
        <Loader error={dataLoadingError} />
      ) : (
        <main className={`content`}>
          <section className="profile">
            <div className="profile__avatar-container" onClick={onEditAvatar}>
              <img
                src={currentUser.avatar}
                alt="Аватарка"
                className="profile__avatar"
              />
              <img
                className="profile__updavatar-button"
                src={iconPencil}
                alt="edit-pencil"
              />
            </div>

            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button opacity"
              ></button>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <button
              onClick={onAddPlace}
              type="button"
              className="profile__add-button opacity"
            ></button>
          </section>

          <section className="card" aria-label="Карточки">
            <ul className="card__items">
              {cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onTrashClick={onTrashClick}
                />
              ))}
            </ul>
          </section>
        </main>
      )}
    </>
  );
}

export default Main;
