import React from "react";
import {BASE_URL} from "../../constants/app";
import Layout from "../../views/layouts/app";
import RTLContainer from "../../components/RTLContainer";
import FormHeader from "../../components/form/Header";
import FormBody from "../../components/form/Body";
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
import {Redirect} from "react-router-dom";
import {Helmet} from "react-helmet";
import {authorization, setUserInfo} from "../../redux/actions";
import {connect} from "react-redux";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ReactCrop from "react-image-crop";
import jMoment from "moment-jalaali";
import moment from "moment";
import JalaliUtils from "@date-io/jalaali";
import "react-image-crop/lib/ReactCrop.scss";

jMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state        = {
            registered                       : false,
            hasError                         : false,
            sending                          : false,
            birthdate                        : moment().format('YYYY-MM-DD').FarsiToDigits(),
            bloodType                        : "",
            bloodTypeErrorMessage            : [],
            password                         : "",
            passwordErrorMessage             : [],
            rePassword                       : "",
            rePasswordErrorMessage           : [],
            education                        : "",
            educationErrorMessage            : [],
            firstName                        : "",
            firstNameErrorMessage            : [],
            lastName                         : "",
            lastNameErrorMessage             : [],
            fatherName                       : "",
            fatherNameErrorMessage           : [],
            sex                              : "",
            sexErrorMessage                  : [],
            phone                            : "",
            phoneErrorMessage                : [],
            nationalCode                     : "",
            nationalCodeErrorMessage         : [],
            avatarCrop                       : {
                unit  : "%",
                width : 80,
                height: 80,
                x     : 10,
                y     : 10,
            },
            avatar                           : null,
            avatarErrorMessage               : [],
            nationalCardCrop                 : {
                unit  : "%",
                width : 80,
                height: 80,
                x     : 10,
                y     : 10,
            },
            nationalCardImage                : null,
            nationalCardImageErrorMessage    : [],
            postalCode                       : "",
            postalCodeErrorMessage           : [],
        };
        this.validation   = this.validation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        if(name == "birthdate"){
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
        let hasError                          = false;
        let passwordErrorMessage              = [];
        let rePasswordErrorMessage            = [];
        let firstNameErrorMessage             = [];
        let lastNameErrorMessage              = [];
        let fatherNameErrorMessage            = [];
        let nationalCodeErrorMessage          = [];
        let phoneErrorMessage                 = [];
        let postalCodeErrorMessage            = [];
        let sexErrorMessage                   = [];
        let educationErrorMessage             = [];
        let bloodTypeErrorMessage             = [];
        let nationalCardImageErrorMessage     = [];
        let avatarErrorMessage                = [];
        if (!this.state.firstName) {
            firstNameErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.password) {
            passwordErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.rePassword) {
            rePasswordErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.lastName) {
            lastNameErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.fatherName) {
            fatherNameErrorMessage.push("پر کردن این فیلد ضروری است");
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
        if (!this.state.postalCode) {
            postalCodeErrorMessage.push("پر کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.sex) {
            sexErrorMessage.push("انتخاب کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.education) {
            educationErrorMessage.push("انتخاب کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.state.bloodType) {
            bloodTypeErrorMessage.push("انتخاب کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.nationalCardImageRef.files[0]) {
            nationalCardImageErrorMessage.push("بارگذاری کردن این فیلد ضروری است");
            hasError = true;
        }
        if (!this.avatarRef.files[0]) {
            avatarErrorMessage.push("بارگذاری کردن این فیلد ضروری است");
            hasError = true;
        }
        this.setState({
            hasError,
            sexErrorMessage,
            passwordErrorMessage,
            rePasswordErrorMessage,
            firstNameErrorMessage,
            lastNameErrorMessage,
            fatherNameErrorMessage,
            nationalCodeErrorMessage,
            phoneErrorMessage,
            postalCodeErrorMessage,
            educationErrorMessage,
            bloodTypeErrorMessage,
            nationalCardImageErrorMessage,
            avatarErrorMessage,
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
        formData.append("password", this.state.password);
        formData.append("first_name", this.state.firstName);
        formData.append("last_name", this.state.lastName);
        formData.append("father_name", this.state.fatherName);
        formData.append("gender", this.state.sex);
        formData.append("national_code", this.state.nationalCode);
        formData.append("birthdate", this.state.birthdate);
        formData.append("phone", this.state.phone);
        formData.append("education", this.state.education);
        formData.append("blood_type", this.state.bloodType);
        formData.append("postal_code", this.state.postalCode);
        formData.append("avatar", this.avatarRef.files[0]);
        formData.append("national_card", this.nationalCardImageRef.files[0]);
        fetch(BASE_URL + "/api/applicants", {
            method : "POST",
            body   : formData,
            headers: {
                "Accept"      : "application/json",
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

    onSelectFile = (e, type) => {
        if (e.target.files && e.target.files.length ? true : false > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.setState({[type]: reader.result});
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    render() {
        if (this.state.registered) {
            return <Redirect to={"/sign-in"} />;
        }

        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>ثبت نام</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={8}>
                            <Card>
                                <FormHeader title={"ثبت نام"} />
                                <FormBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <Container component="div" maxWidth="lg">
                                            <Grid container spacing={4}>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="firstName"
                                                        error={!!this.state.firstNameErrorMessage.length}
                                                        label="نام خود را وارد کنید"
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
                                                        label="نام خانوادگی خود را وارد کنید"
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
                                                    <TextField
                                                        name="fatherName"
                                                        error={!!this.state.fatherNameErrorMessage.length}
                                                        label="نام پدر خود را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("fatherName")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.fatherNameErrorMessage.map(message => (
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
                                                            }}>جنسیت خود را انتخاب کنید</InputLabel>
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
                                                        name="phone"
                                                        error={!!this.state.phoneErrorMessage.length}
                                                        label="شماره موبایل خود را وارد کنید"
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
                                                        name="nationalCode"
                                                        error={!!this.state.nationalCodeErrorMessage.length}
                                                        label="شماره ملی خود را وارد کنید"
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
                                                    <FormControl fullWidth={true}
                                                                 variant="outlined"
                                                    >
                                                        <InputLabel error={!!this.state.educationErrorMessage.length}
                                                                    classes={{root: `f-light`}}>تحصیلات خود را انتخاب
                                                                                                کنید</InputLabel>
                                                        <Select error={!!this.state.educationErrorMessage.length}
                                                                value={this.state.education}
                                                                onChange={this.handleChange("education")}
                                                                classes={{
                                                                    root: `f-light`,
                                                                }}
                                                        >
                                                            <MenuItem value={"uDiploma"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>زیر دیپلم</MenuItem>
                                                            <MenuItem value={"diploma"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>دیپلم</MenuItem>
                                                            <MenuItem value={"oDiploma"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>کاردانی</MenuItem>
                                                            <MenuItem value={"bachelor"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>کارشناسی</MenuItem>
                                                            <MenuItem value={"ma"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>کارشناسی ارشد</MenuItem>
                                                            <MenuItem value={"phdAndOver"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>دکتری و بالاتر</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {this.state.educationErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <FormControl fullWidth={true} variant="outlined">
                                                        <InputLabel error={!!this.state.bloodTypeErrorMessage.length}
                                                                    classes={{
                                                                        root: `f-light`,
                                                                    }}>گروه خونی خود را انتخاب کنید</InputLabel>
                                                        <Select error={!!this.state.bloodTypeErrorMessage.length}
                                                                value={this.state.bloodType}
                                                                onChange={this.handleChange("bloodType")}
                                                                classes={{
                                                                    root: `f-light`,
                                                                }}>
                                                            <MenuItem value={"A+"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>A+</MenuItem>
                                                            <MenuItem value={"A-"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>A-</MenuItem>
                                                            <MenuItem value={"B+"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>B+</MenuItem>
                                                            <MenuItem value={"B-"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>B-</MenuItem>
                                                            <MenuItem value={"AB-"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>AB-</MenuItem>
                                                            <MenuItem value={"AB+"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>AB+</MenuItem>
                                                            <MenuItem value={"O+"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>O+</MenuItem>
                                                            <MenuItem value={"O-"} style={{
                                                                justifyContent: "flex-end",

                                                            }}>O-</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    {this.state.bloodTypeErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="postalCode"
                                                        error={!!this.state.postalCodeErrorMessage.length}
                                                        label="کد پستی خود را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("postalCode")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.postalCodeErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="password"
                                                        error={!!this.state.passwordErrorMessage.length}
                                                        label="رمز عبور خود را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("password")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.passwordErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField
                                                        name="rePassword"
                                                        error={!!this.state.rePasswordErrorMessage.length}
                                                        label="تکرار رمز عبور خود را وارد کنید"
                                                        fullWidth={true}
                                                        onChange={this.handleChange("rePassword")}
                                                        variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.rePasswordErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <input type="file"
                                                           ref={(ref) => {
                                                               this.avatarRef = ref;
                                                           }}
                                                           accept="image/*"
                                                           onChange={(event => this.onSelectFile(event, "avatar"))}
                                                           hidden={true} />
                                                    <TextField
                                                        name="avatarImage"
                                                        disabled
                                                        error={!!this.state.avatarErrorMessage.length}
                                                        label="تصویر خود را بارگذاری کنید"
                                                        fullWidth={true}
                                                        onClick={() => {
                                                            this.avatarRef.click();
                                                        }} variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.avatar && (
                                                        <ReactCrop
                                                            style={{marginTop: 10}}
                                                            src={this.state.avatar}
                                                            crop={this.state.avatarCrop}
                                                            ruleOfThirds
                                                            onChange={(avatarCrop) => this.setState({avatarCrop})}
                                                        />
                                                    )}
                                                    {this.state.avatarErrorMessage.map(message => (
                                                        <Typography key={Math.random()}
                                                                    className={`error-message f-smaller`}>{message}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <input type="file"
                                                           ref={(ref) => {
                                                               this.nationalCardImageRef = ref;
                                                           }}
                                                           accept="image/*"
                                                           onChange={(event => this.onSelectFile(event, "nationalCardImage"))}
                                                           hidden={true} />
                                                    <TextField
                                                        name="nationalCardImage"
                                                        disabled
                                                        error={!!this.state.nationalCardImageErrorMessage.length}
                                                        label="تصویر کارت ملی خود را بارگذاری کنید"
                                                        fullWidth={true}
                                                        onClick={() => {
                                                            this.nationalCardImageRef.click();
                                                        }} variant="outlined"
                                                        InputProps={{
                                                            className: `f-light`,
                                                        }}
                                                        InputLabelProps={{
                                                            className: `f-light`,
                                                        }}
                                                    />
                                                    {this.state.nationalCardImage && (
                                                        <ReactCrop
                                                            style={{marginTop: 10}}
                                                            src={this.state.nationalCardImage}
                                                            crop={this.state.nationalCardCrop}
                                                            ruleOfThirds
                                                            onChange={(nationalCardCrop) => this.setState({nationalCardCrop})}
                                                        />
                                                    )}
                                                    {this.state.nationalCardImageErrorMessage.map(message => (
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
        setUserInfo  : response => dispatch(setUserInfo(response)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
