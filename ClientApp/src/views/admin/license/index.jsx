import React from "react";
import RTLContainer from "../../../components/RTLContainer";
import Layout from "./../../layouts/admin";
import {Helmet} from "react-helmet";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import {BASE_URL} from "../../../constants/app";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            licenses: [],
        };
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(`${BASE_URL}/api/licenses`, {
            method : "GET",
            headers: {
                "Accept"       : "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                licenses: jsonData,
            });
        });
    }

    delete(item) {
        let status;
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + `/api/licenses/${item.id}`, {
            method : "DELETE",
            headers: {
                "Accept"       : "application/json",
                "Authorization": authorization,
            },
        })
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(jsonData => {
                if (status === 200) {
                    this.setState(prevState => {
                        const licenses = [...prevState.licenses];
                        licenses.splice(licenses.indexOf(item), 1);
                        return {...prevState, licenses};
                    });
                }
            });
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>گواهی نامه</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={11} sm={10} md={10} lg={10}>
                            <Link to={"/admin/license/create"}>
                                <Button variant="contained" color={"primary"} className={"mb-3"}>
                                    اضافه کردن
                                    <Add className={"mr-1"} />
                                </Button>
                            </Link>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">عنوان</TableCell>
                                            <TableCell align="center">هزینه</TableCell>
                                            <TableCell align="center">شرایط</TableCell>
                                            <TableCell align="center">تصویر</TableCell>
                                            <TableCell align="center">عملیات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.licenses.map((item, key) => {
                                            return (
                                                <TableRow key={key}>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.cost}
                                                    </TableCell>
                                                    <TableCell className={`center`}>
                                                        <ul>
                                                            {JSON.parse(item.conditions).map(function (c, i) {
                                                                return (
                                                                    <li key={i}>
                                                                        {c}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        <a href={BASE_URL + item.image}>
                                                            لینک
                                                        </a>
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        <span className={"ml-3 cursor-pointer"}
                                                              onClick={() => this.delete(item)}>
                                                            <Delete />
                                                        </span>
                                                        <Link to={`/admin/license/edit/${item.id}`}>
                                                            <Edit />
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    };
}