import React from "react";
import Backdrop from "../components/Backdrop";
import {Grid, Typography, Card} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import { BASE_URL } from "../constants/app";

export default class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            news    : {}
        };
    }

    componentDidMount() {
        const {id}      = this.props.match.params;
        fetch(`${BASE_URL}/api/news/${id}`, {
            method : "GET",
            headers: {
                "Accept" : "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                news : jsonData[0],
            });
        });
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.state.news.title}</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={7}>
                            <Grid container spacing={1}>
                                <Grid item sm={12}>
                                    <Card className={`pb-4 pt-4 pl-4 pr-4`}>
                                        <Typography component={"h1"} className={`f-large f-bold`}>
                                            {this.state.news.title ? this.state.news.title : <Skeleton animation="wave" variant="text" />}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item sm={12}>
                                    { this.state.news.image ?
                                        <img src={BASE_URL + this.state.news.image}
                                             width={"100%"}
                                             alt={"alt"} />
                                        :
                                        <Skeleton animation="wave" variant="rect" width={"100%"} height={400}/>
                                    }
                                </Grid>
                                <Grid item sm={12}>
                                    <Card className={`pb-3 pt-3 pl-3 pr-3`}>
                                        <Typography component={"p"}
                                                    className={`f-lighter f-small`}>
                                            {this.state.news.content ? this.state.news.content : <Skeleton animation="wave" variant="text" />}
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