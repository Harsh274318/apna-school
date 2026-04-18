import React, { useRef, useState } from "react";
import "./form.css"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
const TeacherForm = () => {
    const navigate = useNavigate()

    const formRef = useRef({
        name: "",
        email: "",
        phone: "",
        subject: "",
        experience: "",
        message: "",
    });

    const [formState, setFormState] = useState(formRef.current);
    const [lastSubmitTime, setLastSubmitTime] = useState(0);

    // handle input change (controlled + ref sync)
    const handleChange = (e) => {
        const { name, value } = e.target;

        formRef.current[name] = value; // store in ref
        setFormState({ ...formRef.current }); // update UI
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const now = Date.now();

        // ⏱️ 15 sec throttle
        if (now - lastSubmitTime < 15000) {
            alert("Please wait 15 seconds before submitting again.");
            return;
        }

        console.log("Submitted Data:", formRef.current);
        alert("Application Submitted!");

        setLastSubmitTime(now);

        const emptyForm = {
            name: "",
            email: "",
            phone: "",
            subject: "",
            experience: "",
            message: "",
        };

        formRef.current = emptyForm;
        setFormState(emptyForm);
    };

    return (
        <>
            <div className="tForm-image">

                <div className="form-container" >
                    <h2>Apply as a Teacher</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formState.phone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="experience"
                            placeholder="Years of Experience"
                            value={formState.experience}
                            onChange={handleChange}
                        />

                        <textarea
                            name="message"
                            placeholder="Why do you want to teach?"
                            value={formState.message}
                            onChange={handleChange}
                        />

                        <button type="submit">Apply Now</button>
                        <span className="RouteStude" onClick={() => navigate("/student")}> <h2> I am a student !</h2></span>
                    </form>
                </div>

            </div>
        </>
    );
}

export default TeacherForm;