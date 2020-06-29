import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {connect} from "react-redux";
import {authorization, setUserInfo} from "../../redux/actions";
import {BASE_URL} from "../../constants/app";
import {Redirect} from "react-router-dom";
import "../../assets/css/app.css";

const theme = createMuiTheme({
    palette   : {
        primary: {
            main: "#EDEDED",
        },
    },
    typography: {
        fontFamily: "IranSans",
    },
});

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state           = {
            isLogin   : true,
            userMenu  : null,
            myMenu    : null,
            mobileMenu: null,
            right     : false,
            logout    : false,
        };
        this.userMenuOpen    = this.userMenuOpen.bind(this);
        this.userMenuClose   = this.userMenuClose.bind(this);
        this.mobileMenuOpen  = this.mobileMenuOpen.bind(this);
        this.mobileMenuClose = this.mobileMenuClose.bind(this);
        this.handleClick     = this.handleClick.bind(this);
        this.handleClose     = this.handleClose.bind(this);
    }

    userMenuOpen(event) {
        this.setState({
            userMenu: event.currentTarget,
        });
    }

    userMenuClose() {
        this.setState({
            userMenu: null,
        });
    }

    mobileMenuOpen(event) {
        this.setState({
            mobileMenu: event.currentTarget,
        });
    }

    mobileMenuClose() {
        this.setState({
            mobileMenu: null,
        });
    }

    handleClick(event) {
        this.setState({
            myMenu: event.currentTarget,
        });
    }

    handleClose() {
        this.setState({
            myMenu: null,
        });
    }

    toggleDrawer = (side, open) => {
        return event => {
            if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
                return;
            }
            this.setState({...this.state, [side]: open});
        };
    };

    logout() {
        let status;
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + "/api/logout", {
            method : "POST",
            headers: {
                "Accept"       : "application/json",
                "Content-Type" : "application/json",
                "Authorization": authorization,
            },
        })
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(() => {
                if (status === 200) {
                    this.props.authorization({
                        status: "unauthorized",
                    });
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("expires_in");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("token_type");
                    localStorage.removeItem("user");
                    this.props.setUserInfo(null);
                    this.setState({
                        logout  : true,
                        userMenu: null,
                    });
                    window.alertify.set("notifier", "position", "bottom-left");
                    window.alertify.notify(
                        "شما با موفقیت از حساب کاربری خود خارج شدید.",
                        "warning",
                        5,
                    ).dismissOthers();
                    window.alertify.notify(
                        "منتظر بازگشت شما هستیم!",
                        "success",
                        5,
                    );
                }
            });
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Navbar isLogin={this.props.isAuthorized}
                        toggleDrawer={(side, open) => this.toggleDrawer(side, open)}
                        right={this.state.right}
                        userMenu={this.state.userMenu}
                        userMenuOpen={(event) => this.userMenuOpen(event)}
                        userMenuClose={() => this.userMenuClose()}
                        logout={() => this.logout()}
                        mobileMenu={this.state.mobileMenu}
                        mobileMenuOpen={(event) => this.mobileMenuOpen(event)}
                        mobileMenuClose={() => this.mobileMenuClose()}
                        username={this.props.username}
                />
                {
                    this.state.logout &&
                    <Redirect to="/" />
                }
                <div style={{marginTop: 100, marginBottom: 50}}>
                    {this.props.children}
                </div>
                <Footer />
            </ThemeProvider>
        );
    };
}

function mapStateToProps(state) {
    document.Foo = state.user;
    return {
        isAuthorized: state.isAuthorized,
        username    : state.user ? state.user.username : "",
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authorization: response => dispatch(authorization(response)),
        setUserInfo  : response => dispatch(setUserInfo(response)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
