import React from "react";
import {Grid} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import LicenseTab from "../components/LicenseTab";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import { BASE_URL } from "../constants/app";

export default class TheoryCourse extends React.Component {

    componentDidMount() {
        fetch(`${BASE_URL}/api/theory-courses`, {
            method : "GET",
            headers: {
                "Accept" : "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                tabs : jsonData,
            });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
        };
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
                        <Grid item xs={10} sm={6} md={8} lg={8}>
                            <LicenseTab tabs={this.state.tabs} />
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}