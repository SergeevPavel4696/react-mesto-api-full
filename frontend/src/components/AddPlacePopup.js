import PopupWithForm from "./PopupWithForm.js";
import {useEffect, useState} from "react";

export default function AddPlacePopup(props) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [isValidName, setIsValidName] = useState(false);
    const [isValidLink, setIsValidLink] = useState(false);
    const [validNameError, setValidNameError] = useState("");
    const [validLinkError, setValidLinkError] = useState("");
    const [formButtonText, setFormButtonText] = useState("Создать");

    useEffect(() => {
        setName("");
        setLink("");
        setIsValidName(false);
        setIsValidLink(false);
        setValidNameError("");
        setValidLinkError("");
    }, [props.isOpen]);

    function handleChangeName(evt) {
        setIsValidName(evt.target.validity.valid);
        setValidNameError(evt.target.validationMessage);
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setIsValidLink(evt.target.validity.valid);
        setValidLinkError(evt.target.validationMessage);
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({name, link}, formButtonText, "Отправка...", setFormButtonText);
    }

    return (
        <PopupWithForm
            popupType={"add"}
            height={"two"}
            popupTitle={"Новое место"}
            buttonType={"submit"}
            disabled={isValidName && isValidLink}
            formButtonText={formButtonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field-label">
                <input className="form__field form__field_input_card-name"
                       type="text"
                       name="name"
                       id="card-name"
                       placeholder="Название"
                       minLength="2"
                       maxLength="30"
                       value={name || ""}
                       onChange={handleChangeName}
                       required
                />
                <span className={`form__field-error card-name-error ${!isValidName && "form__field-error_active"}`}
                      id="card-name-error"
                >
                    {validNameError}
                </span>
            </label>
            <label className="form__field-label">
                <input className="form__field form__field_input_link"
                       type="url"
                       name="link"
                       id="card-link"
                       placeholder="Ссылка на картинку"
                       value={link || ""}
                       onChange={handleChangeLink}
                       required/>
                <span className={`form__field-error card-link-error ${!isValidLink && "form__field-error_active"}`}
                      id="card-link-error"
                >
                    {validLinkError}
                </span>
            </label>
        </PopupWithForm>
    )
}
