import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import Context from "../context/Context.jsx";
import { GiEyelashes, GiEyeOfHorus } from "react-icons/gi";
import Loading from "./Loading";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const CreateTeacher = () => {
    const { apiData, setApiData } = useContext(Context);
    const [flag, setFlag] = useState(false);
    const [isOtp, setIsOtp] = useState(true)
    const nameRef = useRef();
    const emailRef = useRef();
    const otpRef = useRef();
    const imageRef = useRef();
    const classRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()
    const [imageSelected, setImageSelected] = useState(false);
    const [preview, setPreview] = useState("");
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
                setIsOtp(true)
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
        if (
            !nameRef.current.value.trim() ||
            !emailRef.current.value.trim() ||
            !passwordRef.current.value.trim() ||
            !otpRef.current.value.trim()

        )
            return toast.error("Check all  filed");
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        if (!gender) return toast.error("Select gender");
        const classValue = Number(classRef.current.value);
        if (!classRef.current.value || classValue < 1 || classValue > 12) {
            return toast.error("Class must be between 1 to 12");
        }
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

            toast.success(res?.data?.message || "Teacher created successfully")
        })
            .catch(err => {
                setApiData(prev => (
                    {
                        ...prev, loading: false
                    }
                ))
                if (err?.response?.status === 401) {
                    localStorage.removeItem("token");

                    toast.error("login again");
                    navigate("/login");
                    return;
                }
                toast.error(err?.response?.data?.err || "Somethig is Worng")
            })

    }
    return (
        <>{apiData.loading && <Loading />}
            <div className="form-container" >
                {/* <div className="form-container" > */}
                {/* <button type="button" className="cut" id="cut" onClick={() => navigate(-1)}><RxCross2 /></button> */}
                <form onSubmit={handelSubmit} >

                    <h2>Teacher's Form</h2>
                    <label htmlFor="name" >
                        Full Name
                    </label>
                    <input
                        type="text"
                        ref={nameRef}
                        placeholder="Harsh Vardhan Pal"
                    />
                    <label htmlFor="email" >
                        Valid Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id=""

                        placeholder="validemail@gmail.com"
                        ref={emailRef}
                    />
                    <button type="button" onClick={handelOTP} >
                        Send OTP
                    </button>
                    <div className={isOtp ? "openOTP" : "CloseOTP"}>
                        <div className="otpItem">

                            <label htmlFor="otp" >
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                name="otp"
                                id="otp"
                                ref={otpRef}

                                placeholder="123456"
                            />
                        </div>
                        <div className="classItem">

                            <label htmlFor="class" >
                                Class
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                min={1}
                                max={12}
                                id="class"
                                ref={classRef}

                                placeholder="1-12"
                            />

                        </div>
                        <div className="passItem">

                            <label htmlFor="password" >
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
                        </div>

                        <div className="imageItem">
                            <p style={{ fontSize: "12px", color: "tomato" }}>Max Size 3 Mb</p>
                            <label htmlFor="file" className="imageLabel">
                                {imageSelected
                                    ? <><AiOutlineCheckCircle style={{ color: "green", fontSize: "20px", marginRight: "2px" }} /> Selected</>
                                    : <><CiImageOn style={{ color: "red", fontSize: "20px", marginRight: "2px" }} /> Add image</>}
                                <input
                                    type="file"
                                    name="image"
                                    id="file"
                                    accept="image/*"
                                    ref={imageRef}
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        const file = e.target.files[0];

                                        if (file) {
                                            setImageSelected(true);
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </label>


                        </div>
                        <div className="pillsItem">
                            <p>Gender</p>
                            <div className="category-pill">

                                <label htmlFor="male" >
                                    Male
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="male"
                                        style={{ display: "none" }}
                                    />
                                </label>
                                <label htmlFor="female" >
                                    Female
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="female"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="previewItem" >
                            {preview ? <img src={preview} alt="Preview Image" /> : (<div><CgProfile /> <p>Preview</p></div>)}
                        </div>

                        <div className="btnItem">
                            <button type="submit" >
                                Create Teacher
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* </div> */}
        </>
    );
};
export default CreateTeacher

