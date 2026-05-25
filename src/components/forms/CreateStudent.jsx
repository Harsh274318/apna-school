import React, { useContext, useRef, useState } from 'react'
import { CiImageOn } from 'react-icons/ci';
import { GiEyelashes, GiEyeOfHorus } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Context from '../context/Context.jsx';
import api from '../../api.js';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

const CreateStudent = () => {
    const [flag, setFlag] = useState(false)
    const [isOtp, setIsOtp] = useState(false);
    const { apiData, setApiData } = useContext(Context)
    const navigate = useNavigate()
    const nameRef = useRef();
    const emailRef = useRef();
    const otpRef = useRef();
    const passwordRef = useRef();
    const dobRef = useRef();
    const rollRef = useRef();
    const fatherRef = useRef();
    const mobileRef = useRef();
    const addressRef = useRef();
    const fileRef = useRef();
    const today = new Date();
    const maxDate = new Date(today.setFullYear(today.getFullYear() - 3))
        .toISOString()
        .split("T")[0];
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
                emailRef.current.readOnly = true
                nameRef.current.readOnly = true
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
        e.preventDefault()
        const method = document.querySelector('input[name="notify"]:checked')?.value
        const gender = document.querySelector('input[name="gender"]:checked')?.value
        console.log(method)
        if (otpRef.current.value.trim().length !== 6) return toast.error("Invalid otp formate")
        if (isNaN(Number(otpRef.current.value.trim()))) return toast.error("otp should be Number")
        if (rollRef.current.value.trim().length >= 3) return toast.error("Roll number must be 1 to 99");
        if (isNaN(Number(rollRef.current.value.trim()))) return toast.error("Roll number should be Number")
        if (!nameRef.current.value.trim() ||
            !emailRef.current.value.trim() ||
            !otpRef.current.value.trim() ||
            !passwordRef.current.value.trim() ||
            !dobRef.current.value.trim() ||
            !rollRef.current.value.trim() ||
            !fatherRef.current.value.trim() ||
            !mobileRef.current.value.trim() ||
            !addressRef.current.value.trim() ||
            !method || !gender) return toast.error("Check all fields");
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobileRef.current.value.trim())) {
            return toast.error("Invalid mobile number");
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!regex.test(passwordRef.current.value.trim())) return toast.error("Password must be Strong");
        const file = fileRef.current.files[0];
        if (!file) return toast.error("Image is missing");
        if (file) {
            const sizeInMB = file.size / (1024 * 1024);
            if (sizeInMB > 3) return toast.error("File must be less than 3MB");
        }
        const form = new FormData();
        form.append("name", nameRef.current.value.trim())
        form.append("email", emailRef.current.value.trim())
        form.append("password", passwordRef.current.value.trim())
        form.append("dob", dobRef.current.value.trim())
        form.append("rollNumber", rollRef.current.value.trim())
        form.append("fatherName", fatherRef.current.value.trim())
        form.append("parentMobile", mobileRef.current.value.trim())
        form.append("address", addressRef.current.value.trim())
        form.append("otp", otpRef.current.value.trim())
        form.append("gender", gender)
        form.append("notifyMethod", method)
        form.append("image", file)
        setApiData(prev => ({
            ...prev, loading: true,
        }))
        api.post("/create-student", form)
            .then(res => {
                setApiData(prev => ({
                    ...prev, loading: false,
                }))
                emailRef.current.readOnly = false
                nameRef.current.readOnly = false
                nameRef.current.value = ""
                emailRef.current.value = ""
                otpRef.current.value = ""
                passwordRef.current.value = ""
                dobRef.current.value = ""
                rollRef.current.value = ""
                fatherRef.current.value = ""
                mobileRef.current.value = ""
                addressRef.current.value = ""
                fileRef.current.value = ""
                document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
                document.querySelectorAll('input[name="notify"]').forEach(r => r.checked = false);
                toast.success(res?.data?.message||"Student created successfully");
            })
            .catch(err => {
                setApiData(prev => ({
                    ...prev, loading: false,
                }))
                emailRef.current.readOnly = false
                nameRef.current.readOnly = false
                 if (err?.response?.status === 401) {
                                    localStorage.removeItem("token");
                
                                    toast.error("login again");
                                    navigate("/login");
                                    return;
                                }
                toast.error(err?.response?.data?.err||"Something is wrong")
            })

    }
    return (<>

        <div className="form-container" >
            {/* <button className="cut" id="cut" onClick={() => navigate(-1)}><RxCross2 /></button> */}
            <h2>Create Student</h2>
            <form onSubmit={handelSubmit}>
                <label htmlFor="name">
                    Full Name:
                </label>
                <input type="text" id='name' ref={nameRef} placeholder='Harsh Vardhan Pal' required />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder='student12@gmail.com' ref={emailRef} required />
                <button type='button' disabled={isOtp} onClick={handelOTP}>Send otp</button>
                {isOtp && <><label htmlFor="otp">OTP</label>
                    <input type="text" inputMode="numeric" maxLength={6} ref={otpRef} placeholder='123456' required />
                    <label htmlFor="password">Password</label>
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
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" max={maxDate} ref={dobRef} />
                    <label htmlFor="roll">Roll Number</label>
                    <input type="text" inputMode="numeric" maxLength={2} name="roll" id="roll" placeholder='21' ref={rollRef} required />
                    <label htmlFor="father">Father's Name</label>
                    <input type="text" ref={fatherRef} placeholder='Father name' required />
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="tel"
                        pattern="[6-9]{1}[0-9]{9}"
                        maxLength="10"
                        placeholder="Enter 10 digit mobile"
                        id='mobile'
                        ref={mobileRef}
                        required
                    />
                    <p>Notify Method</p>
                    <div className="category-pill">
                        <label htmlFor="sms">SMS
                            <input type="radio" name="notify" id="sms" value="sms" style={{ display: "none" }} />
                        </label>
                        <label htmlFor="Memail">Email
                            <input type="radio" name="notify" id="Memail" value="email" style={{ display: "none" }} />
                        </label>
                    </div>
                    <p>Gender</p>
                    <div className="category-pill">
                        <label htmlFor="male">male
                            <input type="radio" name="gender" id="male" value="male" style={{ display: "none" }} />
                        </label>

                        <label htmlFor="female">female
                            <input type="radio" name="gender" id="female" value="female" style={{ display: "none" }} />
                        </label>
                    </div>
                    <label htmlFor="address">Address</label>
                    <input type="text" ref={addressRef} id='address' required />
                    <label htmlFor="image">
                        <CiImageOn className="image-icon" /> Add image
                        <input type="file" name="image" accept="image/*" id="image" ref={fileRef} style={{ display: "none" }} />
                    </label>
                    <button type='submit'>Create</button>

                </>}
            </form>
        </div>


    </>)
}

export default CreateStudent