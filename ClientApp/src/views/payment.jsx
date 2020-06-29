import React from "react";
import {
    Button,
    Card,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import FormHeader from "../components/form/Header";
import FormBody from "../components/form/Body";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Helmet} from "react-helmet";
import { BASE_URL } from "../constants/app";

export default class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state        = {
            isAuthorized           : false,
            sending                : false,
            hasError               : false,
            licenseType            : this.props.match.params.type ? this.props.match.params.type : "",
            licenseTypeErrorMessage: [],
            costs                  : {},
            cost                   : "۰",
            licenses               : []
        };
        this.validation   = this.validation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`${BASE_URL}/api/licenses/cost`, {
            method : "GET",
            headers: {
                "Accept" : "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                costs : jsonData,
                cost : jsonData[this.props.match.params.type] ? jsonData[this.props.match.params.type] : "۰",
            });
        });
    }

    handleChange = name => (event, value) => {
        this.setState({
            [name]: value,
            cost  : this.state.costs[value],
        });
    };

    validation() {
        let hasError                = false;
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
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>پرداخت شهریه</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={6}>
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
                                                                    onChange={this.handleChange("licenseType")}>
                                                            <FormControlLabel value="پایه 1" control={<Radio />}
                                                                              label="پایه 1" />
                                                            <FormControlLabel value="پایه 2" control={<Radio />}
                                                                              label="پایه 2" />
                                                            <FormControlLabel value="پایه 3" control={<Radio />}
                                                                              label="پایه 3" />
                                                            <FormControlLabel value="موتورسیکلت" control={<Radio />}
                                                                              label="موتورسیکلت" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item sm={3}>
                                                    <div style={{
                                                        justifyContent: "center",
                                                        alignItems    : "center",
                                                        textAlign     : "-webkit-center",
                                                        marginTop     : 30,
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