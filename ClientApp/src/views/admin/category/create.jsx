import React from "react";
import RTLContainer from "../../../components/RTLContainer";
import Layout from "./../../layouts/admin";
import {Helmet} from "react-helmet";
import {Button, Card, Container, Grid, TextField, Typography} from "@material-ui/core";
import FormHeader from "../../../components/form/Header";
import FormBody from "../../../components/form/Body";
import {BASE_URL} from "../../../constants/app";
import { Redirect } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state        = {
            registered      : false,
            hasError        : false,
            sending         : false,
            name            : "",
            nameErrorMessage: [],
        };
        this.validation   = this.validation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => (event, value) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    validation() {
        let hasError         = false;
        let nameErrorMessage = [];
        if (!this.state.name) {
            nameErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        this.setState({
            hasError,
            nameErrorMessage,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.hasError) {
            return;
        }
        this.setState({
            "sending": true,
        });
        let status;
        let formData      = new FormData();
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        formData.append("name", this.state.name);
        fetch(BASE_URL + "/api/categories", {
            method : "POST",
            body   : formData,
            headers: {
                "Accept"       : "application/json",
                "Authorization": authorization,
            },
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
                }
                if (status === 201) {
                    this.setState({
                        "registered": true,
                    });
                }
            });
    }

    render() {

        if (this.state.registered) {
            return <Redirect to="/admin/categories" />;
        }

        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>ایجاد</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={11} sm={10} md={10} lg={10}>
                            <Card>
                                <FormHeader title={"ایجاد"} />
                                <FormBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <Container component="div" maxWidth="lg">
                                            <Grid container spacing={4}>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="name"
                                                        error={!!this.state.nameErrorMessage.length}
                                                        label="نام را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("name")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.nameErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                            <Button type="submit"
                                                    disabled={this.state.sending}
                                                    onClick={this.validation}
                                                    variant="contained"
                                                    color="secondary"
                                                    className={`mt-5 f-bolder`}>
                                                ثبت اطلاعات
                                            </Button>
                                        </Container>
                                    </form>
                                </FormBody>
                            </Card>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    };
}
