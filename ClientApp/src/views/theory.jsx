import React from "react";
import {Grid, Typography, Card} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import { BASE_URL } from "../constants/app";

export default class Theory extends React.Component {

    componentDidMount() {
        fetch(`${BASE_URL}/api/lessons/${this.props.match.params.id}`, {
            method : "GET",
            headers: {
                "Accept" : "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                lesson : jsonData,
            });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            lesson    : {}
        };
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.state.lesson.title}</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={7}>
                            <Grid container spacing={1}>
                                <Grid item sm={12}>
                                    <Card className={`pb-4 pt-4 pl-4 pr-4`}>
                                        <Typography component={"h1"} className={`f-large f-bold`}>
                                            {this.state.lesson.title}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item sm={12}>
                                    <img src={BASE_URL + this.state.lesson.image}
                                         width={"100%"}
                                         alt={"alt"} />
                                </Grid>
                                <Grid item sm={12}>
                                    <Card className={`pb-3 pt-3 pl-3 pr-3`}>
                                        <Typography component={"p"}
                                                    className={`f-lighter f-small`}>
                                                        {this.state.lesson.content}
                                        </Typography>
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