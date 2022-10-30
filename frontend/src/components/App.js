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
            .then(res => {
                    setCurrentUser(res);
                }
            )
            .catch(err => {
                console.log(err);
            }), buttonText, buttonTextInProcess, setButtonText);
    }

    function handleUpdateAvatar(avatar, buttonText, buttonTextInProcess, setButtonText) {
        handleResponse(api.updateUserAvatar(avatar)
            .then(res => {
                    setCurrentUser(res);
                }
            )
            .catch(err => {
                console.log(err);
            }), buttonText, buttonTextInProcess, setButtonText);
    }

    function handleLikeCard(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.toggleLike(card._id, isLiked)
            .then(newCard => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            });

    }

    function handleDeleteCard(id) {
        api.deleteCard(id)
            .then(
                setCards(state => state.filter(c => c._id !== id))
            )
            .catch(err => {
                console.log(err);
            });
    }

    function handleAddPlace(card, buttonText, buttonTextInProcess, setButtonText) {
        handleResponse(api.addCard(card)
            .then(newCard => {
                    setCards([newCard, ...cards]);
                }
            )
            .catch(err => {
                console.log(err);
            }), buttonText, buttonTextInProcess, setButtonText);
    }

    function handleTokenCheck() {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            auth.checkToken(token)
                .then(response => {
                    if (response.data) {
                        setUserEmail(response.data.email);
                        setLoggedIn(true);
                        history.push("/react-mesto-auth");
                    }
                })
                .catch(() => {
                    setUserEmail("");
                    setLoggedIn(false);
                    history.push("/react-mesto-auth/sign-in");
                });
        }
    }

    function handleSignText() {
        if (window.location.pathname === "/react-mesto-auth/sign-in") {
            setSignText("Регистрация")
        } else if (window.location.pathname === "/react-mesto-auth/sign-up") {
            setSignText("Вход")
        } else {
            setSignText("Выйти")
        }
    }

    function onRegister({email, password}) {
        auth.register(email, password)
            .then(response => {
                if (response.data) {
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
            .then(response => {
                if (response.token) {
                    localStorage.setItem("token", response.token);
                    setLoggedIn(true);
                    handleTokenCheck();
                    history.push('/react-mesto-auth');
                }
            })
            .catch(err => console.log(err));
    }

    function handleSign() {
        localStorage.removeItem("token")
        setLoggedIn(false);
        setUserEmail("");
        if (window.location.pathname === "/react-mesto-auth/sign-in") {
            history.push("/react-mesto-auth/sign-up");
        } else {
            history.push("/react-mesto-auth/sign-in");
        }
    }

    function closeLoadSignPopup() {
        setIsLoadSign(false);
        history.push('/react-mesto-auth/sign-in');
    }


    useEffect(() => {
        Promise.all([api.initializeProfile(), api.initialCards()])
            .then(([info, cards]) => {
                setCurrentUser(info);
                setCards(cards);
            })
            .catch(err => {
                console.log(err);
            });
    }, [setCurrentUser])

    useEffect(() => {
        handleTokenCheck();
        // eslint-disable-next-line
    }, []);

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
                <Route path="/react-mesto-auth/sign-in">
                    <Login onLogin={onLogin}/>
                </Route>
                <Route path="/react-mesto-auth/sign-up">
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
