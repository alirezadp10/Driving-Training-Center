import React from "react";
import { Button, Card, Grid, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants/app";

export default class TheoryExam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            applicantExams: []
        };
    }

    componentDidMount() {
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(`${BASE_URL}/api/theory-exams/user`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                exams: jsonData,
            });
        });

        fetch(`${BASE_URL}/api/applicant-theory-exams`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                applicantExams: jsonData,
            });
        });

    }
    
    render() {
        var point,status;
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
                                {this.state.exams.map((item, key) =>
                                    (
                                        <Grid item sm={12} key={key}>
                                            <Card className={`p-3`}>
                                                <Grid container spacing={1} className={`p-2`}>
                                                    <Grid item sm={3} className={`center t-center`}>
                                                        <Typography component={"p"}>
                                                            آزمون آیین نامه ی رانندگی {item.license_type}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={5} className={`center`}>
                                                        <ul>
                                                            <li>
                                                                <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                                    تعداد سوالات: {item.questions_count}
                                                                </Typography>
                                                            </li>
                                                            <li>
                                                                <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                                    مدت زمان آزمون: {item.time}
                                                                </Typography>
                                                            </li>
                                                            <li>
                                                                <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                                    {item.description}
                                                                </Typography>
                                                            </li>
                                                        </ul>
                                                    </Grid>
                                                    <Grid item sm={4} className={`center`}>
                                                        <Link to={`/exam/${item.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                            <Button variant="contained"
                                                                color="secondary"
                                                                // disabled={}
                                                                // onClick={}
                                                                className={`f-bolder`}>
                                                                شرکت در آزمون
                                                        </Button>
                                                        </Link>
                                                    </Grid>
                                                    {this.state.applicantExams.some(function (exam) {
                                                        point = exam.point; 
                                                        status = exam.status; 
                                                        return exam.theory_exam_id == item.id && status != 'PENDING'
                                                    }) && (
                                                            <Grid item sm={12} className={`mt-3`}>
                                                                <Alert severity="success">
                                                                    شما این آزمون را با نمره ی {point} {status} شده اید.
                                                                </Alert>
                                                            </Grid>
                                                        )}
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}