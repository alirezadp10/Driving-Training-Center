import React from "react";

// Material components
import {
    CardHeader, TextField,
    withStyles,
} from "@material-ui/core";

const StyledCardHeader = withStyles({
    root : {
        textAlign      : "left",
        padding        : "0.85rem 1.5rem",
        marginBottom   : 0,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderBottom   : "1px solid rgba(0, 0, 0, 0.125)",
    },
    title: {
        fontSize  : "18px",
        lineHeight: "1.5",
        color     : "#212529",
        fontWeight: 700,
    },
})(CardHeader);

export default function App({...props}) {
    return (
        <StyledCardHeader title={props.title}>
            {props.children}
        </StyledCardHeader>
    );
}