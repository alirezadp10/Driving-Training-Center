import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LessonList from "./LessonList";

function a11yProps(index) {
    return {
        id             : `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index   : PropTypes.any.isRequired,
    value   : PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width          : "100%",
        flexGrow       : 1,
    },
}));

export default function FullWidthTabs({...props}) {
    const classes           = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="license tab"
                >
                    {props.tabs.map(
                        (tab, key) => (
                            <Tab label={tab.label}
                                 {...a11yProps(key)}
                                 key={key} />
                        ),
                    )}
                </Tabs>
            </AppBar>
            {props.tabs.map(
                (tab, key) => (
                    <TabPanel value={value}
                              index={key}
                              dir={"rtl"}
                              key={key}>
                        <img alt={tab.label} src={tab.image} style={{height: 350}} className={`w-100`} />
                        <LessonList list={tab.lessons} />
                    </TabPanel>
                ),
            )}
        </div>
    );
}
