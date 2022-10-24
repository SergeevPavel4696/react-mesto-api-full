import headerLogo from "../images/header__logo.svg";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo"
                 src={headerLogo}
                 alt="Логотип"
            />
            <p className="header__sign header__sign_email">
                {props.email}
            </p>
            <button className="header__sign"
                    onClick={props.onSign}
            >
                {props.signText}
            </button>
        </header>
    );
}

export default Header;
