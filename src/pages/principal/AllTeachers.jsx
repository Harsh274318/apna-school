import React, { useContext, useEffect, useState } from 'react'
import Context from '../../components/context/Context.jsx'
import api from "../../api.js"
import { toast } from 'react-toastify'
import { AiOutlineDelete } from 'react-icons/ai'
import Loading from '../../components/forms/Loading.jsx'
import capitalize from '../../components/utils/capitalize.js'

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
        toast.success(res?.data?.message||"All teachers found");
      }
      )
      .catch(err => {
        setApiData(prev => ({
          ...prev, loading: false
        }));
         if (err?.response?.status === 401) {
                            localStorage.removeItem("token");
                            toast.error("login again");
                            navigate("/login");
                            return;
                        }
        toast.error(err?.response?.data?.err||"teachers not found");
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

    {apiData.loading && <Loading />}
    {!apiData.loading && teacher && teacher.map(item => (

      <div key={item._id} className="teacher-card">
        <div className="teacher-left">
          <div className="teacher-img">
            <img src={item.userId.url} alt={item.userId.name} />
          </div>
          <div>
            <p className="teacher-name">{capitalize(item.userId.name)}</p>
            <p className="teacher-email">{item.userId.email}</p>
          </div>
        </div>

        <div className="teacher-right">
          <span className="badge class-badge">
            Class {item.classAssigned}
          </span>

          <span className={`badge gender-badge ${item.gender === "Female" ? "female" : "male"}`}>
            {item.gender}
          </span>

          <button
            type="button"
            className="delete-btn"
            onClick={(e) => handelDeleteTeacher(e, item.userId.email)}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>

    ))


    }



  </>)
}
export default AllTeachers

