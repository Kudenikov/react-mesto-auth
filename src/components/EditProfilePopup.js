import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
          });
    }

    return (
        <PopupWithForm 
            name="profile-edit" 
            title="Редактировать профиль" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            buttonText="Сохранить" 
            onSubmit={handleSubmit}
        >
            <input 
                id="name-input" 
                type="text" 
                className="popup__input" 
                name="profile-name" 
                placeholder="Имя" 
                required 
                minLength="2" 
                maxLength="40" 
                value={name || ''} 
                onChange={handleNameChange} 
            />
            <span className="name-input-error popup__input-error"></span>
            <input 
                id="profession-input" 
                type="text" 
                className="popup__input" 
                name="profile-profession" 
                placeholder="Профессиональная деятельность" 
                required 
                minLength="2" 
                maxLength="200" 
                value={description || ''} 
                onChange={handleDescriptionChange} 
            />
            <span className="profession-input-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;

