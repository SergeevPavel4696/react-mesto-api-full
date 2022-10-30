import {useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [validEmailError, setValidEmailError] = useState("");
    const [validPasswordError, setValidPasswordError] = useState("");

    useEffect(() => {
        setEmail("");
        setPassword("");
        setIsValidEmail(false);
        setIsValidPassword(false);
        setValidEmailError("");
        setValidPasswordError("");
    }, []);

    function handleChangeEmail(evt) {
        setIsValidEmail(evt.target.validity.valid);
        setValidEmailError(evt.target.validationMessage);
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setIsValidPassword(evt.target.validity.valid);
        setValidPasswordError(evt.target.validationMessage);
        setPassword(evt.target.value);
    }

    function onSubmit(evt) {
        evt.preventDefault();
        props.onLogin({email, password});
    }

    return (
        <form className="form form_sign" onSubmit={onSubmit} noValidate id="login">
            <h3 className="form__title form__title_sign">
                Вход
            </h3>
            <label className="form__field-label">
                <input className="form__field form__field_sign"
                       type="email"
                       placeholder="Email"
                       value={email}
                       onChange={handleChangeEmail}
                       required
                />
                <span className={`form__field-error form__field-error_sign 
                ${!isValidEmail && "form__field-error_active"}`}>
                    {validEmailError}
                </span>
            </label>
            <label className="form__field-label form__field-label_sign">
                <input className="form__field form__field_sign"
                       type="password"
                       placeholder="Пароль"
                       value={password}
                       onChange={handleChangePassword}
                       required
                />
                <span className={`form__field-error form__field-error_sign 
                ${!isValidPassword && "form__field-error_active"}`}>
                    {validPasswordError}
                </span>
            </label>
            <button className={`form__save ${isValidEmail && isValidPassword && "form__save_sign-active"} form__save_sign`}
                    type="submit"
                    form="login"
                    disabled={!(isValidEmail && isValidPassword)}
            >
                Войти
            </button>
            <p className="form__switch-login-register">
                Ещё не зарегистрированы?
                <Link className="form__switch-login-register" to="/react-mesto-auth/sign-up"> Регистрация</Link>
            </p>
        </form>
    );
}

export default withRouter(Login);
