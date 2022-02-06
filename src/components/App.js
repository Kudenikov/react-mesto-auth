import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInitialCards()
        .then(setCards)
        .catch(error => 
            console.log('ОШИБКА:', error))
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(
            setCards((state) => state.filter((item) => 
                item._id !== card._id
            )
            ))
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

    const closeAllPopups = () => {
            setIsEditProfilePopupOpen(false);
            setIsAddPlacePopupOpen(false);
            setIsEditAvatarPopupOpen(false);
            setIsImagePopupOpen(false);
            setSelectedCard({});
    }

    function handleUpdateUser(user) {
        api.updateUserInfo(user)
        .then(result => {
            setCurrentUser(result);
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
        .finally(closeAllPopups())
    }

    function handleUpdateAvatar(avatar) {
        api.updateAvatar(avatar)
        .then(result => {
            setCurrentUser(result);
            closeAllPopups();
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
        .finally(closeAllPopups())
    }

    function handleAddPlace(place) {
        api.addNewCard(place)
        .then(newCard => {
            setCards([newCard, ...cards]); 
        })
        .catch(error => 
            console.log('ОШИБКА:', error))
        .finally(closeAllPopups())
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div>
            <Header />
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
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
            <PopupWithForm name="delete-card" title="Вы уверены?" onClose={closeAllPopups} buttonText="Да" />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <ImagePopup onClose={closeAllPopups} link={selectedCard.link} name={selectedCard.name} isOpen={isImagePopupOpen} />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
