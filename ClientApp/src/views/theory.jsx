import React from "react";
import {Grid, Typography, Card} from "@material-ui/core";
import RTLContainer from "../components/RTLContainer";
import Layout from "./layouts/app";
import {Helmet} from "react-helmet";

export default class Theory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>آموزش آیین نامه</title>
                </Helmet>
                <RTLContainer>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} sm={6} md={8} lg={7}>
                            <Grid container spacing={1}>
                                <Grid item sm={12}>
                                    <Card className={`pb-4 pt-4 pl-4 pr-4`}>
                                        <Typography component={"h1"} className={`f-large f-bold`}>
                                            فصل اول- تعریف ها
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item sm={12}>
                                    <img src={require("../assets/images/image01.jpg")}
                                         width={"100%"}
                                         alt={"alt"} />
                                </Grid>
                                <Grid item sm={12}>
                                    <Card className={`pb-3 pt-3 pl-3 pr-3`}>
                                        <Typography component={"p"}
                                                    className={`f-lighter f-small`}>
                                            ماده 1- اصطلاحاتی که در این آیین نامه، دستورالعمل ها و پیوست های مربوط به
                                            کار رفته اند،
                                            دارای معانی مشروح زیر می باشند :
                                            <br />
                                            1- آزادراه: آزادراه به راهی گفته می شود که حداقل دارای دو خط اتومبیل رو و یک
                                            شانه حداقل
                                            به عرض 3 متر برای هر طرف رفت و برگشت بوده و دو طرف آن به نحوی محصور بوده و
                                            در تمام طول
                                            آزادراه از هم کاملاً مجزا باشد و ارتباط آنها با هم تنها به وسیله راه های
                                            فرعی که از زیر یا بالای آزادراه
                                            عبور کند تامین شود و هیچ راه دیگری آن را قطع نکند.
                                            <br />
                                            2- ابطال گواهی نامه: سلب اعتبار قانونی گواهی نامه رانندگی.
                                            <br />
                                            3- اتومبیل: هر نوع خودرو که لااقل دارای دو چرخ در جلو و دو چرخ دیگر در عقب
                                            بوده و برای
                                            حمل بار یا انسان به کار رود.
                                            <br />
                                            4- اتومبیل آموزشی: خودرویی است که برای آموزش رانندگی اختصاص داده شده و باید
                                            دارای
                                            دو پدال کلاچ و دو پدال ترمز ، دو آیینه، تابلوی ویژه روی سقف و علایم مشخص روی
                                            بدنه و متعلق و یا
                                            تحت پوشش یکی از آموزشگاه های مجاز آموزش رانندگی باشد.
                                            <br />
                                            5- اتومبیل مدارس: خودرویی جمعی است که برای رفت و آمد دانش آموزان مدارس
                                            اختصاص
                                            داده شده است و دارای رنگ و علایم مشخص کننده می باشد.
                                            <br />
                                            6- ارتفاع چراغ: فاصله مرکز چراغ خودرو بدون بار یا مسافر تا کف راه.
                                            <br />
                                            7- اعتبار برگ معاینه فنی: زمان درج شده در متن برگ معاینه فنی وسیله نقلیه
                                            است.
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </RTLContainer>
            </Layout>
        );
    }
}