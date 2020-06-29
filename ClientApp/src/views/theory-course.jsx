import React from "react";
import {Grid} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import LicenseTab from "../components/LicenseTab";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";

export default class TheoryCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    "label"  : "پایه ۱",
                    "image"  : require("../assets/images/image08.jpg"),
                    "lessons": [
                        {
                            title: "معرفی دوره",
                            link : "/theory/",
                        },
                        {
                            title: "قوانین و مقررات راهنمایی و رانندگی",
                            link : "/theory/",
                        },
                        {
                            title: "رانندگی ایمن",
                            link : "/theory/",
                        },
                        {
                            title: "آشنایی با سیستم های فنی خودرو و سرویس و نگهداری",
                            link : "/theory/",
                        },
                        {
                            title: "فرهنگ رانندگی",
                            link : "/theory/",
                        },
                        {
                            title: "امداد و نجات",
                            link : "/theory/",
                        },
                        {
                            title: "آلودگی های ترافیک",
                            link : "/theory/",
                        },
                    ],
                },
                {
                    "label"  : "پایه ۲",
                    "image"  : require("../assets/images/image07.jpeg"),
                    "lessons": [
                        {
                            title: "معرفی دوره",
                            link : "/theory/",
                        },
                        {
                            title: "قوانین و مقررات راهنمایی و رانندگی",
                            link : "/theory/",
                        },
                        {
                            title: "رانندگی ایمن",
                            link : "/theory/",
                        },
                        {
                            title: "آشنایی با سیستم های فنی خودرو و سرویس و نگهداری",
                            link : "/theory/",
                        },
                        {
                            title: "فرهنگ رانندگی",
                            link : "/theory/",
                        },
                        {
                            title: "امداد و نجات",
                            link : "/theory/",
                        },
                        {
                            title: "آلودگی های ترافیک",
                            link : "/theory/",
                        },
                    ],
                },
                {
                    "label"  : "پایه ۳",
                    "image"  : require("../assets/images/image06.jpg"),
                    "lessons": [
                        {
                            title: "معرفی دوره",
                            link : "/theory/",
                        },
                        {
                            title: "قوانین و مقررات راهنمایی و رانندگی",
                            link : "/theory/",
                        },
                        {
                            title: "رانندگی ایمن",
                            link : "/theory/",
                        },
                        {
                            title: "آشنایی با سیستم های فنی خودرو و سرویس و نگهداری",
                            link : "/theory/",
                        },
                        {
                            title: "فرهنگ رانندگی",
                            link : "/theory/",
                        },
                        {
                            title: "امداد و نجات",
                            link : "/theory/",
                        },
                        {
                            title: "آلودگی های ترافیک",
                            link : "/theory/",
                        },
                    ],
                },
            ],
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