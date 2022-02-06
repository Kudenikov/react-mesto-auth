function ImagePopup(props) {
    return (
        <div className={`popup popup_zoom-picture ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__zoom-content">
                <button type="button" className="popup__close" onClick={props.onClose} />
                <img src={props.link} alt={props.name} className="popup__picture" />
                <p className="popup__caption">{props.name}</p>
            </div>
    </div>
    );
}

export default ImagePopup;