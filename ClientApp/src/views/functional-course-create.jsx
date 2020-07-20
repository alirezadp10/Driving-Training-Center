import React from "react";
import { Button, Card, Checkbox, Container, FormControlLabel, Grid, Grow, Paper, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RTLContainer from "../components/RTLContainer";
import Time from "../components/Time";
import TeacherCard from "../components/TeacherCard";
import Layout from "./layouts/app";
import { Helmet } from "react-helmet";
import Alert from "@material-ui/lab/Alert/Alert";
import { Link, Redirect } from "react-router-dom";
import { BASE_URL } from "../constants/app";

const times = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
];

export default class FunctionalCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scheduleId: null,
            tracherId: null,
            sending: false,
            selected: [],
            teachers: [],
            schedules: [],
            tab: false,
            isAuthorized: false,
            sending: false,
            saturday: true,
            saturdayTime: times,
            sunday: true,
            sundayTime: times,
            monday: true,
            mondayTime: times,
            tuesday: true,
            tuesdayTime: times,
            wednesday: true,
            wednesdayTime: times,
        };
        this.timeChange = this.timeChange.bind(this);
        this.backHandle = this.backHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dayChange = name => (event, value) => {
        this.setState({
            [name]: value,
        }, () => this.fetchTeachers());
    };

    timeChange(day, times) {
        this.setState({
            [`${day}Time`]: times,
        }, () => this.fetchTeachers());
    }

    componentDidMount() {
        this.fetchTeachers();
    }

    fetchTeachers() {
        let formData = new FormData();
        formData.append('schedule', []);
        if (this.state.saturday) {
            this.state.saturdayTime.forEach(function (item) {
                formData.append(`schedule[شنبه]`, item)
            });
        }
        if (this.state.sunday) {
            this.state.sundayTime.forEach(function (item) {
                formData.append(`schedule[یکشنبه]`, item)
            });
        }
        if (this.state.monday) {
            this.state.mondayTime.forEach(function (item) {
                formData.append(`schedule[دوشنبه]`, item)
            });
        }
        if (this.state.tuesday) {
            this.state.tuesdayTime.forEach(function (item) {
                formData.append(`schedule[سه‌شنبه]`, item)
            });
        }
        if (this.state.wednesday) {
            this.state.wednesdayTime.forEach(function (item) {
                formData.append(`schedule[چهارشنبه]`, item)
            });
        }
        fetch(`${BASE_URL}/api/schedules/teachers`, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                teachers: jsonData
            })
        });
    }

    backHandle(teacherId) {
        if (teacherId) {
            this.setState({
                teacherId: teacherId,
            });
            let formData = new FormData();
            formData.append('schedule', []);
            if (this.state.saturday) {
                this.state.saturdayTime.forEach(function (item) {
                    formData.append(`schedule[شنبه]`, item)
                });
            }
            if (this.state.sunday) {
                this.state.sundayTime.forEach(function (item) {
                    formData.append(`schedule[یکشنبه]`, item)
                });
            }
            if (this.state.monday) {
                this.state.mondayTime.forEach(function (item) {
                    formData.append(`schedule[دوشنبه]`, item)
                });
            }
            if (this.state.tuesday) {
                this.state.tuesdayTime.forEach(function (item) {
                    formData.append(`schedule[سه‌شنبه]`, item)
                });
            }
            if (this.state.wednesday) {
                this.state.wednesdayTime.forEach(function (item) {
                    formData.append(`schedule[چهارشنبه]`, item)
                });
            }
            formData.append(`teacher_id`, teacherId)
            fetch(`${BASE_URL}/api/schedules/teacher`, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            }).then(response => {
                return response.json();
            }).then(jsonData => {
                this.setState({
                    schedules: jsonData
                })
            });
        }

        this.setState({
            tab: !this.state.tab,
            selected: [],
        });
    }

    scheduleSelect = (key, id) => {
        let selected = [];
        selected[key] = !selected[key];
        this.setState({
            scheduleId: id,
            selected: selected,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            "sending": true,
        });
        let status;
        let formData = new FormData();
        formData.append("schedule_id", this.state.scheduleId);
        formData.append("teacher_id", this.state.teacherId);
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + "/api/practical-courses", {
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
                    localStorage["foo"] = true;
                    this.setState({
                        "registered": true,
                    });
                }
            });
    }

    render() {
        if (this.state.registered) {
            return <Redirect to="/home" />;
        }

        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>آموزش عملی</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={11} sm={11} md={9} lg={10}>
                            <Paper className={`p-4`} hidden={this.state.tab}>
                                <Container>
                                    <Card className={`p-3`}>
                                        <Typography className={`f-medium mr-2 mb-3`}>
                                            زمان آزاد خود را انتخاب کنید:
                                            <Link to={"/teacher-schedule"}>
                                                <Typography component={"p"} className={`f-small d-inline mr-2`}>
                                                    (جدول حضور مربیان)
                                                </Typography>
                                            </Link>
                                        </Typography>
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Grid item lg={2} className={`center`}>
                                                <Grid container>
                                                    <Grid item lg={12} className={`center`}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={this.state.saturday}
                                                                    name="saturday" />
                                                            }
                                                            onChange={this.dayChange("saturday")}
                                                            label="شنبه"
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12} className={`center`}>
                                                        <Time timeChange={(day, times) => {
                                                            this.timeChange(day, times);
                                                        }}
                                                            disabled={!this.state.saturday}
                                                            day={"saturday"} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={2}>
                                                <Grid container>
                                                    <Grid item lg={12} className={`center`}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={this.state.sunday}
                                                                    name="sunday" />
                                                            }
                                                            onChange={this.dayChange("sunday")}
                                                            label="یکشنبه"
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12} className={`center`}>
                                                        <Time timeChange={(day, times) => {
                                                            this.timeChange(day, times);
                                                        }}
                                                            disabled={!this.state.sunday}
                                                            day={"sunday"} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={2} className={`center`}>
                                                <Grid container>
                                                    <Grid item lg={12} className={`center`}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={this.state.monday}
                                                                    name="monday" />
                                                            }
                                                            onChange={this.dayChange("monday")}
                                                            label="دوشنبه"
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12} className={`center`}>
                                                        <Time timeChange={(day, times) => {
                                                            this.timeChange(day, times);
                                                        }}
                                                            disabled={!this.state.monday}
                                                            day={"monday"} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={2} className={`center`}>
                                                <Grid container>
                                                    <Grid item lg={12} className={`center`}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={this.state.tuesday}
                                                                    name="tuesday" />
                                                            }
                                                            onChange={this.dayChange("tuesday")}
                                                            label="سه‌شنبه"
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12} className={`center`}>
                                                        <Time timeChange={(day, times) => {
                                                            this.timeChange(day, times);
                                                        }}
                                                            disabled={!this.state.tuesday}
                                                            day={"tuesday"} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={2} className={`center`}>
                                                <Grid container>
                                                    <Grid item lg={12} className={`center`}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={this.state.wednesday}
                                                                    name="wednesday" />
                                                            }
                                                            onChange={this.dayChange("wednesday")}
                                                            label="چهارشنبه"
                                                        />
                                                    </Grid>
                                                    <Grid item lg={12} className={`center`}>
                                                        <Time timeChange={(day, times) => {
                                                            this.timeChange(day, times);
                                                        }}
                                                            disabled={!this.state.wednesday}
                                                            day={"wednesday"} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Alert severity="info" className={`mt-4`}>
                                            لیست مربیان با توجه به انتخاب شما نمایش داده می شوند.
                                        </Alert>
                                    </Card>
                                </Container>
                                <Typography className={`f-large mt-3 mr-4`}>مربی خود را انتخاب کنید:</Typography>
                                <Grid container direction="row">
                                    {!this.state.teachers.length && (
                                        <Alert severity="warning" className={`mt-4 w-100`}>
                                            هیچ مربی ای با این شرایط زمانی پیدا نشد!
                                        </Alert>
                                    )}
                                    {this.state.teachers.map((item, key) => {
                                        return (
                                            <Grow in={true}{...({ timeout: 500 })} key={key}>
                                                <Grid item lg={2} className={`center pt-4`}>
                                                    <TeacherCard avatar={item.image}
                                                        onClick={() => this.backHandle(item.id)}
                                                        name={item.first_name + " " + item.last_name}
                                                        degree={item.degree}
                                                        description={item.description} />
                                                </Grid>
                                            </Grow>
                                        );
                                    })}
                                </Grid>
                            </Paper>
                            <Paper className={`p-4`} hidden={!this.state.tab}>
                                <Typography className={`f-medium f-bold mt-3 mb-3 mr-4`}>یک مورد را انتخاب
                                                                                         کنید:</Typography>
                                <Grid container direction="row" spacing={3}>
                                    {this.state.schedules.map((item, key) => {
                                        return (
                                            <Grid item lg={4} key={key}>
                                                <Card onClick={() => this.scheduleSelect(key, item.id)}
                                                    className={`cursor-pointer hover ${this.state.selected[key] ? "bg-primary text-white" : ""}`}>
                                                    <Typography component={"p"}
                                                        className={`center pt-3 pb-3 f-bold f-medium`}>
                                                        {item.day} از ساعت {item.from} تا ساعت {item.until}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                    <Grid item lg={12}>
                                        <Button variant="contained"
                                            onClick={() => this.backHandle(0)}
                                            color="secondary"
                                            startIcon={<ArrowForwardIcon />}
                                            className={`mt-3 f-bolder left`}>
                                            بازگشت به انتخاب مربی
                                        </Button>
                                        <Button type="submit"
                                            disabled={this.state.sending}
                                            onClick={this.handleSubmit}
                                            variant="contained"
                                            color="primary"
                                            className={`mt-3 f-bolder right`}>
                                            تایید
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}
