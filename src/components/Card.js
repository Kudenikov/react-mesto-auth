import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.item);
      }

    function handleLikeClick() {
        props.onCardLike(props.item);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.item);
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.item.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `cards__trash ${!isOwn ? 'cards__trash_hidden' : ''}`
      );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.item.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `cards__heart-pic ${isLiked ? 'cards__heart-pic_like' : ''}`
      );

    return (
        <article className="cards__item">
            <img src={props.link} alt={props.name} className="cards__image" onClick={handleClick} />
            <div className="cards__description">
                <h2 className="cards__place">{props.name}</h2>
                <div className="cards__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <p className="cards__like-counter">{props.likes.length}</p>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
        </article>
    );
  }
  
export default Card;