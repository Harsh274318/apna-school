import React, { useContext, useState } from 'react'
import Context from '../../components/context/context'
import Loading from '../../components/forms/Loading';
import api from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MarkAttendance = () => {
    const { apiData, setApiData } = useContext(Context)
    const [send, setSend] = useState(false)
    const [attendance, setAttendance] = useState(() =>
        apiData.students?.reduce((acc, s) => ({
            ...acc,
            [s._id]: "present"
        }), {})
    );
    const navigate  = useNavigate()

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
            .then(() => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                setSend(true)
                toast.success("Attendance marked")
            })
            .catch(() => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.error("Something is wrong in Attendance")
            })

    }

    function handleSendEmail(e) {
        e.preventDefault();
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.post("/notify/absent-students")
            .then(() => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.success("Email sended");
            })
            .catch(() => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.error("Something is wrong in email")
            })

    }
    // if(attendance.length == 0) return navigate("/teacher")
    return (<>

        {apiData.loading && <Loading />}


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