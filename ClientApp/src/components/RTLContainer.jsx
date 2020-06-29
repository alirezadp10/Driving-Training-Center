import React from "react";
// Material components
import {createMuiTheme} from "@material-ui/core";
// Material styles
import {jssPreset, StylesProvider, ThemeProvider} from "@material-ui/styles";
import {create} from "jss";
import rtl from "jss-rtl";

const jss = create({
    plugins: [
        ...jssPreset().plugins,
        rtl(),
    ],
});

const theme = createMuiTheme({
    direction : "rtl",
    typography: {
        fontFamily: "IRANSans",
    },
});

export default function App({...props}) {
    return (
        <div dir="rtl" className={`text-right`}>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    {props.children}
                </ThemeProvider>
            </StylesProvider>
        </div>
    );
}
