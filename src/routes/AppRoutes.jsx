import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/forms/Loading";
import ProtectedRoute from "./ProtectedRoute";


// Public
import Hero from "../components/forms/Hero"
import PrincipalDesboard from "../pages/principal/PrincipalDeboard";
import AllTeachers from "../pages/principal/AllTeachers";
import ResetPassword from "../pages/ResetPassword";
import ViewStudents from "../pages/principal/ViewStudents";
import AddSessions from "../pages/principal/AddSessions";
import CreateTeacher from "../components/forms/CreateTeacher";

import SocialPage from "../pages/SocialPage";
// const Hero = lazy(() => import("../components/forms/Hero"))
const LoginForm = lazy(() => import("../components/forms/LoginForm"));
const PrincipalForm = lazy(() => import("../components/forms/PrincipalForm"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));


// Principal
const PrincipalDashboard = lazy(
    () => import("../pages/principal/PrincipalDeboard"),
);


// Teacher
// const TeacherDashboard = lazy(
//     () => import("../pages/teacher/TeacherDashboard"),
// );
import TeacherDashboard from "../pages/teacher/TeacherDashboard";

// Student
const StudentDashboard = lazy(
    () => import("../pages/student/StudentDashboard"),
);

const StudentForm = lazy(() => import("../components/forms/StudentForm"));
const TeacherForm = lazy(() => import("../components/forms/TeacherForm"));
const Attendance = lazy(() => import("../pages/student/Attendance"));
const VeiwHomework = lazy(() => import("../pages/VeiwHomework"));
const PostCard = lazy(() => import("../pages/PostCard"));
const CreatePost = lazy(() => import("../pages/CreatePost"));
const UpdatePassword = lazy(() => import("../pages/UpdatePassword"));
const AllStudents = lazy(() => import("../pages/teacher/AllStudents"));
const AddHomeWork = lazy(() => import("../pages/teacher/AddHomeWork"));
const MarkAttendance = lazy(() => import("../pages/teacher/MarkAttendance"));
// const CreateStudent = lazy(() => import("../components/forms/CreateStudent"));
// Social
import CreateStudent from "../components/forms/CreateStudent";
import PublicPost from "../pages/PublicPost";

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Hero />}>


                    <Route index element={<StudentForm />} />
                    <Route path="student-query" element={<StudentForm />} />
                    <Route path="teacher-query" element={<TeacherForm />} />
                    <Route path="login" element={<LoginForm />} />

                </Route >
                <Route path="/public-post" element={<PublicPost />} />
                <Route path="/principal" element={<ProtectedRoute allowRole="Principal"><PrincipalDesboard /></ProtectedRoute>}>
                    <Route index element={<AllTeachers />} />
                    <Route path="update-password" element={<UpdatePassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route path="view-student" element={<ViewStudents />} />
                    <Route path="view-homework" element={<VeiwHomework />} />
                    <Route path="add-session" element={<AddSessions />} />
                    <Route path="create-teacher" element={<CreateTeacher />} />
                    {/* <Route path="create-post" element={<CreatePost />} /> */}
                    <Route path="view-post" element={< SocialPage />} />
                </Route>
                <Route path="/teacher" element={<ProtectedRoute allowRole="Teacher"><TeacherDashboard /></ProtectedRoute>} >
                    <Route index element={<AllStudents />} />
                    <Route path="create-student" element={<CreateStudent />} />
                    <Route path="update-password" element={<UpdatePassword />} />
                    <Route path="add-homework" element={<AddHomeWork />} />
                    <Route path="view-homework" element={<VeiwHomework />} />
                    <Route path="update-password" element={<UpdatePassword />} />
                    <Route path="mark-attendance" element={<MarkAttendance />} />
                    {/* <Route path="create-post" element={<CreatePost />} /> */}
                    <Route path="view-post" element={< SocialPage />} />
                </Route>

                <Route path="/student" element={
                    <ProtectedRoute allowRole="Student"><StudentDashboard /></ProtectedRoute>
                }>
                    <Route index element={<Attendance />} />
                    <Route path="homework" element={<VeiwHomework />} />
                    <Route path="social" element={<SocialPage />} />

                    <Route path="update-password" element={<UpdatePassword />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
