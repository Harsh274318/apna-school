import React from 'react'
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from 'react';
import Loading from '../components/forms/Loading';
import ProtectedRoute from './ProtectedRoute';
const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard'))
const UpdatePassword = lazy(() => import("../pages/UpdatePassword"));
const PostCard = lazy(() => import("../pages/PostCard"));
const CreatePost = lazy(() => import("../pages/CreatePost"));
const VeiwHomework = lazy(() => import("../pages/VeiwHomework"));
const Attendance = lazy(() => import("../pages/student/Attendance"))
const StudentRoute = () => {
    return (

        <Route path="/student" element={
            <ProtectedRoute allowRole="Student"><StudentDashboard /></ProtectedRoute>
        }>
            <Route index element={<Attendance />} />
            <Route path="homework" element={<VeiwHomework />} />
            <Route path="post" element={<PostCard />} />
            <Route path="Create-post" element={<CreatePost />} />
            <Route path="update-password" element={<UpdatePassword />} />

        </Route>
    )
}

export default StudentRoute