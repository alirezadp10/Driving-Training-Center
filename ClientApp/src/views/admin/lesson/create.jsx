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
import { Redirect } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state        = {
            coursesList        : [],
            courses            : [],
            coursesErrorMessage: [],
            registered         : false,
            hasError           : false,
            sending            : false,
            title               : "",
            titleErrorMessage   : [],
            content               : "",
            contentErrorMessage   : [],
            image              : "",
            imageErrorMessage  : [],
        };
        this.validation   = this.validation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(`${BASE_URL}/api/theory-courses`, {
            method : "GET",
            headers: {
                "Accept"       : "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                coursesList: jsonData,
            });
        });
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

    handleChange = name => (event,value) => {
        if(name === "courses"){
            this.setState({
                [name]: value.id,
            });
        }
        else{
            this.setState({
                [name]: event.target.value,
            });
        }
    };

    validation() {
        let hasError          = false;
        let imageErrorMessage = [];
        let contentErrorMessage  = [];
        let titleErrorMessage  = [];
        if (!this.state.content) {
            contentErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.title) {
            titleErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.imageRef.files[0]) {
            imageErrorMessage.push("بارگذاری کردن این فیلد ضروری است");
            hasError = true;
        }
        this.setState({
            hasError,
            imageErrorMessage,
            contentErrorMessage,
            titleErrorMessage,
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
        formData.append("theory_course_id", this.state.courses);
        formData.append("content", this.state.content);
        formData.append("title", this.state.title);
        formData.append("image", this.imageRef.files[0]);
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + "/api/lessons", {
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
            return <Redirect to="/admin/lessons" />;
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
                                                        options={this.state.coursesList.map((v, k) => ({
                                                            title: v.title,
                                                            id   : v.id,
                                                        }))}
                                                        fullWidth={true}
                                                        name="courses"
                                                        getOptionLabel={(option) => option.title}
                                                        onChange={this.handleChange("courses")}
                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip variant="outlined"
                                                                      label={option.title}
                                                                      {...getTagProps({index})}
                                                                />
                                                            ))
                                                        }
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                       variant="outlined"
                                                                       label="دوره را انتخاب کنید"
                                                                       error={!!this.state.coursesErrorMessage.length}
                                                            />
                                                        )}
                                                    />
                                                    {this.state.coursesErrorMessage.map(message => (
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