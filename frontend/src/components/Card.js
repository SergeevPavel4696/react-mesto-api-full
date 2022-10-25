import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const like = props.card.likes.some(user => user._id === currentUser._id) && "card__like_active";

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card._id);
    }

    return (
        <article className="card">
            <img className="card__image"
                 src={props.card.link}
                 alt={props.card.name}
                 onClick={() => {
                     props.onCardClick(props.card)
                 }}
            />
            {currentUser._id === props.card.owner._id &&
                <button className="card__trash"
                        onClick={handleDeleteClick}
                        type="button"
                />
            }
            <h2 className="card__title">
                {props.card.name}
            </h2>
            <button className={`card__like ${props.card.likes.length && "card__like_with-number"} ${like}`}
                    onClick={handleLikeClick}
                    type="button"
            />
            <span className="card__like-number">
                {props.card.likes.length ? props.card.likes.length : ""}
            </span>
        </article>
    );
}
