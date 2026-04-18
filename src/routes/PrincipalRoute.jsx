import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/forms/Loading";
const PrincipalDesboard = lazy(() => import("../pages/principal/PrincipalDeboard"))
const UpdatePassword = lazy(() => import("../pages/UpdatePassword"))
const ResetPassword = lazy(() => import("../pages/ResetPassword"))
import AllTeachers from "../pages/principal/AllTeachers";
import ProtectedRoute from "./ProtectedRoute";
// const AllTeachers = lazy(() => import("../pages/principal/AllTeachers"))
const ViewStudents = lazy(() => import("../pages/principal/ViewStudents"))
const VeiwHomework = lazy(() => import("../pages/VeiwHomework"))
const AddSessions = lazy(() => import("../pages/principal/AddSessions"))
const CreateTeacher = lazy(() => import("../components/forms/CreateTeacher"))
const CreatePost = lazy(() => import("../pages/CreatePost"))
const PostCard = lazy(() => import("../pages/PostCard"))


const PrincipalRoute = () => {

    return (
        <Route path="/principal" element={<ProtectedRoute allowRole="Principal"><PrincipalDesboard /></ProtectedRoute>
        }>
            <Route index element={<AllTeachers />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="view-student" element={<ViewStudents />} />
            <Route path="view-homework" element={<VeiwHomework />} />
            <Route path="add-session" element={<AddSessions />} />
            <Route path="create-teacher" element={<CreateTeacher />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="view-post" element={< PostCard />} />
        </Route>





    )
}

export default PrincipalRoute