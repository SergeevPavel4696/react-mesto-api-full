function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>
            <div className="popup__content popup__content_height_two-fields">
                <form className="form">
                    <img
                        className="form__load-sign-image"
                        src={props.image}
                        alt="Картинка"
                    />
                    <h3 className="form__title form__title_load-sign">
                        {props.popupTitle}
                    </h3>
                </form>
                <button className="popup__close"
                        type="button"
                        onClick={props.onClose}
                />
            </div>
        </div>
    );
}

export default InfoTooltip;
