import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import Context from "../context/context";
import { GiEyelashes, GiEyeOfHorus } from "react-icons/gi";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const CreateTeacher = () => {
    const { apiData, setApiData } = useContext(Context);
    const [flag, setFlag] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const otpRef = useRef();
    const imageRef = useRef();
    const classRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()
    function handelOTP(e) {
        e.preventDefault();
        if (!nameRef.current.value.trim() || !emailRef.current.value.trim())
            return toast.error("Someting is Worng!");
        setApiData((prev) => ({
            ...prev,
            loading: true,
        }));
        // console.log(emailRef.curr ent.value.trim())
        api.post("/notify/send-otp", {
            email: emailRef.current.value.trim(),
        })
            .then((res) => {
                setApiData((prev) => ({
                    ...prev,
                    loading: false,
                }));
                toast.success(res?.data?.message || "Otp sended on email");
            })
            .catch((err) => {
                setApiData((prev) => ({
                    ...prev,
                    loading: false,
                }));
                toast.error(err?.message || "Something is Worng!");
            });
    }

    function handelSubmit(e) {
        e.preventDefault();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        if (!gender) return toast.error("Select gender");
        const classValue = Number(classRef.current.value);
        if (!classRef.current.value || classValue < 1 || classValue > 12) {
            return toast.error("Class must be between 1 to 12");
        }

        if (
            !nameRef.current.value.trim() ||
            !emailRef.current.value.trim() ||
            !passwordRef.current.value.trim() ||
            !otpRef.current.value.trim()

        )
            return toast.error("Check all  filed");
        if (otpRef.current.value.length !== 6) return toast.error("Otp must have 6 digits");
        const password = passwordRef.current.value.trim();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!regex.test(password)) {
            return toast.error("Password must be Strong");
        }
        const file = imageRef.current.files[0];
        if (!file) return toast.error("Image is missing");
        if (file) {
            const sizeInMB = file.size / (1024 * 1024);
            if (sizeInMB > 3) return toast.error("File must be less than 3MB");
        }
        const form = new FormData();
        form.append("name", nameRef.current.value.trim());
        form.append("email", emailRef.current.value.trim());
        form.append("password", password);
        form.append("otp", otpRef.current.value.trim())
        form.append("asClass", classValue);
        form.append("image", file);
        form.append("gender", gender);
        setApiData(prev => ({
            ...prev,
            loading: true
        }));
        api.post("/create-teacher", form
        ).then(res => {
            setApiData(prev => (
                {
                    ...prev, data: res.data.data, loading: false
                }
            ))

            toast.success("Teacher created successfully")
        })
            .catch(err => {
                setApiData(prev => (
                    {
                        ...prev, loading: false
                    }
                ))
                toast.error(err?.message || "Somethig is Worng")
            })

    }
    return (
        <>{apiData.loading && <Loading />}
            <div style={styles.container} >
                {/* <div className="form-container" > */}
                {/* <button type="button" className="cut" id="cut" onClick={() => navigate(-1)}><RxCross2 /></button> */}
                <form onSubmit={handelSubmit} style={styles.form}>

                    <h2 style={styles.heading}>Teacher's Form</h2>
                    <label htmlFor="name" style={styles.label}>
                        Full Name
                    </label>
                    <input
                        type="text"
                        style={styles.input}
                        ref={nameRef}
                        placeholder="Harsh Vardhan Pal"
                    />
                    <label htmlFor="email" style={styles.label}>
                        Valid Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id=""
                        style={styles.input}
                        placeholder="validemail@gmail.com"
                        ref={emailRef}
                    />
                    <button type="button" onClick={handelOTP} style={styles.button}>
                        Send OTP
                    </button>
                    <label htmlFor="otp" style={styles.label}>
                        Enter OTP
                    </label>
                    <input
                        type="number"
                        name="otp"
                        id="otp"
                        ref={otpRef}
                        style={styles.input}
                        placeholder="123456"
                    />
                    <label htmlFor="password" style={styles.label}>
                        Create a strong Password
                    </label>
                    <div className="password-div">
                        <input
                            type={flag ? "text" : "password"}
                            id="password"
                            ref={passwordRef}
                            className="passwordinput"
                            placeholder="H@rash123"
                        />
                        <span id="toggle" onClick={() => setFlag(!flag)}>
                            {flag ? (
                                <GiEyeOfHorus className="close" />
                            ) : (
                                <GiEyelashes className="close" />
                            )}
                        </span>
                    </div>
                    <label htmlFor="file" style={styles.label}></label>
                    <input
                        type="file"
                        name="image"
                        id=""
                        accept="image/*"
                        ref={imageRef}
                        style={styles.input}
                    />
                    <p style={styles.smallText}>Image must be lessthen 3 Mb</p>
                    <label htmlFor="class" style={styles.label}>
                        Class
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={12}
                        id="class"
                        ref={classRef}
                        style={styles.input}
                        placeholder="1-12"
                    />
                    <div style={styles.radioGroup}>
                        <label htmlFor="male" style={styles.label}>
                            Male
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            style={styles.input}
                        />
                        <label htmlFor="female" style={styles.label}>
                            Female
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Create Teacher
                    </button>
                </form>
            </div>
            {/* </div> */}
        </>
    );
};
export default CreateTeacher
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        background: "#f1f5f9",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "480px",
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    heading: {
        textAlign: "center",
        marginBottom: "10px",
    },
    label: {
        marginTop: "10px",
        fontSize: "14px",
    },
    input: {
        padding: "8px",
        marginTop: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        marginTop: "15px",
        padding: "10px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    radioGroup: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
        alignItems: "flex-end",
    },
    smallText: {
        fontSize: "12px",
        color: "red",
    },
};
