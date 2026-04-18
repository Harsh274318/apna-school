import React, { useContext, useEffect, useState } from 'react'
import Context from '../../components/context/context';
import api from '../../api';
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

    const presentCount = attendance?.filter(i => i.records?.[0]?.status === "present").length || 0;
    const absentCount  = attendance?.filter(i => i.records?.[0]?.status === "absent").length  || 0;

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

                        {attendance.map((item, index) => {
                            const status = item.records?.[0]?.status;
                            const isPresent = status === "present";
                            return (
                                <div key={index} className='attendance-row'>
                                    <span>{item.date.split("-").reverse().join("-")}</span>
                                    <span className={isPresent ? 'status-present' : 'status-absent'}>
                                        {status}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <p className='attendance-summary'>
                        Total: {attendance.length} &nbsp;|&nbsp;
                        Present: {presentCount} &nbsp;|&nbsp;
                        Absent: {absentCount}
                    </p>
                </>
            )}
        </div>
    )
}

export default Attendance