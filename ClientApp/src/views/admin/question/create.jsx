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
            examsList                : [],
            exam                     : "",
            examErrorMessage         : [],
            registered               : false,
            hasError                 : false,
            sending                  : false,
            title                    : "",
            titleErrorMessage        : [],
            options                  : "",
            optionsErrorMessage      : [],
            correctAnswer            : "",
            correctAnswerErrorMessage: [],
            image                    : "",
            imageErrorMessage        : [],
        };
        this.validation   = this.validation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(`${BASE_URL}/api/theory-exams`, {
            method : "GET",
            headers: {
                "Accept"       : "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                examsList: jsonData,
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

    handleChange = name => (event, value) => {
        if (name === "exam") {
            this.setState({
                "exam": value.title,
            });
        } else if (name === "options") {
            this.setState({
                "options": value,
            });
        } else {
            this.setState({
                [name]: event.target.value,
            });
        }
    };

    validation() {
        let hasError                  = false;
        let imageErrorMessage         = [];
        let titleErrorMessage         = [];
        let optionsErrorMessage       = [];
        let correctAnswerErrorMessage = [];
        let examErrorMessage          = [];
        if (!this.state.correctAnswer) {
            correctAnswerErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.exam) {
            examErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.title) {
            titleErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.options) {
            optionsErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.imageRef.files[0]) {
            imageErrorMessage.push("بارگذاری کردن این فیلد ضروری است");
            hasError = true;
        }
        this.setState({
            hasError,
            imageErrorMessage,
            titleErrorMessage,
            optionsErrorMessage,
            correctAnswerErrorMessage,
            examErrorMessage,
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
        this.state.options.forEach(function (value,key) {
            formData.append(`option[${key}]`, value);            
        })
        formData.append("correct_answer", this.state.correctAnswer);
        formData.append("theory_exam_id", this.state.exam);
        formData.append("image", this.imageRef.files[0]);
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + "/api/questions", {
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
            return <Redirect to="/admin/questions" />;
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
                                                        label="پرسش را وارد کنید"
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
                                                        name="correct_answer"
                                                        error={!!this.state.correctAnswerErrorMessage.length}
                                                        label="پاسخ صحیح را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("correctAnswer")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.correctAnswerErrorMessage.map(message => (
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
                                                        name="options[]"
                                                        onChange={this.handleChange("options")}
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
                                                                       label="گزینه ها را وارد کنید"
                                                                       error={!!this.state.optionsErrorMessage.length}
                                                            />
                                                        )}
                                                    />
                                                    {this.state.optionsErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <Autocomplete
                                                        options={this.state.examsList.map((option) => {
                                                            return {
                                                                title: option.id.toString(),
                                                            };
                                                        })}
                                                        getOptionLabel={(option) => option.title}
                                                        fullWidth={true}
                                                        name="exam[]"
                                                        onChange={this.handleChange("exam")}
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
                                                                       label="امتحان را انتخاب کنید"
                                                                       error={!!this.state.examErrorMessage.length}
                                                            />
                                                        )}
                                                    />
                                                    {this.state.examErrorMessage.map(message => (
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