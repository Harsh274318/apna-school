import React, { useContext, useEffect, useState } from 'react'
import Context from '../../components/context/Context.jsx';
import api from '../../api.js';
import { toast } from 'react-toastify';

const Attendance = () => {
    const [attendance, setAttendance] = useState(null);
    const { apiData, setApiData } = useContext(Context);
    const [percentage, setPercentage] = useState(60)
    useEffect(() => {
        setApiData(prev => ({ ...prev, loading: true }))
        api.get("/attendance")
            .then(res => {
                setApiData(prev => ({ ...prev, loading: false }))
                setAttendance(res.data.data.reverse());
                toast.success(res?.data?.message||"Attendance loaded!");
            })
            .catch((err) => {
                setApiData(prev => ({ ...prev, loading: false }))
                 if (err?.response?.status === 401) {
                                    localStorage.removeItem("token");
                
                                    toast.error("login again");
                                    navigate("/login");
                                    return;
                                }
                toast.error(err?.response?.data?.err||"Attendance not found");
            })
    }, [])
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const markedAttendance = attendance?.filter(i => {
        const status = i.records?.[0]?.status;
        return status && status.trim() !== "";
    }) || [];

    const presentCount = markedAttendance.filter(i => i.records?.[0]?.status === "present").length;
    const absentCount = markedAttendance.filter(i => i.records?.[0]?.status === "absent").length;
    useEffect(() => {
        const percent = markedAttendance.length
            ? Math.round((presentCount / markedAttendance.length) * 100)
            : 0;
        setPercentage(percent);
    }, [presentCount, markedAttendance])
    // setPercentage(Math.round((presentCount / markedAttendance.length) * 100))
    return (
        <div className="outterAttendance">


            <div className='attendanceDiv'>
                <div className='attendanceHeading'>
                    <h2>My Attendance</h2>
                </div>

                {!apiData.loading && attendance && (
                    <>
                        <div className='attendance-table'>

                            <div className='attendance-row header'>
                                <span className='date'>Date</span>
                                <span>Status</span>
                            </div>

                            {markedAttendance.map((item, index) => {
                                const status = item.records?.[0]?.status;
                                const isPresent = status === "present";
                                return (
                                    <div key={index} className='attendance-row'>
                                        <span className='date'>{item.date.split("-").reverse().join("-")}</span>
                                        <span className={isPresent ? 'status-present' : 'status-absent'}>
                                            {capitalize(status)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        <p className='attendance-summary'>
                            <span className='attendance-summary-spans' style={{ background: "rgb(249, 253, 204)" }}>
                                Total: {markedAttendance.length}
                            </span>
                            <span className='attendance-summary-spans' style={{ background: "#b8d8bc" }}>
                                Present: {presentCount}
                            </span>
                            <span className='attendance-summary-spans' style={{ background: "#f8d1d1" }}>
                                Absent: {absentCount}
                            </span>
                            <span className='attendance-summary-spans' style={{ background: `${percentage >= 50 ? "#8acf92" : "#f99f9f"}` }}>Percentage: {percentage} %
                            </span>
                        </p>
                    </>
                ) || <h1>Attendance Not Found</h1>}
            </div>
        </div>
    )
}

export default Attendance