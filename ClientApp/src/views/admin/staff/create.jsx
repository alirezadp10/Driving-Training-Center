import React from "react";
import {BASE_URL} from "../../../constants/app";
import Layout from "../../../views/layouts/admin";
import RTLContainer from "../../../components/RTLContainer";
import FormHeader from "../../../components/form/Header";
import FormBody from "../../../components/form/Body";
import {
    Button,
    Card,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import {Helmet} from "react-helmet";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ReactCrop from "react-image-crop";
import jMoment from "moment-jalaali";
import moment from "moment";
import JalaliUtils from "@date-io/jalaali";
import "react-image-crop/lib/ReactCrop.scss";
import { Redirect } from "react-router-dom";

jMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true});

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state        = {
            registered              : false,
            hasError                : false,
            sending                 : false,
            birthdate               : moment().format("YYYY-MM-DD").FarsiToDigits(),
            firstName               : "",
            firstNameErrorMessage   : [],
            lastName                : "",
            lastNameErrorMessage    : [],
            sex                     : "",
            sexErrorMessage         : [],
            salary                  : "",
            salaryErrorMessage      : [],
            role                    : "",
            roleErrorMessage        : [],
            phone                   : "",
            phoneErrorMessage       : [],
            nationalCode            : "",
            nationalCodeErrorMessage: [],
            imageCrop               : {
                unit  : "%",
                width : 80,
                height: 80,
                x     : 10,
                y     : 10,
            },
            image                   : null,
            imageErrorMessage       : [],
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
        if (name == "birthdate") {
            this.setState({
                [name]: event.format("YYYY-MM-DD").FarsiToDigits(),
            });
            return;
        }

        this.setState({
            [name]: event.target.value,
        });
    };

    validation() {
        let hasError                 = false;
        let firstNameErrorMessage    = [];
        let lastNameErrorMessage     = [];
        let nationalCodeErrorMessage = [];
        let phoneErrorMessage        = [];
        let sexErrorMessage          = [];
        let roleErrorMessage         = [];
        let salaryErrorMessage       = [];
        let imageErrorMessage        = [];
        if (!this.state.firstName) {
            firstNameErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.lastName) {
            lastNameErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.nationalCode) {
            nationalCodeErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.phone) {
            phoneErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.sex) {
            sexErrorMessage.push("انتخاب کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.role) {
            roleErrorMessage.push("انتخاب کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.imageRef.files[0]) {
            imageErrorMessage.push("بارگذاری کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.salary) {
            salaryErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        this.setState({
            hasError,
            sexErrorMessage,
            firstNameErrorMessage,
            lastNameErrorMessage,
            nationalCodeErrorMessage,
            phoneErrorMessage,
            roleErrorMessage,
            salaryErrorMessage,
            imageErrorMessage,
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
        formData.append("password", this.state.password);
        formData.append("first_name", this.state.firstName);
        formData.append("last_name", this.state.lastName);
        formData.append("gender", this.state.sex);
        formData.append("national_code", this.state.nationalCode);
        formData.append("birthdate", this.state.birthdate);
        formData.append("phone", this.state.phone);
        formData.append("salary", this.state.salary);
        formData.append("role", this.state.role);
        formData.append("image", this.imageRef.files[0]);
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + "/api/staffs", {
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
            return <Redirect to="/admin/staffs" />;
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
                                                        name="firstName"
                                                        error={!!this.state.firstNameErrorMessage.length}
                                                        label="نام را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("firstName")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.firstNameErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="lastName"
                                                        error={!!this.state.lastNameErrorMessage.length}
                                                        label="نام خانوادگی را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("lastName")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.lastNameErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <FormControl fullWidth={true}
                                                                 variant="outlined">
                                                        <InputLabel
                                                            error={!!this.state.sexErrorMessage.length}
                                                            classes={{
                                                                root: `f-light`,
                                                            }}>جنسیت را انتخاب کنید</InputLabel>
                                                        <Select
                                                            error={!!this.state.sexErrorMessage.length}
                                                            value={this.state.sex}
                                                            onChange={this.handleChange("sex")}
                                                            classes={{
                                                                root: `f-light`,
                                                            }}>
                                                            <MenuItem value={"male"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>مرد</MenuItem>
                                                            <MenuItem value={"female"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>زن</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {this.state.sexErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="nationalCode"
                                                        error={!!this.state.nationalCodeErrorMessage.length}
                                                        label="شماره ملی را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("nationalCode")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.nationalCodeErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                                                        <DatePicker
                                                            InputProps={{
                                                                className: `f-light`,
                                                            }}
                                                            // type="date"
                                                            format={"jYYYY-jMM-jDD"}
                                                            label="تاریخ تولد"
                                                            inputVariant="outlined"
                                                            okLabel="تأیید"
                                                            cancelLabel="لغو"
                                                            clearLabel="پاک کردن"
                                                            // labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                                            value={this.state.birthdate}
                                                            fullWidth={true}
                                                            onChange={this.handleChange("birthdate")}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="role"
                                                        error={!!this.state.roleErrorMessage.length}
                                                        label="سمت را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("role")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.roleErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="phone"
                                                        error={!!this.state.phoneErrorMessage.length}
                                                        label="شماره موبایل را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("phone")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.phoneErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="salary"
                                                        error={!!this.state.salaryErrorMessage.length}
                                                        label="حقوق را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("salary")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.salaryErrorMessage.map(message => (
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
                                                    {this.state.image && (
                                                        <ReactCrop
                                                            style={{marginTop: 10}}
                                                            src={this.state.image}
                                                            crop={this.state.imageCrop}
                                                            ruleOfThirds
                                                            onChange={(imageCrop) => this.setState({imageCrop})}
                                                        />
                                                    )}
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