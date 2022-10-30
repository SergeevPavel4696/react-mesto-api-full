import {Route, Redirect} from "react-router-dom";

function ProtectedRoute(props) {
    return (
        <Route>
            {() => props.loggedIn ? props.children : <Redirect to="/react-mesto-auth/sign-in"/>}
        </Route>
    )
}

export default ProtectedRoute;
