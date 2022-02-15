import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {

    const [newPlace, setNewPlace] = React.useState({
        placeName: '',
        placeLink: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!newPlace.placeName || !newPlace.placeLink) {
            return;
        }
        props.onAddPlace({
            name: newPlace.placeName,
            link: newPlace.placeLink
        })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewPlace({
            ...newPlace,
          [name]: value
        });
    }

    React.useEffect(() => {
        setNewPlace({ placeName: '', placeLink: '' });
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
                name="placeName" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30" 
                value={newPlace.placeName}
                onChange={handleChange}
            />
            <span className="place-input-error popup__input-error"></span>
            <input 
                id="link-input" 
                className="popup__input" 
                name="placeLink" 
                placeholder="Ссылка на картинку" 
                required type="url" 
                value={newPlace.placeLink}
                onChange={handleChange}
            />
            <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;