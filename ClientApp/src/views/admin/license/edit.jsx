import React from "react";
import RTLContainer from "../../../components/RTLContainer";
import Layout from "./../../layouts/admin";
import {Helmet} from "react-helmet";
import {Button, Card, Container, Grid, TextField, Typography} from "@material-ui/core";
import FormHeader from "../../../components/form/Header";
import FormBody from "../../../components/form/Body";
import {BASE_URL} from "../../../constants/app";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state        = {
            license              : {},
            registered           : false,
            hasError             : false,
            sending              : false,
            name                 : "",
            nameErrorMessage     : [],
            cost                 : "",
            costErrorMessage     : [],
            image                : "",
            imageErrorMessage    : [],
            condition            : [],
            conditionErrorMessage: [],
        };
        this.validation   = this.validation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onSelectFile = (e, type) => {
        if (e.target.files && e.target.files.length ? true : false > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.setState({[type]: reader.result});
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    handleChange = name => event => {
        if (event.target.value) {
            if (name === "condition") {
                this.setState({
                    "condition": [
                        ...this.state.condition,
                        event.target.value,
                    ],
                });
            } else {
                this.setState({
                    [name]: event.target.value,
                });
            }
        }
    };

    validation() {
        let hasError              = false;
        let conditionErrorMessage = [];
        let imageErrorMessage     = [];
        let costErrorMessage      = [];
        let nameErrorMessage      = [];
        if (!this.state.condition) {
            conditionErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.cost) {
            costErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.name) {
            nameErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.imageRef.files[0]) {
            imageErrorMessage.push("بارگذاری کردن این فیلد ضروری است");
            hasError = true;
        }
        this.setState({
            hasError,
            conditionErrorMessage,
            imageErrorMessage,
            costErrorMessage,
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
        let formData = new FormData();
        formData.append("cost", this.state.cost);
        formData.append("name", this.state.name);
        formData.append("condition", this.state.condition);
        formData.append("image", this.imageRef.files[0]);
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + `/api/licenses/${this.props.match.params.id}`, {
            method : "PUT",
            body   : formData,
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

    componentDidMount() {
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(`${BASE_URL}/api/licenses/${this.props.match.params.id}`, {
            method : "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                license: jsonData,
            });
        });
    }

    render() {
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
                                                        label="عنوان را وارد کنید"
                                                        value={this.state.license.name}
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
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="cost"
                                                        error={!!this.state.costErrorMessage.length}
                                                        label="هزینه را وارد کنید"
                                                        value={this.state.license.cost}
                                                        fullWidth={true}
                                                        onChange={this.handleChange("cost")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.costErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <Autocomplete
                                                        options={[]}
                                                        fullWidth={true}
                                                        freeSolo
                                                        multiple
                                                        name="condition[]"
                                                        defaultValue={this.state.license.conditions}
                                                        onChange={this.handleChange("condition")}
                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip variant="outlined"
                                                                      label={option}
                                                                      {...getTagProps({index})}
                                                                />
                                                            ))
                                                        }
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                       variant="outlined"
                                                                       label="شرایط را وارد کنید"
                                                                       error={!!this.state.conditionErrorMessage.length}
                                                            />
                                                        )}
                                                    />
                                                    {this.state.conditionErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <input type="file"
                                                           ref={(ref) => {
                                                               this.imageRef = ref;
                                                           }}
                                                           accept="image/*"
                                                           onChange={(event => this.onSelectFile(event, "image"))}
                                                           hidden={true} />
                                                    <TextField
                                                        name="image"
                                                        disabled
                                                        error={!!this.state.imageErrorMessage.length}
                                                        label="تصویر را بارگذاری کنید"
                                                        fullWidth={true}
                                                        value={this.imageRef && this.imageRef.files.length ? this.imageRef.files[0].name : ""}
                                                        onClick={() => {
                                                            this.imageRef.click();
                                                        }} variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.imageErrorMessage.map(message => (
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