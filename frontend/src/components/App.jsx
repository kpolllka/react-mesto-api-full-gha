import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [stateInfoTooltip, setStateInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), 
        api.getCardsInfo()
          ])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка ${error}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token).then((res) => {
        setLoggedIn(true);
        setUserEmail(res.email);
        navigate('/');
      }).catch((error) => console.log(`Ошибка ${error}`));
    }
  }, [])
   
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    // setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen); //аналог выше
  }
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    
    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    }).catch((error) => console.log(`Ошибка ${error}`));
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
    .then(()=>{
      setCards(cards.filter((c)=> c._id !== card._id));
    }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const handleUpdateUser = (data) => {
    api.setUserEdit(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const handleUpdateAvatar = (data) => {
    api.setAvatarEdit(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const handleAddPlaceSubmit = (data) => { //добавление новой карточки
    api.createNewCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const onRegister = (email, password) => {
    auth.register(email, password).then(() => {
      navigate('/signin');
      setStateInfoTooltip(true);
    })
    .catch((error) => {console.log(`Ошибка ${error}`);
    setStateInfoTooltip(false);
    })
    .finally(() => {
      setInfoTooltipPopupOpen(true);
    })
  }

  const onLogin = (email, password) => {
    auth.authorize(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/');        
      }
    }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const onSignOut = () => {
    localStorage.removeItem('token');
    setUserEmail('');
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <Header email={userEmail} onSignOut={onSignOut} />

        <Routes>
          <Route path='signup' element={<Register onRegister={onRegister} />} />
          <Route path='/signin' element={<Login onLogin={onLogin} />} />
          <Route path='/' element={<ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />} />
        </Routes>

        <Footer />        

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        
        <PopupWithForm
          title='Вы уверены?'
          name='popup-delete-cards'
          onClose={closeAllPopups}
          textButton='Да'
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} state={stateInfoTooltip} />

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;