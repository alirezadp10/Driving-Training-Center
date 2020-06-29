import React from "react";
import {Button, Card, Grid, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

export default class TheoryExam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>آموزش آیین نامه</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={6} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <Card className={`p-3`}>
                                        <Grid container spacing={1} className={`p-2`}>
                                            <Grid item sm={3} className={`center t-center`}>
                                                <Typography component={"p"}>
                                                    آزمون آیین نامه ی رانندگی پایه ۳
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={5} className={`center`}>
                                                <ul>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            تعداد سوالات: 30
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            مدت زمان آزمون: 20 دقیقه
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            نوع آزمون: تستی و تشریحی
                                                        </Typography>
                                                    </li>
                                                </ul>
                                            </Grid>
                                            <Grid item sm={4} className={`center`}>
                                                <Link to={"/exam"} style={{color: "inherit", textDecoration: "none"}}>
                                                    <Button variant="contained"
                                                            color="secondary"
                                                        // disabled={}
                                                        // onClick={}
                                                            className={`f-bolder`}>
                                                        شرکت در آزمون
                                                    </Button>
                                                </Link>
                                            </Grid>
                                            <Grid item sm={12} className={`mt-3`}>
                                                <Alert severity="success">
                                                    شما این آزمون را با نمره ی 100 قبول شده اید.
                                                </Alert>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item sm={12}>
                                    <Card className={`p-3`}>
                                        <Grid container spacing={1} className={`p-2`}>
                                            <Grid item sm={3} className={`center t-center`}>
                                                <Typography component={"p"}>
                                                    آزمون آیین نامه ی رانندگی پایه ۳
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={5} className={`center`}>
                                                <ul>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            تعداد سوالات: 30
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            مدت زمان آزمون: 20 دقیقه
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            نوع آزمون: تستی و تشریحی
                                                        </Typography>
                                                    </li>
                                                </ul>
                                            </Grid>
                                            <Grid item sm={4} className={`center`}>
                                                <Button variant="contained"
                                                        color="secondary"
                                                    // disabled={}
                                                    // onClick={}
                                                        className={`f-bolder`}>
                                                    شرکت در آزمون
                                                </Button>
                                            </Grid>
                                            <Grid item sm={12} className={`mt-3`}>
                                                <Alert severity="success">
                                                    شما این آزمون را با نمره ی 100 قبول شده اید.
                                                </Alert>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}