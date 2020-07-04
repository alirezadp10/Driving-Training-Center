import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import { BASE_URL } from "../constants/app";

const useStyles = makeStyles((theme) => ({
    parent: {
        backgroundColor: "white",
        boxShadow      : "0 0 5px darkgray",
        justifyContent : "center",
        alignItems     : "center",
        textAlign      : "-webkit-center",
        paddingBottom  : 15,
        marginBottom   : 20,
        height         : 610,
        position       : "relative",
    },
    image : {
        width : "100%",
        height: 250,
    },
    bottom: {
        position: "absolute",
        bottom  : 20,
        left    : 0,
        right   : 0,
        margin  : "0 auto",
    },
}));

export default function LicenseCard(props) {
    const classes = useStyles();
    return (
        <div className={classes.parent}>
            <img alt="" src={BASE_URL + props.image} className={classes.image} />
            <Typography className={`f-large f-bold mt-3 mb-3`}>{props.title.toString().DigitsToFarsi()}</Typography>
            <ul className={`text-right`} style={{paddingRight: 30}}>
                {props.conditions.map((condition,key) => {
                    return <li className={classes.condition} key={key}>
                        <Typography component={"p"} className={`f-small`}>
                            {condition.toString().DigitsToFarsi()}
                        </Typography>
                    </li>;
                })}
            </ul>
            <div className={classes.bottom}>
                <Typography className={`f-bold f-medium`}>هزینه&nbsp;&nbsp;{props.cost.toString().Delimiter().DigitsToFarsi()} تومان </Typography>
                <Link to={"payment/" + props.link} key={props.link} style={{color: "inherit", textDecoration: "none"}}>
                    <Button variant="contained" color="secondary" className={`mt-2 f-bolder`}>
                        ثبت نام
                    </Button>
                </Link>
            </div>
        </div>
    );
}
