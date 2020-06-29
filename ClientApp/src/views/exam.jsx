import React from "react";
import {
    Button,
    Card,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Pagination from "@material-ui/lab/Pagination";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";
import moment from "moment";

export default class Exam extends React.Component {

    constructor(props) {
        super(props);
        this.state        = {
            pagination  : 1,
            isAuthorized: false,
            sending     : false,
            questions   : [
                {
                    id     : 1,
                    title  : "هنرجوی گرامی حق تقدم عبور را در تقاطع شکل زیر به ترتیب مشخص کنید.",
                    image  : require("../assets/images/image01.jpg"),
                    options: [
                        "سبز – زرد – نارنجی – آبی",
                        "زرد – سبز – آبی – نارنجی",
                        "آبی – سبز – نارنجی – زرد",
                        "سبز – زرد – آبی - نارنجی",
                    ],
                },
                {
                    id     : 2,
                    title  : "هنرجوی گرام حق تقدم عبور را در تقاطع شکل زیر به ترتیب مشخص کنید.",
                    image  : require("../assets/images/image02.jpg"),
                    options: [
                        "سبز – زرد – آبی - نارنجی",
                        "زرد – سبز – آبی – نارنجی",
                        "سبز – زرد – نارنجی – آبی",
                        "آبی – سبز – نارنجی – زرد",
                    ],
                },
            ],
            timer       : 600,
            answers     : [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.answerList   = this.answerList.bind(this);
    }

    handleChange = name => (event, value) => {
        this.setState({
            [name]: value,
        });
    };

    answerList = name => (event, value) => {
        let answers       = this.state.answers;
        answers[name - 1] = value;
        this.setState({
            answers: answers,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        const intervalId = setInterval(() => this.updateTimer(), 2000);
        this.setState({intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    updateTimer() {
        this.setState({
            timer: this.state.timer - 1,
        });
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>امتحان آیین نامه</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={7}>
                            <Card className={`pb-4 pt-4 pl-4 pr-4`}>
                                <Grid container spacing={1}>
                                    <form onSubmit={this.handleSubmit}>
                                        <Question question={this.state.questions[this.state.pagination - 1]}
                                                  selectedValue={this.state.answers[this.state.pagination - 1]}
                                                  handleChange={this.answerList} />
                                        <Grid item sm={12}>
                                            <Pagination count={this.state.questions.length}
                                                        className={`center mt-4`}
                                                        page={this.state.pagination}
                                                        onChange={this.handleChange("pagination")} />
                                        </Grid>
                                        <Button type="submit"
                                                disabled={this.state.sending}
                                                size={"large"}
                                                variant="contained"
                                                color="secondary"
                                                className={`mt-3 f-bolder`}>
                                            پایان آزمون
                                        </Button>
                                        <Button size={"large"}
                                                variant="contained"
                                                color="secondary"
                                                className={`mt-3 f-bolder left`}>
                                            {moment.utc(this.state.timer * 1000).format("HH:mm:ss")}
                                        </Button>
                                    </form>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}

class Question extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid item sm={12}>
                    <Grid container spacing={1}>
                        <Grid item sm={8}>
                            <Typography component={"h4"} className={`f-medium f-light`}>
                                {this.props.question.title}
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <img src={this.props.question.image}
                                 width={"100%"}
                                 alt={this.props.question.title} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Container component="div" maxWidth="md">
                        <Grid container spacing={4}>
                            <Grid item sm={7}>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label={this.props.question.id}
                                                value={parseInt(this.props.selectedValue)}
                                                name={`question-${this.props.question.id}`}
                                                onChange={this.props.handleChange(this.props.question.id)}>
                                        {this.props.question.options.map(function (item, key) {
                                            return <FormControlLabel key={Math.random()}
                                                                     value={key + 1}
                                                                     control={<Radio />}
                                                                     label={item} />;
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </React.Fragment>
        );
    }
}