import React, { useContext, useEffect, useState } from 'react'
import Context from '../../components/context/Context.jsx';
import api from '../../api.js';
import { toast } from 'react-toastify';

const Attendance = () => {
    const [attendance, setAttendance] = useState(null);
    const { apiData, setApiData } = useContext(Context);

    useEffect(() => {
        setApiData(prev => ({ ...prev, loading: true }))
        api.get("/attendance")
            .then(res => {
                setApiData(prev => ({ ...prev, loading: false }))
                setAttendance(res.data.data);
                toast.success("Attendance loaded!");
            })
            .catch(() => {
                setApiData(prev => ({ ...prev, loading: false }))
                toast.error("Attendance not found");
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

    return (
        <div className='attendanceDiv'>
            <div className='attendanceHeading'>
                <h2>My Attendance</h2>
            </div>

            {!apiData.loading && attendance && (
                <>
                    <div className='attendance-table'>

                        <div className='attendance-row header'>
                            <span>Date</span>
                            <span>Status</span>
                        </div>

                        {markedAttendance.map((item, index) => {
                            const status = item.records?.[0]?.status;
                            const isPresent = status === "present";
                            return (
                                <div key={index} className='attendance-row'>
                                    <span>{item.date.split("-").reverse().join("-")}</span>
                                    <span className={isPresent ? 'status-present' : 'status-absent'}>
                                        {capitalize(status)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <p className='attendance-summary'>
                        Total: {markedAttendance.length} &nbsp;|&nbsp;
                        Present: {presentCount} &nbsp;|&nbsp;
                        Absent: {absentCount}
                    </p>
                </>
            )}
        </div>
    )
}

export default Attendance