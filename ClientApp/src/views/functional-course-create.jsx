import React from "react";
import {Button, Card, Checkbox, Container, FormControlLabel, Grid, Grow, Paper, Typography} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RTLContainer from "../components/RTLContainer";
import Time from "../components/Time";
import TeacherCard from "../components/TeacherCard";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import Alert from "@material-ui/lab/Alert/Alert";
import {Link} from "react-router-dom";

const times = [
    "08-10",
    "10-12",
    "12-14",
    "14-16",
    "16-18",
    "18-20",
];

export default class FunctionalCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state      = {
            selected     : [],
            tab          : false,
            isAuthorized : false,
            sending      : false,
            saturday     : true,
            saturdayTime : times,
            sunday       : true,
            sundayTime   : times,
            monday       : true,
            mondayTime   : times,
            tuesday      : true,
            tuesdayTime  : times,
            wednesday    : true,
            wednesdayTime: times,
        };
        this.timeChange = this.timeChange.bind(this);
        this.backHandle = this.backHandle.bind(this);
    }

    dayChange = name => (event, value) => {
        this.setState({
            [name]: value,
        });
    };

    timeChange(day, times) {
        this.setState({
            [`${day}Time`]: times,
        });
    }

    backHandle() {
        this.setState({
            tab     : !this.state.tab,
            selected: [],
        });
    }

    timeHandle = key => {
        let selected  = this.state.selected;
        selected[key] = !selected[key];
        this.setState({
            selected: selected,
        });
    };

    render() {
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
                                    {[
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                        {
                                            name       : "حسن آقامیری",
                                            degree     : "مدرس پایه ۱",
                                            description: "دارای ۳ سال سابقه ی همکاری",
                                            avatar     : require("../assets/images/teacher02.jpg"),
                                        },
                                    ].map((item, key) => {
                                        return (
                                            <Grow in={true}{...({timeout: 500})} key={key}>
                                                <Grid item lg={2} className={`center pt-4`}>
                                                    <TeacherCard avatar={item.avatar}
                                                                 onClick={() => this.backHandle()}
                                                                 name={item.name}
                                                                 degree={item.degree}
                                                                 description={item.description} />
                                                </Grid>
                                            </Grow>
                                        );
                                    })}
                                </Grid>
                            </Paper>
                            <Paper className={`p-4`} hidden={!this.state.tab}>
                                <Typography className={`f-medium f-bold mt-3 mb-3 mr-4`}>دو مورد را انتخاب
                                                                                         کنید:</Typography>
                                <Grid container direction="row" spacing={3}>
                                    {[
                                        {
                                            day : "شنبه",
                                            time: "۱۰-۱۲",
                                        },
                                        {
                                            day : "شنبه",
                                            time: "۱۰-۱۲",
                                        },
                                        {
                                            day : "شنبه",
                                            time: "۱۰-۱۲",
                                        },
                                        {
                                            day : "شنبه",
                                            time: "۱۰-۱۲",
                                        },
                                        {
                                            day : "شنبه",
                                            time: "۱۰-۱۲",
                                        },
                                        {
                                            day : "شنبه",
                                            time: "۱۰-۱۲",
                                        },
                                    ].map((item, key) => {
                                        return (
                                            <Grid item lg={3} key={key}>
                                                <Card onClick={() => this.timeHandle(key)}
                                                      className={`cursor-pointer hover ${this.state.selected[key] ? "bg-primary text-white" : ""}`}>
                                                    <Typography component={"p"}
                                                                className={`center pt-3 pb-3 f-bold f-medium`}>
                                                        {item.day} ساعت {item.time}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                        );
                                    })}

                                    <Grid item lg={12}>
                                        <Button variant="contained"
                                                onClick={this.backHandle}
                                                color="secondary"
                                                startIcon={<ArrowForwardIcon />}
                                                className={`mt-3 f-bolder left`}>
                                            بازگشت به انتخاب مربی
                                        </Button>
                                        <Button type="submit"
                                                disabled={this.state.sending}
                                            // onClick={this.timeHandle}
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
