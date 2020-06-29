import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color : "#FFF",
    },
}));

export default function SimpleBackdrop({...props}) {
    const classes         = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <Backdrop className={classes.backdrop} open={props.open} transitionDuration={500}>
            <CircularProgress color="inherit" disableShrink={true} />
        </Backdrop>
    );
}
