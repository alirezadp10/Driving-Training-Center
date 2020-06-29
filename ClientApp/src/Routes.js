// Route Views
import Index from "./views/index";
import SignUp from "./views/auth/sign-up";
import SignIn from "./views/auth/sign-in";
import E404 from "./views/errors/404";
import TheoryExam from "./views/theory-exam";
import TheoryCourse from "./views/theory-course";
import News from "./views/news";
import Theory from "./views/theory";
import Payment from "./views/payment";
import Home from "./views/home";
import Exam from "./views/exam";
import FunctionalCourseCreate from "./views/functional-course-create";
import FunctionalCourse from "./views/functional-course";
import FunctionalExam from "./views/functional-exam";
import TeacherSchedule from "./views/teacher-schedule";

export default [
    {
        path     : "/",
        exact    : true,
        component: Index,
    },
    {
        path     : "/sign-up",
        component: SignUp,
    },
    {
        path     : "/sign-in",
        component: SignIn,
    },
    {
        path     : "/payment/:type?",
        exact    : true,
        component: Payment,
    },
    {
        path     : "/home",
        exact    : true,
        component: Home,
    },
    {
        path     : "/theory-course",
        exact    : true,
        component: TheoryCourse,
    },
    {
        path     : "/theory-exam",
        exact    : true,
        component: TheoryExam,
    },
    {
        path     : "/teacher-schedule",
        exact    : true,
        component: TeacherSchedule,
    },
    {
        path     : "/functional-course-create",
        exact    : true,
        component: FunctionalCourseCreate,
    },
    {
        path     : "/functional-course",
        exact    : true,
        component: FunctionalCourse,
    },
    {
        path     : "/functional-exam",
        exact    : true,
        component: FunctionalExam,
    },
    {
        path     : "/news/:id",
        exact    : true,
        component: News,
    },
    {
        path     : "/theory",
        exact    : true,
        component: Theory,
    },
    {
        path     : "/exam",
        exact    : true,
        component: Exam,
    },
    {
        path     : "/not-found",
        component: E404,
    },
];
