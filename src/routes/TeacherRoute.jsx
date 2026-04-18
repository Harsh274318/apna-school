import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const TeacherDashboard = lazy(() => import("../pages/teacher/TeacherDashboard"));
const AddHomeWork = lazy(() => import("../pages/teacher/AddHomeWork"));
const AllStudents = lazy(() => import("../pages/teacher/AllStudents"));
const CreateStudent = lazy(() => import("../components/forms/CreateStudent"));
const UpdatePassword = lazy(() => import("../pages/UpdatePassword"));
const PostCard = lazy(() => import("../pages/PostCard"));
const CreatePost = lazy(() => import("../pages/CreatePost"));
const VeiwHomework = lazy(() => import("../pages/VeiwHomework"));
const MarkAttendance = lazy(() => import("../pages/teacher/MarkAttendance"));


const TeacherRoute = () => {
    return (


        <Route path="/teacher" element={<ProtectedRoute allowRole="Teacher"><TeacherDashboard /></ProtectedRoute>} >
            <Route index element={<AllStudents />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="add-homework" element={<AddHomeWork />} />
            <Route path="view-homework" element={<VeiwHomework />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="mark-attendance" element={<MarkAttendance />} />
            <Route path="create-student" element={<CreateStudent />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="view-post" element={<PostCard />} />
        </Route>

    )
}
export default TeacherRoute