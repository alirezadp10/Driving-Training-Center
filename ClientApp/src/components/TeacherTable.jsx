import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}));

function createData(day, EighteenToTwenty, SixTeenToEighteen, FourteenToSixTeen, TwelveToFourteen, tenToTwelve, eightToTen) {
    return {day, EighteenToTwenty, SixTeenToEighteen, FourteenToSixTeen, TwelveToFourteen, tenToTwelve, eightToTen};
}

const rows = [
    createData("شنبه", true, true, false, false, false,false),
    createData("یکشنبه", true, true, true, false, true, true),
    createData("دوشنبه", false, false, true, false, false, false),
    createData("سه‌شنبه", false, true, false, true, false, false),
    createData("چهارشنبه", true, false, false, false, true, true),
];

export default function TeacherTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">18-20</TableCell>
                        <TableCell align="right">16-18</TableCell>
                        <TableCell align="right">14-16</TableCell>
                        <TableCell align="right">12-14</TableCell>
                        <TableCell align="right">10-12</TableCell>
                        <TableCell align="right">08-10</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.day}>
                            <TableCell component="th" scope="row" className={`t-center f-small`}>
                                {row.day}
                            </TableCell>
                            <TableCell align="right">
                                <Checkbox checked={row.EighteenToTwenty} />
                            </TableCell>
                            <TableCell align="right">
                                <Checkbox checked={row.SixTeenToEighteen} />
                            </TableCell>
                            <TableCell align="right">
                                <Checkbox checked={row.FourteenToSixTeen} />
                            </TableCell>
                            <TableCell align="right">
                                <Checkbox checked={row.TwelveToFourteen} />
                            </TableCell>
                            <TableCell align="right">
                                <Checkbox checked={row.tenToTwelve} />
                            </TableCell>
                            <TableCell align="right">
                                <Checkbox checked={row.eightToTen} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
