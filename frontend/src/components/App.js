import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import {api} from "../utils/API.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import {Route, Switch, useHistory, withRouter} from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import {auth} from "../utils/Auth.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import ok from "../images/ok.svg";
import nook from "../images/no-ok.svg";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [userEmail, setUserEmail] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [signText, setSignText] = useState("Выйти");
    const [isLoadSign, setIsLoadSign] = useState(false);
    const [isLoadSignError, setIsLoadSignError] = useState(false);
    const history = useHistory();

    // const home = "/react-mesto-auth";
    const home = "";

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsLoadSign(false);
    }

    function handleResponse(response, buttonText, buttonTextInProcess, setButtonText) {
        const tempButtonText = buttonText;
        setButtonText(buttonTextInProcess);
        response
            .then(() => {
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
                setButtonText("Произошла ошибка");
            })
            .finally(() => {
                setTimeout(() => {
                    setButtonText(tempButtonText);
                }, 1000);
            });
    }

    function handleUpdateUser(userInfo, buttonText, buttonTextInProcess, setButtonText) {
        handleResponse(api.updateUserInfo(userInfo)
            .then(setCurrentUser)
            .catch(console.log), buttonText, buttonTextInProcess, setButtonText);
    }

    function handleUpdateAvatar(avatar, buttonText, buttonTextInProcess, setButtonText) {
        handleResponse(api.updateUserAvatar(avatar)
            .then(setCurrentUser)
            .catch(console.log), buttonText, buttonTextInProcess, setButtonText);
    }

    function handleLikeCard(card) {
        const isLiked = card.likes.some(userId => userId === currentUser._id);
        api.toggleLike(card._id, isLiked)
            .then(newCard => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(console.log);
    }

    function handleDeleteCard(id) {
        api.deleteCard(id)
            .then(setCards(state => state.filter(c => c._id !== id)))
            .catch(console.log);
    }

    function handleAddPlace(card, buttonText, buttonTextInProcess, setButtonText) {
        handleResponse(api.addCard(card)
            .then(newCard => {
                    setCards([newCard, ...cards]);
                }
            )
            .catch(console.log), buttonText, buttonTextInProcess, setButtonText);
    }

    function handleTokenCheck() {
        if (localStorage.getItem("token")) {
            auth.checkToken()
                .then(res => {
                    if (res) {
                        setUserEmail(res.email);
                        setLoggedIn(true);
                        history.push(home);
                    }
                })
                .catch(() => {
                    setUserEmail("");
                    setLoggedIn(false);
                    history.push(`${home}/sign-in`);
                });
        }
    }

    function handleSignText() {
        if (window.location.pathname === `${home}/sign-in`) {
            setSignText("Регистрация")
        } else if (window.location.pathname === `${home}/sign-up`) {
            setSignText("Вход")
        } else {
            setSignText("Выйти")
        }
    }

    function onRegister({email, password}) {
        auth.register(email, password)
            .then(res => {
                if (res.data) {
                    setIsLoadSignError(false);
                }
            })
            .catch(err => {
                setIsLoadSignError(true);
                console.log(err)
            })
            .finally(() => {
                setIsLoadSign(true);
            })
    }

    function onLogin({email, password}) {
        auth.authorize(email, password)
            .then(res => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setLoggedIn(true);
                    handleTokenCheck();
                    history.push(home);
                }
            })
            .catch(console.log);
    }

    function handleSign() {
        localStorage.removeItem("token")
        setLoggedIn(false);
        setUserEmail("");
        if (window.location.pathname === `${home}/sign-in`) {
            history.push(`${home}/sign-up`);
        } else {
            history.push(`${home}/sign-in`);
        }
    }

    function closeLoadSignPopup() {
        setIsLoadSign(false);
        history.push(`${home}/sign-in`);
    }


    useEffect(() => {
        Promise.all([api.initializeProfile(), api.initialCards()])
            .then(([info, cards]) => {
                setCurrentUser(info);
                setCards(cards.slice().reverse());
            })
            .catch(console.log);
    }, [setCurrentUser, setCards, setLoggedIn])

    useEffect(() => {
        handleTokenCheck();
        // eslint-disable-next-line
    }, [loggedIn, history]);

    useEffect(() => {
        handleSignText();
    });

    return (
        <Switch>
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    signText={signText}
                    email={userEmail}
                    onSign={handleSign}
                />
                <Route path={`${home}/sign-in`}>
                    <Login onLogin={onLogin}/>
                </Route>
                <Route path={`${home}/sign-up`}>
                    <Register onRegister={onRegister}/>
                    <InfoTooltip
                        isOpen={isLoadSign}
                        popupTitle={isLoadSignError
                            ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}
                        image={isLoadSignError ? nook : ok}
                        onClose={isLoadSignError ? closeAllPopups : closeLoadSignPopup}
                    />
                </Route>
                <ProtectedRoute
                    loggedIn={loggedIn}
                    exact
                >
                    <Main
                        onEditAvatarClick={handleEditAvatarClick}
                        onEditProfileClick={handleEditProfileClick}
                        onAddPlaceClick={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleLikeCard}
                        onCardDelete={handleDeleteCard}
                    />
                    <Footer/>
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlace}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </ProtectedRoute>
            </CurrentUserContext.Provider>
        </Switch>
    );
}

export default withRouter(App);
