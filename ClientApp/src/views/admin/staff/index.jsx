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
            staffs: [],
        };
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(`${BASE_URL}/api/staffs`, {
            method : "GET",
            headers: {
                "Accept"       : "application/json",
                "Authorization": authorization,
            },
        }).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({
                staffs: jsonData,
            });
        });
    }

    delete(item) {
        let status;
        let authorization = localStorage.getItem("token_type") + " " + localStorage.getItem("access_token");
        fetch(BASE_URL + `/api/staffs/${item.id}`, {
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
                        const staffs = [...prevState.staffs];
                        staffs.splice(staffs.indexOf(item), 1);
                        return {...prevState, staffs};
                    });
                }
            });
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>کارمندان</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={11} sm={10} md={10} lg={10}>
                            <Link to={"/admin/staff/create"}>
                                <Button variant="contained" color={"primary"} className={"mb-3"}>
                                    اضافه کردن
                                    <Add className={"mr-1"} />
                                </Button>
                            </Link>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">نام</TableCell>
                                            <TableCell align="center">نام خانوادگی</TableCell>
                                            <TableCell align="center">جنسیت</TableCell>
                                            <TableCell align="center">شماره ملی</TableCell>
                                            <TableCell align="center">تاریخ تولد</TableCell>
                                            <TableCell align="center">تلفن</TableCell>
                                            <TableCell align="center">سمت</TableCell>
                                            <TableCell align="center">حقوق</TableCell>
                                            <TableCell align="center">تصویر</TableCell>
                                            <TableCell align="center">عملیات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.staffs.map((item, key) => {
                                            return (
                                                <TableRow key={key}>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.first_name}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.last_name}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.gender}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.national_code}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.birthdate}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.phone}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.role}
                                                    </TableCell>
                                                    <TableCell className={`t-center f-small`}>
                                                        {item.salary}
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
                                                        <Link to={`/admin/staff/edit/${item.id}`}>
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