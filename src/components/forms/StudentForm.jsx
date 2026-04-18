import react, { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import Loading from "./Loading.jsx"
import axios from "axios";

const StudentForm = () => {

    const nameRef = useRef()
    const numberRef = useRef()
    const dobRef = useRef()
    const classRef = useRef()

    const [formInfo, setFormInfo] = useState({ name: "", number: "", dob: "", class: "" });
    const [state, setState] = useState({ message: "", err: "", loading: false })


    async function handleSubmit(e) {
        e.preventDefault()
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

        const res = await axios.post('http://localhost:3000/api/addToSheet', payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(res.data)

        // const data = await res.json();

        // if (data.success) {
        //     toast.success("Student registered successfully!");
        //     setState(prev => ({ ...prev, loading: false }));
        //     nameRef.current.value = "";
        //     numberRef.current.value = "";
        //     dobRef.current.value = "";
        //     classRef.current.value = "";
        // } else {
        //     toast.error("Error: " + data.error);
        //     setState(prev => ({ ...prev, loading: false }));
        // }
    }


    return (
        <>
            <div
                className="tForm-image"
                // className="Student-form-img"
                id="student">
                {state.loading ? <Loading /> :
                    <div
                        className="form-container"
                    // className="Student-form-div"
                    >

                        <h2
                        // className="Student-heading"
                        >Student Form</h2>
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
