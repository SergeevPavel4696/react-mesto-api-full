import {Route, Redirect} from "react-router-dom";
// const home = "/react-mesto-auth";
const home = "";

function ProtectedRoute(props) {
    return (
        <Route>
            {() => props.loggedIn ? props.children : <Redirect to={`${home}/sign-in`}/>}
        </Route>
    )
}

export default ProtectedRoute;
