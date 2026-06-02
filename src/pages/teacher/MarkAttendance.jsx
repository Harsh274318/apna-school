import React, { useContext, useEffect, useState } from 'react'
import Context from '../../components/context/Context'
import Loading from '../../components/forms/Loading';
import api from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import shortedList from '../../components/utils/sort';

const MarkAttendance = () => {
    const { apiData, setApiData } = useContext(Context)
    const [send, setSend] = useState(false)
    const [attendance, setAttendance] = useState(() =>
        apiData.students?.reduce((acc, s) => ({
            ...acc,
            [s._id]: "present"
        }), {})
    );
    const navigate = useNavigate()

    function handleMarkAttendance(e) {
        e.preventDefault();
        const records = Object.entries(attendance).map(([studentId, status]) => ({
            studentId,
            status
        }));
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.post("/teacher/attendance", { records })
            .then((res) => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                setSend(true)
                toast.success(res?.data?.message || "Attendance marked")
            })
            .catch((err) => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                if (err?.response?.status === 500) return toast.error("somtheing is wrong")
                if (err?.response?.status === 401) {
                    localStorage.removeItem("token");

                    toast.error("login again");
                    navigate("/login");
                    return;
                }
                toast.error(err?.response?.data?.err || "Something is wrong in Attendance")
            })

    }

    function handleSendEmail(e) {
        e.preventDefault();
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.post("/notify/absent-students")
            .then((res) => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.success(res?.data?.message || "Email sended");
            })
            .catch((err) => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.error(err?.response?.data?.err || "Something is wrong in email")
            })

    }
    // if(attendance.length == 0) return navigate("/teacher")
    useEffect(() => {
        if (apiData.students.length === 0) {
            setApiData(prev => ({ ...prev, loading: true }))
            api.get("/students")
                .then(res => {
                    setApiData(prev => ({ ...prev, loading: false, students: res.data.data }))
                    setAttendance(
                        res.data.data.reduce((acc, s) => ({
                            ...acc,
                            [s._id]: "present"
                        }), {}))
                    toast.success(res?.data?.message || "All students")
                })
                .catch((err) => {
                    setApiData(prev => ({ ...prev, loading: false }))
                    toast.error(err?.response?.data?.err || "Students not found!")
                })
        }
    }, [])
    function handalSorting(sortIt, nested = null) {
        const sortedData = shortedList(apiData.students, sortIt, nested)
        setApiData(prev => ({ ...prev, students: sortedData }))
    }
    return (<>

        {apiData.loading && <Loading />}

        <div className='sorting_div'>
            <button onClick={() => handalSorting("rollNumber")}>Roll No ↑↓</button>
            <button onClick={() => handalSorting("userId", "name")}>Name A-Z</button>
        </div>
        {/*{console.log(apiData.students)}*/}
        {!apiData.loading && apiData.students && apiData.students.map(item => (
            <div className="student-attendance" key={item._id}>
                <div className="att-left">
                    <div className="att-avatar">
                        <img src={item?.userId?.url || (item?.gender === "male" ? "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1776136342/maleUser_p4l5ft.jpg" : "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1776136605/female_uydjww.jpg")} alt="Student" />
                    </div>
                    <div className="att-info">
                        <p className="att-name">{item.userId.name}</p>
                        <p className="att-email">{item.userId.email}</p>
                        <span className="att-class">Class {item.class}</span>
                    </div>
                </div>
                <div className="att-toggle">
                    <label className={`att-pill ${attendance[item._id] === "present" ? "att-present" : "att-pill-off"}`}>
                        <input
                            type="radio"
                            name={`att-${item._id}`}
                            value="present"
                            checked={attendance[item._id] === "present"}
                            onChange={() => setAttendance(prev => ({ ...prev, [item._id]: "present" }))}
                            style={{ display: "none" }}
                        />
                        Present
                    </label>
                    <label className={`att-pill ${attendance[item._id] === "absent" ? "att-absent" : "att-pill-off"}`}>
                        <input
                            type="radio"
                            name={`att-${item._id}`}
                            value="absent"
                            checked={attendance[item._id] === "absent"}
                            onChange={() => setAttendance(prev => ({ ...prev, [item._id]: "absent" }))}
                            style={{ display: "none" }}
                        />
                        Absent
                    </label>
                </div>
            </div>
        ))}

        <div className="att-buttons">
            <button className="btn-mark" onClick={handleMarkAttendance}>Mark Attendance</button>
            {send && <button className="btn-email" onClick={handleSendEmail}>Send Email</button>}
        </div>

    </>)
}

export default MarkAttendance