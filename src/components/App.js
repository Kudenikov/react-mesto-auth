import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api'
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import wellDone from '../images/well-done.svg';
import somethingWrong from '../images/something-wrong.svg';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [isFailed, setIsFailed] = React.useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [isEmailVisible, setIsEmailVisible] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [imageToolTip, setImageToolTip] = React.useState('');

    React.useEffect(() => {
        api.getInitialCards()
        .then(setCards)
        .catch(error => 
            console.log('ОШИБКА:', error))
    }, [])

    React.useEffect(()=>{
        if (loggedIn){
          navigate('/mesto');
        }
      }, [loggedIn, navigate])

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
          const jwt = localStorage.getItem('jwt');
          // проверяем токен пользователя
          auth.checkToken(jwt).then((res) => {
            if (res) {
              setLoggedIn(true);
              setEmail(res.data.email);
            }
          })
          .catch(error => 
            console.log('ОШИБКА:', error))
        }
      }, [email]);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(setCards((state) => state.filter((item) => 
            item._id !== card._id
            )))
        .catch(error => 
            console.log('ОШИБКА:', error))
    }

    React.useEffect(() => {
        api.getUserInfo()
        .then(result => {
            setCurrentUser(result);
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
    }, [])

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (item) => {
        setSelectedCard(item);
        setIsImagePopupOpen(true);
    }

    function handleLogin(formData) {
        auth.authorize(formData.password, formData.email)
        .then((data) => {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate("/mesto");
        })
        .catch(err => {
            console.log(err);
            setImageToolTip(somethingWrong);
            setIsFailed(true);
        });
    }

    function handleRegistration(formData) {
        auth.register(formData.password, formData.email)
        .then((res) => {
            setMessage("Вы успешно зарегистрировались!");
            setImageToolTip(wellDone);
            setIsRegistered(true);
        })
        .catch(err => {
            setMessage(err);
            setImageToolTip(somethingWrong);
            setIsRegistered(true);
        });
    }

    function closeSuccessToolTip() {
        setIsRegistered(false);
        navigate("/sign-in");
    }

    const closeAllPopups = () => {
            setIsEditProfilePopupOpen(false);
            setIsAddPlacePopupOpen(false);
            setIsEditAvatarPopupOpen(false);
            setIsImagePopupOpen(false);
            setIsFailed(false);
            setSelectedCard({});
    }

    React.useEffect(() => {
        const closeByEscape = (e) => {
          if (e.key === 'Escape') {
            closeAllPopups();
          }
        }
  
        document.addEventListener('keydown', closeByEscape)
        
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    function handleUpdateUser(user) {
        api.updateUserInfo(user)
        .then(result => {
            setCurrentUser(result);
            closeAllPopups();
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
    }

    function handleUpdateAvatar(avatar) {
        api.updateAvatar(avatar)
        .then(result => {
            setCurrentUser(result);
            closeAllPopups();
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
    }

    function handleAddPlace(place) {
        api.addNewCard(place)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
    }

    function handleExitButton() {
        setLoggedIn(false);
        setIsEmailVisible(false);
        localStorage.removeItem('jwt');
        navigate("/sign_in");
    }

    function handleMenu() {
        setIsEmailVisible(!isEmailVisible);
    }

  return (
    <Routes>
        <Route path="*" element={
            loggedIn ? <Navigate to="/mesto" /> : <Navigate to="/sign-in" />
        } />
        <Route path="/mesto" element={
            <ProtectedRoute loggedIn={loggedIn}>
                <CurrentUserContext.Provider value={currentUser}>
                    <div>
                        <Header 
                            text="Выйти" 
                            onClick={handleExitButton} 
                            email={email}
                            color="grey"
                            isOpen={isEmailVisible}
                        >
                            <button 
                                type="button" 
                                className={`header__menu ${isEmailVisible ? "header__menu_close" : ""}`} 
                                onClick={handleMenu} />
                        </Header>
                        <Main 
                            onEditAvatar={handleEditAvatarClick} 
                            onEditProfile={handleEditProfileClick} 
                            onAddPlace={handleAddPlaceClick} 
                            onCard={handleCardClick} 
                            cards={cards} 
                            onCardLike={handleCardLike} 
                            onCardDelete={handleCardDelete} 
                        />
                        <Footer />
                        <EditProfilePopup 
                            isOpen={isEditProfilePopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateUser={handleUpdateUser}
                        />
                        <AddPlacePopup 
                            isOpen={isAddPlacePopupOpen} 
                            onClose={closeAllPopups} 
                            onAddPlace={handleAddPlace} 
                        />
                        <PopupWithForm 
                            name="delete-card" 
                            title="Вы уверены?" 
                            onClose={closeAllPopups} 
                            buttonText="Да" 
                        />
                        <EditAvatarPopup 
                            isOpen={isEditAvatarPopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateAvatar={handleUpdateAvatar} 
                        />
                        <ImagePopup 
                            onClose={closeAllPopups} 
                            link={selectedCard.link} 
                            name={selectedCard.name} 
                            isOpen={isImagePopupOpen} 
                        />
                    </div>
                </CurrentUserContext.Provider>
            </ProtectedRoute>
        }/>

        <Route path="/sign-up" element={
            <Register 
                onClose={closeSuccessToolTip}
                isOpen={isRegistered}
                handleRegistration={handleRegistration}
                message={message}
                imageToolTip={imageToolTip}
            />
        }/>
        <Route path="/sign-in" element={
            <Login 
                onClose={closeAllPopups}
                isOpen={isFailed}
                handleLogin={handleLogin}
                imageToolTip={imageToolTip}
            />
        }/>
    </Routes>

  );
}

export default App;
