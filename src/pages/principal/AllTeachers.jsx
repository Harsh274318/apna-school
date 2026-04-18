import React, { useContext, useEffect, useState } from 'react'
import Context from '../../components/context/context'
import api from "../../api"
import { toast } from 'react-toastify'
import { AiOutlineDelete } from 'react-icons/ai'


const AllTeachers = () => {
  const { token, apiData, setApiData } = useContext(Context)
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    setApiData(prev => ({
      ...prev, loading: true
    }))
    api.get("/teachers/info")
      .then(res => {
        setTeacher(res.data.data);
        // console.log(res.data.data)
        setApiData(prev => ({
          ...prev, loading: false
        }));
        toast.success("All teachers found");
      }
      )
      .catch(err => {
        setApiData(prev => ({
          ...prev, loading: false
        }));
        toast.error("teachers not found");
      })
    // .finally()
  }, [])
  function handelDeleteTeacher(e, email) {
    e.preventDefault()
    if (!email) return toast.error("email is missing")
    setApiData(prev => ({
      ...prev, loading: true
    }))
    api.delete("/delete-teacher", { data: { email } })
      .then(() => {
        setApiData(prev => ({
          ...prev, loading: false
        }))
        toast.success("teacher deleted")
      })
      .catch(() => {
        setApiData(prev => ({
          ...prev, loading: false
        }))
        toast.error("Something is wrong")

      }
      )
  }
  return (<>


    {!apiData.loading && teacher && teacher.map(item => (

      <div key={item._id} style={{
        background: "var(--color-background-primary)",
        borderRadius: "12px",
        border: "0.5px solid var(--color-border-tertiary)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <img src={item.userId.url} alt={item.userId.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{item.userId.name}</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>{item.userId.email}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ background: "#E6F1FB", color: "#0C447C", fontSize: 12, padding: "4px 10px", borderRadius: 999 }}>
            Class {item.classAssigned}
          </span>
          <span style={{ background: item.gender === "Female" ? "#FBEAF0" : "#E1F5EE", color: item.gender === "Female" ? "#72243E" : "#085041", fontSize: 12, padding: "4px 10px", borderRadius: 999 }}>
            {item.gender}
          </span>
          <button type='button' className="delete-btn" onClick={(e) => handelDeleteTeacher(e, item.userId.email)}><AiOutlineDelete /></button>
        </div>
      </div>

    ))


    }



  </>)
}
export default AllTeachers

