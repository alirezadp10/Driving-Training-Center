import React from "react";
import {createMuiTheme} from "@material-ui/core";
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
    direction : "ltr",
    typography: {
        fontFamily: "IRANSans",
        fontWeight: 200,
    },
});

export default function App({...props}) {
    return (
        <div dir="rtl">
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    {props.children}
                </ThemeProvider>
            </StylesProvider>
        </div>
    );
}
