import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Container, Grid, Typography} from "@material-ui/core";
import RTLContainer from "../../../components/RTLContainer";

const useStyles = makeStyles((theme) => ({
    wrapper  : {
        background    : "#E8E8E8",
        justifyContent: "center",
        alignItems    : "center",
        textAlign     : "-webkit-center",
        width         : "100%",
    },
    rightSide: {
        textAlign     : "right",
        justifyContent: "right",
    },
    leftSide : {
        textAlign     : "right",
        justifyContent: "right",
    },
}));

export default function Footer({...props}) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <RTLContainer>
                <Container maxWidth="lg" className={`p-4`}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} className={classes.rightSide}>
                            <Typography className={`f-small`}>ثبت نام</Typography>
                            <Typography className={`f-small`}>مدیریت آموزشی</Typography>
                            <Typography className={`f-small`}>شرایط و مدارک</Typography>
                            <Typography className={`f-small`}>درباره ما</Typography>
                            <Typography className={`f-small`}>تماس با ما</Typography>
                        </Grid>
                        <Grid item xs={10} className={classes.leftSide}>
                            <Typography className={`f-small`}>نشانی: تهران، فلکه چهارم تهرانپارس، خیابان وفادار شرقی</Typography>
                            <Typography className={`f-small`}>تلفن: ۷۷۳۷۵۳۶۴ (۰۲۱)</Typography>
                            <Typography className={`f-small`}>پست الکترونیک: info@etehad.net</Typography>
                            <Typography className={`f-small f-bold`}>© ۱۳۹۹ کلیه حقوق برای آموزشگاه رانندگی محفوظ است.</Typography>
                            <Typography className={`f-small`}>هرگونه کپی برداری از مطالب و محتوای این وب‌‌سایت بدون
                                        مجوز کتبی نقض قانون حمایت از
                                        تولیدکنندگان محتوای اینترنتی می‌‌باشد و تحت پیگیرد
                                        قانونی قرار خواهد گرفت.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </RTLContainer>
        </div>
    );
}