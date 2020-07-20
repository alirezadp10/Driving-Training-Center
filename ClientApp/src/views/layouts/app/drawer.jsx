import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {BorderColor, Home, School, SettingsApplications, VpnKey} from "@material-ui/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardTeacher,faIdCard} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@material-ui/core";
import RTLContainer from "../../../components/RTLContainer";
import {Link} from "react-router-dom";
// Material styles

const useStyles = makeStyles(theme => ({
    list : {
        width: 350,
        color: "black",
    },
    paper: {
        background: "#EDEDED",
    },
    icon : {
        color: "black",
    },
}));

export default function Drawer({...props}) {
    const classes = useStyles();
    return (
        <SwipeableDrawer
            classes={{
                paper: classes.paper,
            }}
            anchor="right"
            open={props.right}
            onClose={props.toggleDrawer("right", false)}
            onOpen={props.toggleDrawer("right", true)}
        >
            <RTLContainer>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={props.toggleDrawer("right", false)}
                    onKeyDown={props.toggleDrawer("right", false)}
                >
                    <img src={require("../../../assets/images/image01.jpg")} style={{
                        width : "100%",
                        height: "200px",
                    }} />
                    <List>
                        {[
                            {
                                "text": "داشبورد",
                                "path": `/home`,
                                "icon": <Home className={classes.icon} />,
                            },
                            {
                                "text": "آموزش آیین نامه",
                                "path": "/theory-course",
                                "icon": <FontAwesomeIcon className={`${classes.icon} mr-1`}
                                                         icon={faChalkboardTeacher} />,
                            },
                            {
                                "text": "آزمون آیین نامه",
                                "path": "/theory-exam",
                                "icon": <BorderColor className={classes.icon} />,
                            },
                            {
                                "text": "آموزش عملی",
                                "path": localStorage["foo"] ? "/functional-course" : "functional-course-create",
                                "icon": <FontAwesomeIcon className={`${classes.icon} mr-1`}
                                                         icon={faIdCard} />,
                            },
                            {
                                "text": "آزمون عملی",
                                "path": "/functional-exam",
                                "icon": <School className={classes.icon} />,
                            },
                        ].map((item, index) => (
                            <Link to={item.path} key={index} style={{color: "inherit", textDecoration: "none"}}>
                                <ListItem button>
                                    <ListItemIcon color={"white"}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {[
                            {
                                "text": "تنظیمات کاربری",
                                "path": "/settings",
                                "icon": <SettingsApplications className={classes.icon} />,
                            },
                            {
                                "text": "تغییر رمز عبور",
                                "path": "/change-password",
                                "icon": <VpnKey className={classes.icon} />,
                            },
                        ].map((item, index) => (
                            <Link to={item.path} key={index} style={{color: "inherit", textDecoration: "none"}}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </div>
            </RTLContainer>
        </SwipeableDrawer>
    );
}
