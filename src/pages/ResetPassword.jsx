import React, { useContext, useRef, useState } from 'react'
import { GiEyelashes, GiEyeOfHorus } from 'react-icons/gi';
import { toast } from 'react-toastify';
import api from '../api';
import Context from '../components/context/context';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [flag, setFlag] = useState(false)
    const { adpiData, setApiData } = useContext(Context)
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()
    function handelSubmit(e) {
        e.preventDefault()
        const role = document.querySelector('input[name="role"]:checked')?.value;

        if (!emailRef.current.value.trim() || !passwordRef.current.value.trim() || !role) return toast.error("All fields are required");
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!regex.test(passwordRef.current.value.trim())) {
            return toast.error(
                "Password must be Strong"
            );
        }
        const payload = {
            email: emailRef.current.value.trim(),
            newPassword: passwordRef.current.value.trim(),
            role,
        }
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.patch("/user/reset-password", payload)
            .then(res => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                passwordRef.current.value = ""
                emailRef.current.value = ""
                document.querySelectorAll('input[name="role"]').forEach(r => r.checked = false);
                toast.success("Password reset successfully!")
            })
            .catch(err => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.error("Something is wrong")
            })

    }

    return (<>

        <div className='form-container'>
            <form onSubmit={handelSubmit}>

                <h2>Reset possword</h2>
                <label htmlFor="email">
                    User Email:
                </label>
                <input type="email" ref={emailRef} placeholder='teacher123@gmail.com' required />
                <label htmlFor="password">New Password</label>
                <div className="password-div">
                    <input
                        type={flag ? "text" : "password"}
                        id="password"
                        ref={passwordRef}
                        className="passwordinput"
                        placeholder="NewHarsh@123"
                    />
                    <span id="toggle" onClick={() => setFlag(!flag)}>
                        {flag ? (
                            <GiEyeOfHorus className="close" />
                        ) : (
                            <GiEyelashes className="close" />
                        )}
                    </span>
                </div>
                <div className="category-pill">
                    <label htmlFor="Principal">Principal
                        <input type="radio" name="role" id="Principal" value="Principal" style={{ display: "none" }} />
                    </label>
                    <label htmlFor="Teacher">Teacher
                        <input type="radio" name="role" id="Teacher" value="Teacher" style={{ display: "none" }} />
                    </label>
                    <label htmlFor="Student">Student
                        <input type="radio" name="role" id="Student" value="Student" style={{ display: "none" }} />
                    </label>
                </div>
                <button type='submit'>Reset</button>
                <button style={{ width: "100%", background: "none", color: "blue" }} type='button' onClick={() => navigate("/principal/update-password")}>
                    Update Password
                </button>
            </form>
        </div>




    </>)
}

export default ResetPassword