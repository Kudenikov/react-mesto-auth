function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__content">
                <button type="button" className="popup__close" onClick={props.onClose} />
                <h2 className="popup__title">{props.title}</h2>
                <form className={`popup__form popup__form_function_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__button" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;