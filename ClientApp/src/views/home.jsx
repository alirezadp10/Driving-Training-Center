import React from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

export default class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state      = {
            isAuthorized           : false,
            value                  : "۰ تومان",
            sending                : false,
            hasError               : false,
            licenseType            : "",
            licenseTypeErrorMessage: [],
            haveFunctionalCourse   : false,
        };
        this.validation = this.validation.bind(this);
    }

    validation() {
        let hasError                = false;
        let licenseTypeErrorMessage = [];
        if (!this.state.licenseType) {
            licenseTypeErrorMessage.push("لطفا نوع گواهینامه را انتخاب نمایید");
            hasError = true;
        }
        this.setState({
            licenseTypeErrorMessage,
            hasError,
        });
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>خانه</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={7}>
                            <Grid container spacing={4}>
                                <Grid item sm={3}>
                                    <Link to={"/theory-course"} style={{color: "inherit", textDecoration: "none"}}>
                                        <Card className={`p-3 cursor-pointer hover`}>
                                            <img alt={"آموزش آیین نامه"}
                                                 src={require("../assets/images/1.png")}
                                                 style={{width: "100%"}} />
                                            <Typography className={`t-center f-medium f-normal mt-4 mb-4`}
                                                        component={"p"}>آموزش آیین نامه
                                            </Typography>
                                        </Card>
                                    </Link>
                                </Grid>
                                <Grid item sm={3}>
                                    <Link to={"/theory-exam"} style={{color: "inherit", textDecoration: "none"}}>
                                        <Card className={`p-3 cursor-pointer hover`}>
                                            <img alt={"آزمون آیین نامه"}
                                                 src={require("../assets/images/2.png")}
                                                 style={{width: "100%"}} />
                                            <Typography className={`t-center f-medium f-normal mt-4 mb-4`}
                                                        component={"p"}>آزمون آیین نامه
                                            </Typography>
                                        </Card>
                                    </Link>
                                </Grid>
                                <Grid item sm={3}>
                                    <Link
                                        to={this.state.haveFunctionalCourse ? "/functional-course" : "/functional-course-create"}
                                        style={{color: "inherit", textDecoration: "none"}}>
                                        <Card className={`p-3 cursor-pointer hover`}>
                                            <img alt={"آموزش عملی"}
                                                 src={require("../assets/images/3.png")}
                                                 style={{width: "100%"}} />
                                            <Typography className={`t-center f-medium f-normal mt-4 mb-4`}
                                                        component={"p"}>آموزش عملی
                                            </Typography>
                                        </Card>
                                    </Link>
                                </Grid>
                                <Grid item sm={3}>
                                    <Link to={"/functional-course"} style={{color: "inherit", textDecoration: "none"}}>
                                        <Card className={`p-3 cursor-pointer hover`}>
                                            <img alt={"آزمون عملی"}
                                                 src={require("../assets/images/4.png")}
                                                 style={{width: "100%"}} />
                                            <Typography className={`t-center f-medium f-normal mt-4 mb-4`}
                                                        component={"p"}>امتحان عملی
                                            </Typography>
                                        </Card>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    };
}