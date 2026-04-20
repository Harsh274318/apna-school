import react, { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import Loading from "./Loading.jsx";
import api from "../../api.js"


const StudentForm = () => {

    const nameRef = useRef()
    const numberRef = useRef()
    const dobRef = useRef()
    const classRef = useRef()

    const [formInfo, setFormInfo] = useState({ name: "", number: "", dob: "", class: "" });
    const [state, setState] = useState({ message: "", err: "", loading: false })


    function handleSubmit(e) {
        e.preventDefault()
        const name = nameRef.current?.value?.trim();
        const number = numberRef.current?.value?.trim();
        const dob = dobRef.current?.value;
        const studentClass = classRef.current?.value?.trim();

        // NAME
        if (!name) return toast.warning("Name is required");
        if (name.length < 3) return toast.warning("Name must be at least 3 characters");
        if (!/^[a-zA-Z\s]+$/.test(name)) return toast.warning("Name only letters allowed");

        // NUMBER
        if (!number) return toast.warning("Mobile number is required");
        if (!/^[6-9]\d{9}$/.test(number)) return toast.warning("Enter valid 10 digit Indian number");

        // DOB
        if (!dob) return toast.warning("Date of birth is required");
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        if (age < 3 || age > 25) return toast.warning("Age must be between 3 to 25");

        // CLASS
        if (!studentClass) return toast.warning("Class is required");
        if (!/^\d+$/.test(studentClass)) return toast.warning("Class must be number");
        if (studentClass < 1 || studentClass > 12) return toast.warning("Class must be between 1 to 12");
        setFormInfo(prev => ({
            ...prev,
            name: nameRef.current.value,
            number: numberRef.current.value,
            dob: dobRef.current.value,
            class: classRef.current.value
        }))
        setState(prev => ({ ...prev, loading: true }))
        const payload = {
            name: nameRef.current.value,
            number: numberRef.current.value,
            dob: dobRef.current.value,
            class: classRef.current.value,
        }

        api.post('/student-query', payload)
            .then(() => {
                toast.success("Student registered successfully!");
                setState(prev => ({ ...prev, loading: false }));
            })
            .catch(() => {
                toast.error("Somthing is wrong!");
                setState(prev => ({ ...prev, loading: false }));
            })

    }


    return (
        <>
            <div
                className="tForm-image"
                id="student">
                {state.loading ? <Loading /> :
                    <div
                        className="form-container"

                    >

                        <h2>Student Form</h2>
                        <form className="Student-form" onSubmit={handleSubmit}>
                            <label htmlFor="name">Enter Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Harsh Vardhan Pal"
                                ref={nameRef}

                            />
                            <label htmlFor="number">Enter Number</label>
                            <input
                                type="number"
                                id="number"
                                name="number"
                                placeholder="9999999999"
                                ref={numberRef}

                            />
                            <label htmlFor="dob">Enter Date of Brith</label>
                            <input type="date"
                                id="dob"
                                name="dob"
                                ref={dobRef}
                            />
                            <label htmlFor="class">Enter your last class</label>
                            <input type="number"
                                id="class"
                                name="class"
                                placeholder="5"
                                ref={classRef}
                            />
                            <button type="submit">Apply Now</button>

                        </form>
                    </div>
                }
            </div>
        </>
    );
};
export default StudentForm;
