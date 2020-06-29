import React from "react";
import Layout from "../views/layouts/app";
import {Helmet} from "react-helmet";
import {Container, Grid, Typography} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Slider from "./welcome/slider";
import Contact from "./welcome/contact";
import LicenseCard from "../components/LicenseCard";
import AliceCarousel from "react-alice-carousel";
import TeacherCard from "../components/TeacherCard";
import "react-alice-carousel/lib/scss/main.scss";
import { BASE_URL } from "../constants/app";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading    : true,
            slider     : [
                {
                    id: "",
                    title: ".",
                    image: ""
                }
            ],
            teachers   : [],
            licenses   : [],
        };
    }

    componentDidMount() {
        fetch(`${BASE_URL}/slider`, {
            method : "GET",
            headers: {
                "Accept" : "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                slider : jsonData,
            });
        });

        fetch(`${BASE_URL}/teachers`, {
            method : "GET",
            headers: {
                "Accept" : "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                teachers : jsonData,
            });
        });

        fetch(`${BASE_URL}/licenses`, {
            method : "GET",
            headers: {
                "Accept" : "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            window.foo = jsonData;
            this.setState({
                licenses : jsonData,
            });
        });
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>آموزشگاه رانندگی</title>
                </Helmet>
                <React.Fragment>
                    <Container component="div" maxWidth="lg" style={{marginTop: "100px"}}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Contact />
                            </Grid>
                            <Grid item xs={9}>
                                <Slider items={this.state.slider} />
                            </Grid>
                        </Grid>
                    </Container>
                    <Container component="div" maxWidth="lg" style={{marginTop: "30px"}}>
                        <Typography style={{
                            background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(61,61,61,1) 100%)",
                            fontSize  : 22,
                        }}
                                    className={`text-right f-bold text-white pr-3 pt-2 pb-2`}>
                            مربیان آموزشگاه
                        </Typography>
                        <div style={{marginTop: "15px"}}>
                            <AliceCarousel
                                dotsDisabled={true}
                                autoPlayInterval={10000}
                                buttonsDisabled={true}
                                autoPlay={true}
                                mouseDragEnabled={true}
                                autoPlayDirection="rtl"
                                responsive={{
                                    1024: {
                                        items: 6,
                                    },
                                }}>
                                {this.state.teachers.map(function (item, key) {
                                    return (
                                        <TeacherCard key={key}
                                                     name={item.first_name + " " + item.last_name}
                                                     avatar={item.image}
                                                     degree={item.license_type}
                                                     description={item.description} />
                                    );
                                })}
                            </AliceCarousel>
                        </div>
                    </Container>
                    <RTLContainer>
                        <Container component="div" maxWidth="lg" style={{marginTop: "30px"}}>
                            <Grid container spacing={2}>
                                {this.state.licenses.map(function (item, key) {
                                    return (
                                        <Grid item xs={3} key={Math.random()}>
                                            <LicenseCard title={item.name}
                                                         image={item.image}
                                                         link={item.name}
                                                         cost={item.cost}
                                                         conditions={
                                                            JSON.parse(item.conditions).map(function (item) {
                                                                 return item;
                                                             })
                                                         } />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Container>
                    </RTLContainer>
                </React.Fragment>
            </Layout>
        );
    }
}
