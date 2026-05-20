import { useContext, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { toast } from "react-toastify";
import api from "../api.js";
import Context from "../components/context/Context.jsx";
import "./posts.css"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaWandMagicSparkles } from "react-icons/fa6";




const CreatePost = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const titleRef = useRef();
  const description = useRef();
  const imageRef = useRef();
  const { apiData, setApiData } = useContext(Context)
  const [imageSelected, setImageSelected] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false)
  const [disable, setDisable] = useState(false)
  const notStudent = (user?.role === "Principal" || user?.role === "Teacher")
  function handelCancel(e) {
    e.preventDefault()
    titleRef.current.value = ""
    description.current.value = ""
    imageRef.current.value = ""
    document.querySelectorAll('input[name="category"]').forEach(r => r.checked = false);
  }
  const typeText = (element, text, speed = 300) => {
    element.value = "";
    let i = 0;

    const interval = setInterval(() => {
      element.value += text[i];
      i++;
      element.scrollTop = element.scrollHeight;
      setDisable(true)
      if (i >= text.length) {
        clearInterval(interval)
        setDisable(false)
      };
    }, speed);
  };
  function magicAi(e) {
    e.preventDefault()
    if (titleRef.current.value.trim().length < 5 || description.current.value.trim().length < 10) return toast.warn("Write well");
    const refrance = { title: titleRef.current.value.trim(), description: description.current.value.trim() }
    setLoadingAI(true)
    setDisable(true)
    api.post("/suggest", refrance)
      .then(res => {
        const suggestion = res?.data?.data;
        if (suggestion) {
          titleRef.current.value = suggestion.title
          typeText(description.current, suggestion.description, 100);
        }
        toast.success("AI suggest")
      })
      .catch(() => {
        toast.error("AI error")
        setDisable(false)
      })
      .finally(() => {
        setLoadingAI(false);
      })

  }
  function handelPost(e) {
    e.preventDefault()
    const category = document.querySelector('input[name="category"]:checked')?.value;
    if (!category) return toast.error("didn't Check Category yet")
    if (!titleRef.current.value.trim() || !description.current.value.trim() || !category) return toast.error("Fill all fileds");
    if (titleRef.current.value.trim().length < 5 || description.current.value.trim().length < 10) return toast.error("Write well");
    const formData = new FormData()
    formData.append("title", titleRef.current.value.trim());
    formData.append("description", description.current.value.trim());
    formData.append("category", category.trim())
    formData.append("name", user.name)
    formData.append("userUrl", user.url)
    formData.append("email", user.email)
    const file = imageRef.current.files[0];
    if (file) {
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > 3) return toast.error("File must be less than 3MB");
      formData.append("image", file)
    }
    setApiData(prev => ({
      ...prev, loading: true
    }))
    api.post("/social/school-post", formData)
      .then(res => {
        setApiData(prev => ({
          ...prev, loading: false, posts: res.data.data.reverse()
        }))

        titleRef.current.value = ""
        description.current.value = ""
        imageRef.current.value = ""
        document.querySelectorAll('input[name="category"]').forEach(r => r.checked = false);

        toast.success("Post Created successfully!");

      })
      .catch(err => {
        setApiData(prev => ({
          ...prev, loading: false
        }))
        toast.error("Something is wrong")
      })

  }


  return (<>

    <div className="create-post-card">
      <div className="post-hearder">
        <div className="user-image">
          <img src={user?.url || 0} alt={"user Image"} />
        </div>
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="magic_btn_div">
          <button type="button" onClick={magicAi} className={`magic_btn ${loadingAI || disable ? "magic_loading" : ""}`} disabled={loadingAI || disable}><FaWandMagicSparkles /></button>
        </div>
      </div>
      <div className="post-details">
        <input type="text"
          name=""
          placeholder="Title"
          ref={titleRef}
          id="" />
        <textarea name=""
          placeholder="Description"
          ref={description}
          id="" />
        {notStudent &&
          <label htmlFor="image">
            {imageSelected
              ? <><AiOutlineCheckCircle style={{ color: "green", fontSize: "20px", marginRight: "2px" }} /> Selected</>
              : <><CiImageOn style={{ color: "red", fontSize: "20px", marginRight: "2px" }} /> Add image</>}
            <input type="file" name="image" accept="image/*" id="image" ref={imageRef} style={{ display: "none" }} onChange={(e) => {
              if (e.target.files.length > 0) {
                setImageSelected(true);
              }
            }} />
          </label>
        }
        <div className="category-pill">
          {notStudent && <label htmlFor="study">Study
            <input type="radio" name="category" id="study" value="study" style={{ display: "none" }} />
          </label>}
          {!notStudent && <label htmlFor="student">Student
            <input type="radio" name="category" id="student" value="student"
              checked={!notStudent}
              style={{ display: "none" }} />
          </label>}
          {notStudent && <><label htmlFor="news">News
            <input type="radio" name="category" id="news" value="news" style={{ display: "none" }} />
          </label>
            <label htmlFor="general">General
              <input type="radio" name="category" id="general" value="general" style={{ display: "none" }} />
            </label>
            <label htmlFor="public">Public
              <input type="radio" name="category" id="public" value="public" style={{ display: "none" }} />
            </label>
            <label htmlFor="announcement">Announcement
              <input type="radio" name="category" id="announcement" value="announcement" style={{ display: "none" }} />
            </label>
          </>}
        </div>

      </div>
      <button type="button" className="btn-Cancel" onClick={handelCancel}>Cancel</button>

      <button type="submit" className={`btn-Create ${disable ? "disable_btn" : ""}`} onClick={handelPost} disabled={disable}>Create post</button>

    </div>
  </>)


}
export default CreatePost
