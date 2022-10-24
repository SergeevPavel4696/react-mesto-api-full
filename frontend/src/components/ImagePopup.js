function ImagePopup(props) {
    return (
        <div className={`popup popup_image ${props.card.name && "popup_opened"}`}>
            <div className="popup__content popup__content_image">
                <img className="popup__image"
                     src={props.card.link}
                     alt={props.card.name}
                />
                <button className="popup__close"
                        type="button"
                        onClick={props.onClose}
                />
            </div>
            <p className="popup__image-title">{props.card.name}</p>
        </div>
    )
}

export default ImagePopup;
