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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state        = {
            news                  : {},
            registered            : false,
            hasError              : false,
            sending               : false,
            title                 : "",
            titleErrorMessage     : [],
            content               : "",
            contentErrorMessage   : [],
            slide                 : false,
            slideErrorMessage     : [],
            categories            : [],
            categoriesOptions     : [
                "foo",
                "bar",
            ],
            categoriesErrorMessage: [],
            image                 : "",
            imageErrorMessage     : [],
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

    handleChange = name => (event, value) => {
        if (name === "slide") {
            this.setState({
                [name]: value,
            });
        } else if (name === "categories") {
            this.setState({
                "categories": [
                    ...this.state.categories,
                    event.target.value,
                ],
            });
        } else {
            this.setState({
                [name]: event.target.value,
            });
        }
    };

    validation() {
        let hasError               = false;
        let categoriesErrorMessage = [];
        let imageErrorMessage      = [];
        let titleErrorMessage      = [];
        let contentErrorMessage    = [];
        let slideErrorMessage      = [];
        if (!this.state.categories) {
            categoriesErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.slide) {
            slideErrorMessage.push("بارگذاری کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.title) {
            titleErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.content) {
            contentErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.imageRef.files[0]) {
            imageErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        this.setState({
            hasError,
            categoriesErrorMessage,
            imageErrorMessage,
            titleErrorMessage,
            contentErrorMessage,
            slideErrorMessage,
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
        formData.append("title", this.state.title);
        formData.append("content", this.state.content);
        formData.append("slide", this.state.slide);
        formData.append("category", this.state.categoires);
        formData.append("image", this.imageRef.files[0]);
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + `/api/news/${this.props.match.params.id}`, {
            method : "PUT",
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

    componentDidMount() {
        fetch(`${BASE_URL}/api/news/${this.props.match.params.id}`, {
            method : "GET",
            headers: {
                "Accept": "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                news: jsonData,
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
                                                        name="title"
                                                        error={!!this.state.titleErrorMessage.length}
                                                        label="عنوان را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("title")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.titleErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        multiline={true}
                                                        rows="6"
                                                        name="content"
                                                        error={!!this.state.contentErrorMessage.length}
                                                        label="متن را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("content")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.contentErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <Autocomplete
                                                        options={this.state.categoriesOptions}
                                                        fullWidth={true}
                                                        multiple
                                                        name="categories[]"
                                                        onChange={this.handleChange("categories")}
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
                                                                       label="دسته‌بندی را وارد کنید"
                                                                       error={!!this.state.categoriesErrorMessage.length}
                                                            />
                                                        )}
                                                    />
                                                    {this.state.categoriesErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}

                                                </Grid>
                                                <Grid item sm={6}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={this.state.slide}
                                                                name="slide" />
                                                        }
                                                        label="اسلاید"
                                                        onChange={this.handleChange("slide")}
                                                    />
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