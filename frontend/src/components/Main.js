import pencil from "../images/pencil.svg";
import Card from "./Card.js";
import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-image"
                         src={currentUser.avatar}
                         alt="Аватар"
                    />
                    <img className="profile__avatar-edit"
                         src={pencil}
                         alt="Карандаш"
                         onClick={props.onEditAvatarClick}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-name">
                        {currentUser.name}
                    </h1>
                    <button className="profile__info-button"
                            type="button"
                            onClick={props.onEditProfileClick}
                    />
                    <p className="profile__info-about-myself">
                        {currentUser.about}
                    </p>
                </div>
                <button className="profile__add"
                        type="button"
                        onClick={props.onAddPlaceClick}
                />
            </section>
            <section className="cards">
                {
                    props.cards.map(card => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))
                }
            </section>
        </main>
    );
}
