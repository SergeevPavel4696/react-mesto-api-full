import PopupWithForm from "./PopupWithForm.js";
import {useEffect, useState} from "react";

export default function EditAvatarPopup(props) {
    const [avatar, setAvatar] = useState("");
    const [isValidLink, setIsValidLink] = useState(false);
    const [validLinkError, setValidLinkError] = useState("");
    const [formButtonText, setFormButtonText] = useState("Сохранить");

    useEffect(() => {
        setAvatar("");
        setIsValidLink(false);
        setValidLinkError("");
    }, [props.isOpen]);

    function handleChangeAvatar(evt) {
        setIsValidLink(evt.target.validity.valid);
        setValidLinkError(evt.target.validationMessage);
        setAvatar(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({avatar}, formButtonText, "Сохранение...", setFormButtonText);
    }

    return (
        <PopupWithForm
            popupType={"avatar"}
            height={"one"}
            popupTitle={"Обновить аватар"}
            buttonType={"submit"}
            disabled={isValidLink}
            formButtonText={formButtonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field-label">
                <input className="form__field form__field_input_link"
                       type="url"
                       name="avatar"
                       id="avatar"
                       placeholder="Ссылка на картинку"
                       value={avatar || ""}
                       onChange={handleChangeAvatar}
                       required
                />
                <span className={`form__field-error avatar-error ${!isValidLink && "form__field-error_active"}`}
                      id="avatar-link-error"
                >
                    {validLinkError}
                </span>
            </label>
        </PopupWithForm>
    )
}
