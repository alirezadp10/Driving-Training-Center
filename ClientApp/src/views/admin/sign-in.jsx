import React from "react";
import { BASE_URL } from "../../constants/app";
import Layout from "../../views/layouts/app";
import RTLContainer from "../../components/RTLContainer";
import FormHeader from "../../components/form/Header";
import FormBody from "../../components/form/Body";
import {
    Button, Card, Grid, TextField, Container,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authorization, setUserInfo } from "../../redux/actions";

class Login extends React.Component {
    render() {
        return (
            <RTLContainer>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={10} sm={6} md={4} lg={3}>
                        <Card>
                            <FormHeader title={"ورود"} />
                            <FormBody>
                                <form onSubmit={this.props.onSubmit}>
                                    <Container component="div" maxWidth="lg">
                                        <Grid container spacing={4}>
                                            <Grid item sm={12}>
                                                <TextField
                                                    label="شماره ی ملی خود را وارد کنید"
                                                    name="username"
                                                    fullWidth={true}
                                                    InputProps={{
                                                        className: `f-light`,
                                                    }}
                                                    InputLabelProps={{
                                                        className: `f-light`,
                                                    }}
                                                    error={this.props.usernameError}
                                                    onChange={this.props.onChange("username")}
                                                    variant="outlined"
                                                />
                                                {this.props.usernameErrorMessage.map(message => (
                                                    <p key={Math.random()} className="error-message">{message}</p>
                                                ))}
                                            </Grid>
                                            <Grid item sm={12}>
                                                <TextField
                                                    label="رمز عبور خود را وارد کنید"
                                                    name="password"
                                                    InputProps={{
                                                        className: `f-light`,
                                                    }}
                                                    InputLabelProps={{
                                                        className: `f-light`,
                                                    }}
                                                    autoComplete="new-password"
                                                    fullWidth={true}
                                                    error={this.props.passwordError}
                                                    onChange={this.props.onChange("password")}
                                                    variant="outlined"
                                                    type="password"
                                                />
                                                {this.props.passwordErrorMessage.map(message => (
                                                    <p key={Math.random()} className="error-message">{message}</p>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Container>
                                    <Button type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={this.props.sending}
                                        className="login-btn">
                                        ورود
                                    </Button>
                                </form>
                            </FormBody>
                        </Card>
                    </Grid>
                </Grid>
            </RTLContainer>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameError: false,
            usernameErrorMessage: [],
            password: "",
            passwordError: false,
            passwordErrorMessage: [],
            loginErrorMessage: [],
            sending: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name) {
        return event => this.setState({ [name]: event.target.value });
    }

    validation() {
        let usernameError = false;
        let passwordError = false;
        let usernameErrorMessage = [];
        let passwordErrorMessage = [];
        if (!this.state.username) {
            usernameError = true;
            usernameErrorMessage.push("پر کردن این فیلد ضروری است");
        }
        if (!this.state.password) {
            passwordError = true;
            passwordErrorMessage.push("پر کردن این فیلد ضروری است");
        }
        this.setState({
            usernameError,
            passwordError,
            usernameErrorMessage,
            passwordErrorMessage,
        });
        return usernameError || passwordError;
    }

    handleSubmit(event) {
        this.setState({
            "sending": true,
        });
        event.preventDefault();
        if (this.validation()) {
            return;
        }
        let status;
        let formData      = new FormData();
        formData.append("national_code", this.state.username);
        formData.append("password", this.state.password);
        fetch(BASE_URL + "/api/admin/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body   : formData,
        })
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(jsonData => {
                this.setState({
                    "sending": false,
                });
                if (status === 401) {
                    this.setState({
                        loginErrorMessage: jsonData.errors,
                    });
                }
                if (status === 400) {
                    this.setState({
                        loginErrorMessage: ["مشخصات وارد شده با اطلاعات ما سازگار نیست."],
                    });
                }
                if (status === 200) {
                    localStorage["access_token"] = jsonData.access_token;
                    localStorage["expires_in"] = Math.floor(Date.now() / 1000) + jsonData.expires_in;
                    localStorage["token_type"] = jsonData.token_type;
                    localStorage["user"] = JSON.stringify(jsonData.user);
                    this.props.authorization({
                        status: "authorized",
                    });
                    this.props.setUserInfo(jsonData.user);
                }
            });
    }

    render() {
        if (this.props.isAuthorized && JSON.parse(localStorage.getItem("user")).role) {
            return <Redirect to="/admin" />;
        }

        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>ورود</title>
                </Helmet>
                <Login onSubmit={event => this.handleSubmit(event)}
                    onChange={name => this.handleChange(name)}
                    usernameError={this.state.usernameError}
                    usernameErrorMessage={this.state.usernameErrorMessage}
                    passwordError={this.state.passwordError}
                    passwordErrorMessage={this.state.passwordErrorMessage}
                    LoginErrorMessage={this.state.loginErrorMessage}
                    sending={this.state.sending}
                />
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthorized: state.isAuthorized,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authorization: response => dispatch(authorization(response)),
        setUserInfo: response => dispatch(setUserInfo(response)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
