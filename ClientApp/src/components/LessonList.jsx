import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root       : {
        width          : "100%",
        backgroundColor: theme.palette.background.paper,
        position       : "relative",
        overflow       : "auto",
        maxHeight      : 500,
    },
    listSection: {
        backgroundColor: "inherit",
    },
    ul         : {
        backgroundColor: "inherit",
        padding        : 0,
    },
}));

export default function PinnedSubheaderList({...props}) {
    const number = {
        0 : "اول",
        1 : "دوم",
        2 : "سوم",
        3 : "چهارم",
        4 : "پنجم",
        5 : "ششم",
        6 : "هفتم",
        7 : "هشتم",
        8 : "نهم",
        9 : "دهم",
        10: "یازدهم",
        11: "دوازدهم",
        12: "سیزدهم",
        13: "چهاردهم",
        14: "پانزدهم",
        15: "شانزدهم",
        16: "هفدهم",
        17: "هجدهم",
        18: "نوزدهم",
        19: "بیستم",
    };

    const classes = useStyles();

    return (
        <List className={classes.root} subheader={<li />}>
            {props.list.map(
                (lesson, key) => (
                    <li key={`section-${key}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader className={`f-light`}>{`جلسه ${number[key]}`}</ListSubheader>
                            <Link to={`lesson/${lesson.id}`} style={{color: "inherit", textDecoration: "none"}}>
                                <ListItem key={`item-${key}-0`}>
                                    <ListItemText
                                        primary={
                                            <Typography type="body2"
                                                        className={`f-normal f-medium`}>
                                                {lesson.title}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </Link>
                        </ul>
                    </li>
                ),
            )}
        </List>
    );
}
