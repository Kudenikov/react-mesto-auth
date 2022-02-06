import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {

    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
          });
        nameRef.current.value = '';
        linkRef.current.value = '';
      }

    React.useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm 
            name="add-card" 
            title="Новое место" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            buttonText="Сохранить" 
            onSubmit={handleSubmit}
        >
            <input 
                id="place-input" 
                type="text" 
                className="popup__input" 
                name="place-name" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30" 
                ref={nameRef} 
            />
            <span className="place-input-error popup__input-error"></span>
            <input 
                id="link-input" 
                className="popup__input" 
                name="image-link" 
                placeholder="Ссылка на картинку" 
                required type="url" 
                ref={linkRef} 
            />
            <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;