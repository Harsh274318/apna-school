import React, { useContext, useRef, useState } from "react";
import "./form.css"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import api from "../../api";
import Context from "../context/Context";
import { toast } from "react-toastify";
import Loading from "./Loading";
const TeacherForm = () => {
    const navigate = useNavigate()
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const subjectRef = useRef()
    const experienceRef = useRef()
    const messageRef = useRef()
    const { apiData, setApiData } = useContext(Context)






    const handleSubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current?.value?.trim();
        const email = emailRef.current?.value?.trim();
        const number = phoneRef.current?.value?.trim();
        const subject = subjectRef.current?.value?.trim();
        const experience = experienceRef.current?.value?.trim();
        const message = messageRef.current?.value?.trim();

        if (!name) return toast.warning("Name is required");
        if (name.length < 3) return toast.warning("Name must be at least 3 characters");
        if (!/^[a-zA-Z\s]+$/.test(name)) return toast.warning("Only letters allowed");

        if (!email) return toast.warning("Email is required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return toast.warning("Invalid email format");
        if (!number) return toast.warning("Phone number is required");
        if (!/^[6-9]\d{9}$/.test(number))
            return toast.warning("Enter valid 10 digit Indian number");

        if (!subject) return toast.warning("Subject is required");
        if (subject.length < 2) return toast.warning("Subject too short");

        if (!experience) return toast.warning("Experience is required");
        if (!/^\d+$/.test(experience))
            return toast.warning("Experience must be a number");
        if (experience < 0 || experience > 50)
            return toast.warning("Enter valid experience (0–50 years)");

        if (!message) return toast.warning("Message is required");
        if (message.length < 10)
            return toast.warning("Message must be at least 10 characters");

        const data = {
            name,
            email,
            number,
            subject,
            experience,
            message
        }
        setApiData(prev => ({ ...prev, loading: true }))
        api.post("/teacher-query", data)
            .then(() => {
                nameRef.current.value = ""
                emailRef.current.value = ""
                phoneRef.current.value = ""
                subjectRef.current.value = ""
                experienceRef.current.value = ""
                messageRef.current.value = ""
                setApiData(prev => ({ ...prev, loading: false }))
                toast.success("Query sent successfully")
            })
            .catch(() => {
                setApiData(prev => ({ ...prev, loading: false }))
                toast.error("Something is wrong");
            })


    };

    return (
        <>
            {apiData.loading && <Loading />}
            <div className="tForm-image">

                <div className="form-container" >
                    <h2>Apply as a Teacher</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            ref={nameRef}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            ref={emailRef}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            ref={phoneRef}
                            required
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            ref={subjectRef}
                            required
                        />

                        <input
                            type="number"
                            name="experience"
                            placeholder="Years of Experience"
                            ref={experienceRef}
                        />

                        <textarea
                            name="message"
                            placeholder="Why do you want to teach?"
                            ref={messageRef}
                        />

                        <button type="submit">Apply Now</button>
                        <span style={{ fontSize: "2px" }} className="RouteStude" onClick={() => navigate("student-query")}> <h2> I am a student !</h2></span>
                    </form>
                </div>

            </div>
        </>
    );
}

export default TeacherForm;