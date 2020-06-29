import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Typography} from "@material-ui/core";
import { BASE_URL } from "../constants/app";

const useStyles = makeStyles((theme) => ({
    parent     : {
        backgroundColor: "white",
        boxShadow      : "0 0 2px darkgray",
        justifyContent : "center",
        alignItems     : "center",
        textAlign      : "-webkit-center",
        padding        : "5px 20px",
    },
    avatar     : {
        top   : theme.spacing(1),
        width : theme.spacing(13),
        height: theme.spacing(13),
        border: "2px solid darkgray",
    },
    degree     : {
        margin    : "0px",
        fontWeight: "bold",
        fontSize  : "17px",
        textAlign : "center",
        lineHeight: "34px",
    },
    description: {
        fontSize  : "16px",
        textAlign : "center",
        lineHeight: "32px",
    },
}));

export default function TeacherCard(props) {
    const classes = useStyles();
    return (
        <div className={`${classes.parent} ${props.onClick ? "cursor-pointer hover" : ""}`}
             onClick={props.onClick ? props.onClick : null}>
            <Avatar aria-label="recipe" className={classes.avatar}>
                <img
                    src={BASE_URL + props.avatar}
                    width={"100%"}
                    title={props.name}
                    alt={props.name} />
            </Avatar>
            <Typography className={`f-bold f-medium mt-4`}>{props.name}</Typography>
            <Typography className={`f-normal f-small mt-1`}>مدرس {props.degree}</Typography>
            <Typography className={`f-light f-smaller mt-1`}>{props.description}</Typography>
        </div>
    );
}
