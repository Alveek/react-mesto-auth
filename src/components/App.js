import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Loader from './Loader';
import ConfirmationPopup from './ConfirmationPopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [dataLoadingError, setDataLoadingError] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleCloseByEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  const handleClickOnOverlay = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleCloseByEsc);
      document.addEventListener('mousedown', handleClickOnOverlay);
    }

    return () => {
      document.removeEventListener('keydown', handleCloseByEsc);
      document.removeEventListener('mousedown', handleClickOnOverlay);
    };
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isConfirmationPopupOpen, selectedCard]);

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
        <Header />
        {!dataIsLoaded ? <Loader error={dataLoadingError} /> : <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onTrashClick={handleTrashClick} />}
        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} isLoading={isLoading} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} isLoading={isLoading} onAddPlace={handleAddPlaceSubmit} />

        <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} card={cardToDelete} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
