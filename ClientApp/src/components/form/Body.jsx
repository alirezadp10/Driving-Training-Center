import React from "react";

// Material components
import {
    CardContent,
} from "@material-ui/core";

export default function App({...props}) {
    return (
        <CardContent>
            {props.children}
        </CardContent>
    );
}