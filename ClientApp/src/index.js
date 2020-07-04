import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Routes from "./Routes";
import withTracker from "./withTracker";
import "bootstrap/scss/bootstrap.scss";
require("./bootstrap.js");

ReactDOM.render(
    <Provider store={store}>
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
            <Switch>
                {Routes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={withTracker((props) => {
                                return <route.component {...props} />;
                            })}
                        />
                    );
                })}
                <Redirect to="/not-found" />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
