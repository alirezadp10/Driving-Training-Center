import React from "react";
import Navbar from "./admin/navbar";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {connect} from "react-redux";
import {authorization, setUserInfo} from "../../redux/actions";
import {Redirect} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "../../assets/css/app.css";

const theme = createMuiTheme({
    palette   : {
        primary: {
            main: "#263238",
        },
    },
    typography: {
        fontFamily: "IranSans",
        color     : "white",
    },
});

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state           = {
            isLogin        : true,
            userMenu       : null,
            myMenu         : null,
            mobileMenu     : null,
            right          : false,
            logout         : false,
            snackbarStatus : false,
            snackbarVariant: "",
            snackbarMessage: "",
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
        this.props.authorization({
            status: "unauthorized",
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("token_type");
        localStorage.removeItem("user");
        this.props.setUserInfo(null);
        this.setState({
            logout  : true,
            userMenu: null,
        });
        this.setState({
            snackbarStatus : true,
            snackbarVariant: "warning",
            snackbarMessage: "شما با موفقیت از حساب کاربری خود خارج شدید.",
        });
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({
            snackbarStatus: false,
        });
    };

    render() {
        if (!JSON.parse(localStorage.getItem("user")).role) {
            return <Redirect to="/" />;
        }

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
                <div style={{marginTop: 100, marginBottom: 50, marginRight: 250}}>
                    {this.props.children}
                </div>
                <Snackbar open={this.state.snackbarStatus}
                          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                          autoHideDuration={6000}
                          onClose={this.handleCloseSnackbar}>
                    <MuiAlert elevation={6} variant="filled" severity={this.state.snackbarVariant}>
                        {this.state.snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </ThemeProvider>
        );
    };
}

function mapStateToProps(state) {
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