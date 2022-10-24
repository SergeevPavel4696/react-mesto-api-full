function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.popupType} ${props.isOpen && "popup_opened"}`}>
            <div className={`popup__content popup__content_height_${props.height}-fields`}>
                <form className="form"
                      name={`form-${props.popupType}`}
                      id={`form-${props.popupType}`}
                      onSubmit={props.onSubmit}
                >
                    <h3 className="form__title">
                        {props.popupTitle}
                    </h3>
                    {props.children}
                    <button className={`form__save ${props.disabled && "form__save_active"}`}
                            type={props.buttonType}
                            form={`form-${props.popupType}`}
                            disabled={!props.disabled}
                    >
                        {props.formButtonText}
                    </button>
                </form>
                <button className="popup__close"
                        type="button"
                        onClick={props.onClose}
                />
            </div>
        </div>
    );
}

export default PopupWithForm;
