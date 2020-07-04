import React from "react";
import {
    AppBar,
    Badge,
    IconButton,
    InputBase,
    makeStyles,
    MenuItem,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchTwoTone";
import AccountCircle from "@material-ui/icons/AccountCircleTwoTone";
import MailIcon from "@material-ui/icons/MailTwoTone";
import NotificationsIcon from "@material-ui/icons/NotificationsTwoTone";
import MoreIcon from "@material-ui/icons/MoreVertTwoTone";
import Drawer from "./drawer";
import NavBarMenu from "../../../components/NavBarMenu";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    appbar        : {
        width          : `calc(100% - 250px)`,
        marginRight    : 250,
    },
    link          : {
        color         : "inherit",
        textDecoration: "none",
        "&:hover"     : {
            color         : "inherit",
            textDecoration: "none",
        },
    },
    list          : {
        width: 350,
    },
    grow          : {
        flexGrow: 1,
    },
    menuButton    : {
        marginLeft: theme.spacing(2),
    },
    title         : {
        fontFamily                  : "IRANSans",
        color                       : "white",
        fontWeight                  : "bold",
        display                     : "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search        : {
        position                      : "relative",
        borderRadius                  : theme.shape.borderRadius,
        backgroundColor               : "#32424A",
        "&:hover"                     : {
            backgroundColor: "#546E7A",
        },
        marginRight                   : 0,
        marginLeft                    : theme.spacing(2),
        width                         : "100%",
        [theme.breakpoints.up("sm")]  : {
            display   : "flex",
            marginLeft: theme.spacing(3),
            width     : "auto",
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    searchIcon    : {
        width         : theme.spacing(7),
        height        : "100%",
        position      : "absolute",
        pointerEvents : "none",
        display       : "flex",
        alignItems    : "center",
        justifyContent: "center",
    },
    inputRoot     : {
        color: "inherit",
    },
    inputInput    : {
        textAlign                   : "right",
        direction                   : "rtl",
        fontFamily                  : "IRANSans",
        padding                     : theme.spacing(1, 1, 1, 7),
        transition                  : theme.transitions.create("width"),
        width                       : "100%",
        [theme.breakpoints.up("md")]: {
            width: 200,
        },
    },
    sectionDesktop: {
        // display                     : "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile : {
        display                     : "none",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    button        : {
        margin         : "0 5px",
        fontFamily     : "IRANSans",
        backgroundColor: "#EAEAEA",
    },
    menuItem      : {
        fontFamily: "IRANSans",
    },
}));

function HideOnScroll(props) {
    const {children} = props;
    const trigger    = useScrollTrigger({target: undefined});
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Navbar({...props}) {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <NavBarMenu
                anchorEl={props.mobileMenu}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                transformOrigin={{vertical: "bottom", horizontal: "center"}}
                keepMounted
                open={Boolean(props.mobileMenu)}
                onClose={props.mobileMenuClose}
            >
                <MenuItem>
                    <IconButton aria-label="Show 4 new mails" color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>پیام ها</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="Show 11 new notifications" color="inherit">
                        <Badge badgeContent={3} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>اعلانات</p>
                </MenuItem>
                <MenuItem onClick={props.userMenuOpen}>
                    <IconButton
                        aria-label="Account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>صفحه ی من</p>
                </MenuItem>
            </NavBarMenu>
            <NavBarMenu
                keepMounted
                anchorOrigin={{
                    vertical  : "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical  : "top",
                    horizontal: "left",
                }}
                anchorEl={props.userMenu}
                open={Boolean(props.userMenu)}
                onClose={props.userMenuClose}
            >
                <MenuItem onClick={props.logout} className={classes.menuItem}>خروج</MenuItem>
            </NavBarMenu>
            <HideOnScroll {...props}>
                <AppBar className={classes.appbar}>
                    <Toolbar>
                        {/* user */}
                        <div className={classes.sectionDesktop}>
                            <div>
                                <IconButton
                                    color="inherit"
                                    onClick={props.userMenuOpen}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <IconButton aria-label="Show 3 new notifications" color="inherit">
                                    <Badge badgeContent={3} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton aria-label="Show 1 new mails" color="inherit">
                                    <Badge badgeContent={1} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                            </div>
                        </div>
                        {/* more */}
                        <div className={classes.sectionMobile}>
                            <IconButton
                                onClick={props.mobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                        {/* search */}
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="جست و جو"
                                classes={{
                                    root : classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{"aria-label": "Search"}}
                            />
                        </div>
                        {/* gap */}
                        <div className={classes.grow} />
                        {/* site name */}
                        <Link to={"/"} style={{color: "inherit", textDecoration: "none"}}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                آموزشگاه رانندگی
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Drawer right={props.right}
                    username={props.username} />
        </div>
    );
}
