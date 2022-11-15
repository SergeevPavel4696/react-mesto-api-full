import PopupWithForm from "./PopupWithForm.js";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [isValidName, setIsValidName] = useState(true);
    const [isValidAbout, setIsValidAbout] = useState(true);
    const [validNameError, setValidNameError] = useState("");
    const [validAboutError, setValidAboutError] = useState("");
    const [formButtonText, setFormButtonText] = useState("Сохранить");

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
        setIsValidName(true);
        setIsValidAbout(true);
        setValidNameError("");
        setValidAboutError("");
        // eslint-disable-next-line
    }, [props.isOpen]);

    function handleChangeName(evt) {
        setIsValidName(evt.target.validity.valid);
        setValidNameError(evt.target.validationMessage);
        setName(evt.target.value);
    }

    function handleChangeAbout(evt) {
        setIsValidAbout(evt.target.validity.valid);
        setValidAboutError(evt.target.validationMessage);
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({name, about}, formButtonText, "Обновление...", setFormButtonText);
    }

    return (
        <PopupWithForm
            popupType={"profile"}
            height={"two"}
            popupTitle={"Редактировать профиль"}
            buttonType={"submit"}
            disabled={isValidName && isValidAbout}
            formButtonText={formButtonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field-label">
                <input className="form__field form__field_input_name"
                       type="text"
                       name="name"
                       id="name"
                       placeholder="Имя"
                       minLength="2"
                       maxLength="40"
                       value={name || ""}
                       onChange={handleChangeName}
                       required
                />
                <span className={`form__field-error name-error ${!isValidName && "form__field-error_active"}`}
                      id="name-error"
                >
                    {validNameError}
                </span>
            </label>
            <label className="form__field-label">
                <input className="form__field form__field_input_about"
                       type="text"
                       name="about"
                       id="about"
                       placeholder="О себе"
                       minLength="2"
                       maxLength="200"
                       value={about || ""}
                       onChange={handleChangeAbout}
                       required/>
                <span className={`form__field-error about-error ${!isValidAbout && "form__field-error_active"}`}
                      id="about-error"
                >
                    {validAboutError}
                </span>
            </label>
        </PopupWithForm>
    )
}
