import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [dataLoadingError, setDataLoadingError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSignOut = () => {
    setEmail("");
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
          setDataIsLoaded(true);
        })
        .catch((err) => {
          setDataLoadingError(`Что-то пошло не так... (${err})`);
          console.log(err);
        });
  }, [loggedIn]);

  const handleRegister = (values) => {
    if (!values.email || !values.password) {
      return;
    }
    auth
      .register(values.email, values.password)
      .then((res) => {
        setErr(false);
        setIsInfoTooltipOpen((prev) => !prev);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
        console.log(err);
      });
  };

  const handleLogin = (values) => {
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          setEmail(values.email);
          navigate("/");
        }
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
        console.log(err);
      });
  };

  const handleCardClick = (data) => {
    setSelectedCard(data);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (user) => {
    setIsloading(true);
    api
      .editProfile(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsloading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsloading(true);
    api
      .updateAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsloading(false));
  };

  const handleAddPlaceSubmit = (card) => {
    setIsloading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsloading(false));
  };

  const handleTrashClick = (card) => {
    setCardToDelete(card);
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onTrashClick={handleTrashClick}
                dataIsLoaded={dataIsLoaded}
                dataLoadingError={dataLoadingError}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
                setErr={setErr}
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                setEmail={setEmail}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardToDelete}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          err={err}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
