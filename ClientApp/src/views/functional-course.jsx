import React from "react";
import {Grid, Paper} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import FunctionalCourseTable from "../components/FunctionalCourseTable";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import {Alert} from "@material-ui/lab";

export default class FunctionalCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false,
            sending     : false,
        };
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>جدول کلاس های عملی</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={11} sm={11} md={8} lg={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Alert severity="info" style={{fontSize: 16}}>
                                        کلاس های شما از تاریخ ۱۳۹۹/۴/۱۰ تا ۱۳۹۹/۵/۱۰ به تعداد ۲۰ جلسه در روز‌های شنبه
                                        ساعت ۱۲-۱۴ و سه‌شنبه ساعت ۱۵-۱۶ برگزار می‌گردد.
                                    </Alert>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper>
                                        <FunctionalCourseTable />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}
