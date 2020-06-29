import React from "react";

// Material components
import {
    CardActions,
    withStyles,
} from "@material-ui/core";


const StyledCardActions = withStyles({
    root: {
        display        : "block",
        textAlign      : "right",
        padding        : "0.35rem 1.25rem",
        marginBottom   : 0,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderTop      : "1px solid rgba(0, 0, 0, 0.125)",
    },
})(CardActions);

export default function App({...props}) {
    return (
        <StyledCardActions>
            {props.children}
        </StyledCardActions>
    );
}