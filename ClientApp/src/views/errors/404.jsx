import React from "react";

// layout
import Layout from "../../views/layouts/app";

// Material components
import {
    Grid,
    Typography,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    IconButton,
    withStyles,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import {Link} from "react-router-dom";
import "../../assets/css/errors/404.css";

const StyledCardHeader = withStyles({
    root : {
        textAlign      : "right",
        padding        : "0.75rem 1.25rem",
        marginBottom   : 0,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderBottom   : "1px solid rgba(0, 0, 0, 0.05)",
    },
    title: {
        fontSize  : "15px",
        fontWeight: "400",
        lineHeight: "1.5",
        color     : "#212529",
    },
})(CardHeader);

const StyledTypography = withStyles({
    root: {
        textAlign : "right",
        padding   : "0.75rem 1.25rem",
        fontSize  : "15px",
        direction : "rtl",
    },
})(Typography);

const StyledCardActions = withStyles({
    root: {
        textAlign      : "right",
        padding        : "0.35rem 1.25rem",
        marginBottom   : 0,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderTop      : "1px solid rgba(0, 0, 0, 0.05)",
    },
})(CardActions);

export default class App extends React.Component {
    render() {
        return (
            <Layout>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={5}>
                        <Card style={{boxShadow: "none"}}>
                            <StyledCardHeader title="چنین صفحه ای پیدا نشد" />
                            <CardContent>
                                <StyledTypography>
                                    با عرض پوزش از شما، چنین صفحه ای در سایت وجود ندارد یا این صفحه از سایت پاک شده است.
                                </StyledTypography>
                            </CardContent>
                            <StyledCardActions>
                                <Link to="/">
                                    <IconButton aria-label="Home"
                                                style={{
                                                    backgroundColor: "rgb(255, 193, 7)",
                                                    color          : "white",
                                                    borderRadius   : 5,
                                                    padding        : "8px",
                                                }}>
                                        <HomeIcon />
                                    </IconButton>
                                </Link>
                            </StyledCardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}
