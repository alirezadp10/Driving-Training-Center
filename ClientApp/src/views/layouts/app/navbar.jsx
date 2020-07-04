import React from "react";
import {
    AppBar,
    Badge,
    Button,
    IconButton,
    InputBase,
    makeStyles,
    MenuItem,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MenuSharp";
import SearchIcon from "@material-ui/icons/SearchTwoTone";
import AccountCircle from "@material-ui/icons/AccountCircleTwoTone";
import MailIcon from "@material-ui/icons/MailTwoTone";
import NotificationsIcon from "@material-ui/icons/NotificationsTwoTone";
import MoreIcon from "@material-ui/icons/MoreVertTwoTone";
import Drawer from "./drawer";
import NavBarMenu from "../../../components/NavBarMenu";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
    fullList      : {
        width: "auto",
    },
    grow          : {
        flexGrow: 1,
    },
    menuButton    : {
        marginLeft: theme.spacing(2),
    },
    title         : {
        fontFamily                  : "IRANSans",
        fontWeight                  : "bold",
        display                     : "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search        : {
        position                      : "relative",
        borderRadius                  : theme.shape.borderRadius,
        backgroundColor               : "#e3e3e3",
        "&:hover"                     : {
            backgroundColor: "#f2f2f2",
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
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        {/* user */}
                        <div className={classes.sectionDesktop}>
                            {props.isLogin &&
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
                            }
                            {!props.isLogin &&
                            <div>
                                <Link to="/sign-up" className={classes.link}>
                                    <Button variant="contained" className={classes.button}>
                                        ثبت نام
                                    </Button>
                                </Link>
                                <Link to="/sign-in" className={classes.link}>
                                    <Button variant="contained" className={classes.button}>
                                        ورود
                                    </Button>
                                </Link>
                            </div>
                            }
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
                        {/* drawer */}
                        {
                            props.isLogin &&
                            <IconButton
                                onClick={props.toggleDrawer("right", true)}
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Open drawer"
                            >
                                <MenuIcon />
                            </IconButton>
                        }
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
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
            {
                props.isLogin &&
                <Drawer right={props.right}
                        username={props.username}
                        toggleDrawer={(side, open) => props.toggleDrawer(side, open)} />
            }
        </div>
    );
}
