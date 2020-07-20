import React from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import Alert from "@material-ui/lab/Alert/Alert";

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
                    <title>آزمون عملی</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={6} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <Card className={`p-3`}>
                                        <Grid container spacing={1} className={`p-2`}>
                                            <Grid item sm={4} className={`center t-center`}>
                                                <Typography component={"p"}>
                                                    آزمون عملی رانندگی پایه ۳
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={8}>
                                                <ul>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            این آزمون در تاریخ ۱۳۹۹/۰۵/۲۳ ساعت ۱۳:۰۰ برگزار می‌شود.
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            جناب سرهنگ احمدی افسر این آزمون می‌باشد.
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography type="p"
                                                                    className={`f-normal f-smaller`}>
                                                            این آزمون با خودروی پراید برگزار می‌گردد.
                                                        </Typography>
                                                    </li>
                                                </ul>
                                            </Grid>
                                            <Grid item sm={12} className={`mt-3`}>
                                                <Alert severity="success">
                                                    شما این آزمون را با با موفقیت قبول شده اید.
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
