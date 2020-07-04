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

import Dashboard from "./views/admin/dashboard";
import AdminLicenses from "./views/admin/license/index";
import AdminLicenseCreate from "./views/admin/license/create";
import AdminNews from "./views/admin/news/index";
import AdminNewsCreate from "./views/admin/news/create";
import AdminCategories from "./views/admin/category/index";
import AdminCategoryCreate from "./views/admin/category/create";
import AdminTeachers from "./views/admin/teacher/index";
import AdminTeacherCreate from "./views/admin/teacher/create";
import AdminStaffs from "./views/admin/staff/index";
import AdminStaffCreate from "./views/admin/staff/create";
import AdminOfficers from "./views/admin/officer/index";
import AdminOfficerCreate from "./views/admin/officer/create";
import AdminLessons from "./views/admin/lesson/index";
import AdminLessonCreate from "./views/admin/lesson/create";
import AdminQuestions from "./views/admin/question/index";
import AdminQuestionCreate from "./views/admin/question/create";
import AdminVehicles from "./views/admin/vehicle/index";
import AdminVehicleCreate from "./views/admin/vehicle/create";
import AdminSchedules from "./views/admin/schedule/index";
import AdminScheduleCreate from "./views/admin/schedule/create";
import AdminTheoryCourses from "./views/admin/theoryCourse/index";
import AdminTheoryCourseCreate from "./views/admin/theoryCourse/create";
import AdminTheoryExams from "./views/admin/theoryExam/index";
import AdminTheoryExamCreate from "./views/admin/theoryExam/create";
import AdminSignIn from "./views/admin/sign-in";

export default [
    {
        path     : "/admin/sign-in",
        component: AdminSignIn,
    },
    {
        path     : "/admin/licenses",
        exact    : true,
        component: AdminLicenses,
    },
    {
        path     : "/admin/license/create",
        exact    : true,
        component: AdminLicenseCreate,
    },
    {
        path     : "/admin/news",
        exact    : true,
        component: AdminNews,
    },
    {
        path     : "/admin/news/create",
        exact    : true,
        component: AdminNewsCreate,
    },
    {
        path     : "/admin/categories",
        exact    : true,
        component: AdminCategories,
    },
    {
        path     : "/admin/category/create",
        exact    : true,
        component: AdminCategoryCreate,
    },
    {
        path     : "/admin/teachers",
        exact    : true,
        component: AdminTeachers,
    },
    {
        path     : "/admin/teacher/create",
        exact    : true,
        component: AdminTeacherCreate,
    },
    {
        path     : "/admin/staffs",
        exact    : true,
        component: AdminStaffs,
    },
    {
        path     : "/admin/staff/create",
        exact    : true,
        component: AdminStaffCreate,
    },
    {
        path     : "/admin/officers",
        exact    : true,
        component: AdminOfficers,
    },
    {
        path     : "/admin/officer/create",
        exact    : true,
        component: AdminOfficerCreate,
    },
    {
        path     : "/admin/lessons",
        exact    : true,
        component: AdminLessons,
    },
    {
        path     : "/admin/lesson/create",
        exact    : true,
        component: AdminLessonCreate,
    },
    {
        path     : "/admin/questions",
        exact    : true,
        component: AdminQuestions,
    },
    {
        path     : "/admin/question/create",
        exact    : true,
        component: AdminQuestionCreate,
    },
    {
        path     : "/admin/vehicles",
        exact    : true,
        component: AdminVehicles,
    },
    {
        path     : "/admin/vehicle/create",
        exact    : true,
        component: AdminVehicleCreate,
    },
    {
        path     : "/admin/schedules",
        exact    : true,
        component: AdminSchedules,
    },
    {
        path     : "/admin/schedule/create",
        exact    : true,
        component: AdminScheduleCreate,
    },
    {
        path     : "/admin/theory-courses",
        exact    : true,
        component: AdminTheoryCourses,
    },
    {
        path     : "/admin/theory-course/create",
        exact    : true,
        component: AdminTheoryCourseCreate,
    },
    {
        path     : "/admin/theory-exams",
        exact    : true,
        component: AdminTheoryExams,
    },
    {
        path     : "/admin/theory-exam/create",
        exact    : true,
        component: AdminTheoryExamCreate,
    },

    {
        path     : "/admin",
        exact    : true,
        component: Dashboard,
    },
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
        path     : "/lesson/:id",
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
