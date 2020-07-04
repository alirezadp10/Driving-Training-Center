import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {BorderColor, Home, School} from "@material-ui/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardTeacher, faIdCard} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@material-ui/core";
import RTLContainer from "../../../components/RTLContainer";
import {Link} from "react-router-dom";
// Material styles

const useStyles = makeStyles(theme => ({
    list : {
        width: 250,
        color: "white",
    },
    paper: {
        background: "#263238",
    },
    icon : {
        color: "white",
    },
    toolbar: theme.mixins.toolbar,
}));

export default function App({...props}) {
    const classes = useStyles();
    return (
        <Drawer
            classes={{
                paper: classes.paper,
            }}
            anchor="right"
            variant="permanent"
        >
            <RTLContainer>
                <div className={classes.toolbar} />
                <div className={classes.list} role="presentation">
                    <List>
                        {[
                            {
                                "text": "گواهی نامه ها",
                                "path": "/admin/licenses",
                                "icon": <FontAwesomeIcon className={`${classes.icon} mr-1`}
                                                         icon={faChalkboardTeacher} />,
                            },
                            {
                                "text": "کارمندان",
                                "path": "/admin/staffs",
                                "icon": <BorderColor className={classes.icon} />,
                            },
                            {
                                "text": "افسر ها",
                                "path": "/admin/officers",
                                "icon": <FontAwesomeIcon className={`${classes.icon} mr-1`}
                                                         icon={faIdCard} />,
                            },
                            {
                                "text": "مربیان",
                                "path": "/admin/teachers",
                                "icon": <BorderColor className={classes.icon} />,
                            },
                            {
                                "text": "برنامه هفتگی",
                                "path": "/admin/schedules",
                                "icon": <School className={classes.icon} />,
                            },
                            {
                                "text": "اخبار",
                                "path": "/admin/news",
                                "icon": <FontAwesomeIcon className={`${classes.icon} mr-1`}
                                                         icon={faChalkboardTeacher} />,
                            },
                            {
                                "text": "دسته‌بندی ها",
                                "path": "/admin/categories",
                                "icon": <School className={classes.icon} />,
                            },
                            {
                                "text": "دوره های تئوری",
                                "path": "/admin/theory-courses",
                                "icon": <School className={classes.icon} />,
                            },
                            {
                                "text": "درس ها",
                                "path": "/admin/lessons",
                                "icon": <School className={classes.icon} />,
                            },
                            {
                                "text": "آزمون تئوری",
                                "path": "/admin/theory-exams",
                                "icon": <School className={classes.icon} />,
                            },
                            {
                                "text": "سوالات",
                                "path": "/admin/questions",
                                "icon": <School className={classes.icon} />,
                            },
                            {
                                "text": "ماشین ها",
                                "path": "/admin/vehicles",
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
                </div>
            </RTLContainer>
        </Drawer>
    );
}
