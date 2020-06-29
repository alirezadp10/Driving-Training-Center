import React from "react";
import {Card, Grid} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import TeacherTab from "../components/TeacherTab";
import Typography from "@material-ui/core/Typography";

export default class TeacherSchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false,
            sending     : false,
            teachers    : [
                {
                    name: "امیر رشیدی",
                },
                {
                    name: "رضا کاوه ساز",
                },
                {
                    name: "حسن غلام پور",
                },
                {
                    name: "نیما نکیسا",
                },
                {
                    name: "ووریا غفوری",
                },
                {
                    name: "آیدین مقیمی",
                },
                {
                    name: "رحیم نوروزی",
                },
            ],
        };
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>برنامه حضور مربیان</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={11} sm={11} md={9} lg={8}>
                            <Grid container spacing={1}>
                                <Card className={`p-3 mb-3 w-100`}>
                                    <Typography component={"h2"} className={`f-medium f-bold`}>برنامه حضور مربیان</Typography>
                                </Card>
                                <TeacherTab teachers={this.state.teachers} />
                            </Grid>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}
