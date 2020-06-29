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

function createData(date, time, attendance, address, description) {
    return {date, time, attendance, address, description};
}

const rows = [
    createData("۱۳۹۹/۴/۱۵", "۱۴-۱۶", "حاضر", "منطقه‌ی ۳ خیابان رودکی"),
    createData("۱۳۹۹/۴/۱۷", "۱۰-۱۲", "حاضر", "منطقه‌ی ۲ خیابان بهشتی"),
];

export default function FunctionalCourseTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" colSpan={1}>تاریخ</TableCell>
                        <TableCell align="left" colSpan={1}>ساعت</TableCell>
                        <TableCell align="left" colSpan={1}>وضعیت حضور</TableCell>
                        <TableCell align="left" colSpan={1}>محل آموزش</TableCell>
                        <TableCell align="left" colSpan={1}>توضیحات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={Math.random()}>
                            <TableCell align="left" colSpan={1}>
                                {row.date}
                            </TableCell>
                            <TableCell align="left" colSpan={1}>
                                {row.time}
                            </TableCell>
                            <TableCell align="left" colSpan={1}>
                                {row.attendance}
                            </TableCell>
                            <TableCell align="left" colSpan={1}>
                                {row.address}
                            </TableCell>
                            <TableCell align="left" colSpan={1}>
                                {row.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
