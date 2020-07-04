import { Button, Card, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import FormBody from "../components/form/Body";
import FormHeader from "../components/form/Header";
import RTLContainer from "../components/RTLContainer";
import { BASE_URL } from "../constants/app";
import Layout from "./layouts/app";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false,
            sending: false,
            hasError: false,
            licenseType: "",
            licenseTypeErrorMessage: [],
            costs: [],
            cost: "۰",
            licenses: []
        };
        this.validation = this.validation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`${BASE_URL}/api/licenses`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            var cost, val;
            var name = this.props.match.params.type;
            jsonData.map(function (item) {
                if (item.name == name) {
                    cost = item.cost
                    val = item.id
                }
            })
            this.setState({
                costs: jsonData,
                cost: cost,
                licenseType: val
            });
        });
    }

    handleChange = () => (event, value) => {
        var cost, val;
        this.state.costs.map(function (item) {
            if (item.id == value) {
                cost = item.cost
                val = item.id
            }
        })

        this.setState({
            licenseType: val,
            cost: cost,
        });

    };

    validation() {
        let hasError = false;
        let licenseTypeErrorMessage = [];
        if (!this.state.licenseType) {
            licenseTypeErrorMessage.push("لطفا نوع گواهینامه را انتخاب نمایید");
            hasError = true;
        }
        this.setState({
            licenseTypeErrorMessage,
            hasError,
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
        let formData = new FormData();
        formData.append("license_id", this.state.licenseType);
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + "/api/payments", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
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

        if (!this.props.isAuthorized && !localStorage.getItem("access_token")) {
            return <Redirect to="/sign-in" />;
        }

        if (this.state.registered) {
            return <Redirect to="/home" />;
        }

        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>پرداخت شهریه</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={7}>
                            <Card>
                                <FormHeader title={"پرداخت شهریه"} />
                                <FormBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <Container component="div" maxWidth="md">
                                            <Grid container spacing={4}>
                                                <Grid item sm={7}>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend"
                                                            error={!!this.state.licenseTypeErrorMessage.length}
                                                            className={`mb-4`}>
                                                            نوع گواهینامه را انتخاب نمایید
                                                        </FormLabel>
                                                        <RadioGroup aria-label="license_type"
                                                            value={this.state.licenseType}
                                                            error={this.state.licenseTypeErrorMessage.length ? "true" : "false"}
                                                            name="licenseType"
                                                            onChange={this.handleChange()}>
                                                            {this.state.costs.map(function (item,key) {
                                                                return (
                                                                    <FormControlLabel
                                                                        key={key}
                                                                        value={item.id}
                                                                        control={<Radio />}
                                                                        label={item.name} />
                                                                )
                                                            })}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item sm={3}>
                                                    <div style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        textAlign: "-webkit-center",
                                                        marginTop: 30,
                                                    }}>
                                                        <Typography className={`f-small f-normal`}>مبلغ قابل
                                                                                                   پرداخت:</Typography>
                                                        <Typography className={`f-large f-bold mt-1`}>
                                                            {this.state.cost.toString().Delimiter().DigitsToFarsi()} تومان
                                                        </Typography>
                                                        <Button type="submit"
                                                            disabled={this.state.sending}
                                                            onClick={this.validation}
                                                            size={"large"}
                                                            fullWidth={true}
                                                            variant="contained"
                                                            color="secondary"
                                                            startIcon={<AddShoppingCartIcon />}
                                                            className={`mt-3 f-bolder`}>
                                                            پرداخت
                                                        </Button>
                                                    </div>
                                                </Grid>
                                                {this.state.licenseTypeErrorMessage.map(message => (
                                                    <Typography key={Math.random()}
                                                        className={`error-message f-small`}>{message}</Typography>
                                                ))}
                                            </Grid>
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

function mapStateToProps(state) {
    return {
        isAuthorized: state.isAuthorized,
    };
}

export default connect(mapStateToProps)(App);