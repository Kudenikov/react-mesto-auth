import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm 
            name="change-avatar" 
            title="Обновить аватар" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            buttonText="Сохранить" 
            onSubmit={handleSubmit}
        >
            <input 
                id="avatar-input" 
                type="url" 
                className="popup__input" 
                name="avatar" 
                placeholder="Ссылка на новый аватар" 
                ref={avatarRef} 
                required 
            />
            <span className="avatar-input-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;