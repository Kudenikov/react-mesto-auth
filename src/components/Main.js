import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container" onClick = {props.onEditAvatar}>    
                    <img className="profile__avatar" alt="Аватар пользователя" src={currentUser.avatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button 
                            type="button" 
                            className="profile__edit-button" 
                            aria-label="Редактировать профиль" 
                            onClick = {props.onEditProfile}
                        />
                    </div>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick = {props.onAddPlace} />
            </section>
            <section className="cards">
                { props.cards.map(card => (
                    <Card {...card} 
                        key={card._id} 
                        onCardClick={props.onCard} 
                        item={card} 
                        onCardLike={props.onCardLike} 
                        onCardDelete={props.onCardDelete} 
                    />
                    )) }
            </section>
        </main>
    );
}

export default Main;