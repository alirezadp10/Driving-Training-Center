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
import { Helmet } from "react-helmet";
import moment from "moment";
import { BASE_URL } from "../constants/app";
import { Redirect } from "react-router-dom";

export default class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            pageId: 0,
            pagination: 1,
            isAuthorized: false,
            sending: false,
            exam: {},
            answers: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.answerList = this.answerList.bind(this);
    }

    handleChange = name => (event, value) => {
        this.setState({
            [name]: value,
        });

        if (name === "pagination") {
            this.setState({
                pageId: this.state.exam.questions[value - 1].id,
            });
        }
    };

    answerList = name => (event, value) => {
        let answers = this.state.answers;
        answers[name] = value;
        this.setState({
            answers: answers,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            "sending": true,
        });
        
        let status;
        let formData = new FormData();
        formData.append("theory_exam_id", this.props.match.params.id);
        this.state.answers.forEach(function (value, key) {
            formData.append(`answers[${key}]`, value);
        })
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + "/api/theory-exams/correction", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
                "Authorization": authorization,
            },
        })
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(jsonData => {
                this.setState({
                    "sending": false,
                });
                if (status === 200) {
                    this.setState({
                        "registered": true,
                    });
                }
            });
    }

    componentDidMount() {
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(`${BASE_URL}/api/theory-exams/${this.props.match.params.id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                exam: jsonData,
                pageId: jsonData.questions[0].id
            });
            this.state.exam.time = this.state.exam.time * 60
            this.forceUpdate();
        });

        const intervalId = setInterval(() => this.updateTimer(), 2000);
        this.setState({ intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    updateTimer() {
        this.state.exam.time = this.state.exam.time - 1
        this.forceUpdate()
        if (this.state.exam.time == 0) {
            this.handleSubmit()
        }
    }

    render() {
        if (this.state.registered) {
            return <Redirect to="/theory-exam" />;
        }

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
                                        {Object.keys(this.state.exam).length !== 0 && (
                                            <div>
                                                <Question question={this.state.exam.questions[this.state.pagination - 1]}
                                                    selectedValue={this.state.answers[this.state.pageId]}
                                                    handleChange={this.answerList} />
                                                <Grid item sm={12}>
                                                    <Pagination count={this.state.exam.questions.length}
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
                                                    {moment.utc(this.state.exam.time * 1000).format("HH:mm:ss")}
                                                </Button>
                                            </div>
                                        )}
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
                            <img src={BASE_URL + this.props.question.image}
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
                                        {JSON.parse(this.props.question.options).map(function (item, key) {
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