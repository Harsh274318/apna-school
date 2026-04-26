import React, { useContext, useRef } from 'react'
import { toast } from 'react-toastify'
import api from '../../api.js'
import Context from '../../components/context/Context.jsx'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
const AddSessions = () => {
    const { setApiData } = useContext(Context)
    const navigate = useNavigate()
    const sessionRef = useRef()
    function addSession(e) {
        e.preventDefault()
        if (!sessionRef.current.value.trim()) return toast.error("Select a session");
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.patch("/session", { session: sessionRef.current.value.trim() })
            .then(res => {
                console.log(res.data.data)
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.success(`Session added`);
            }).catch(err => {
                console.log(err.message)
                toast.error("Somthing is wrong")
            })
    }
    return (<div>

        <select name='session' ref={sessionRef} className="selectStyle">
            <option value="" defaultValue> -- add session --</option>
            <option value="2026-27">2026-27</option>
            <option value="2027-28">2027-28</option>
            <option value="2028-29">2028-29</option>
            <option value="2029-30">2029-30</option>
            <option value="2030-31">2030-31</option>
            <option value="2031-32">2031-32</option>
            <option value="2032-33">2032-33</option>
            <option value="2033-34">2033-34</option>
            <option value="2034-35">2034-35</option>
            <option value="2035-36">2035-36</option>
        </select>
        <button type="button" style={btnStyle} onClick={addSession}>Add session</button>

    </div>)
}
export default AddSessions


const selectStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "200px",
    marginRight: "10px"
};

const btnStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s"
};