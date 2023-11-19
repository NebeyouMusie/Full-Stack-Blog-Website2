import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';


const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();


  // console.log(state);

  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const imageUrl = await upload();

    try{
      state
       ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img: file ? imageUrl : ""
      }, { withCredentials: true })
       : await axios.post("http://localhost:8800/api/posts", {
        title,
        desc: value,
        cat,
        img: file ? imageUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
       }, { withCredentials: true });

       navigate('/');

    }catch(err){
      console.log(err.response.message);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue}/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name='cat' value="art" id='art' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name='cat' value="science" id='art' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name='cat' value="cinema" id='art' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name='cat' value="design" id='art' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name='cat' value="food" id='art' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Food</label>
          </div>
          {/* <div className="cat">
            <input type="radio" checked={cat === "art"} name='cat' value="art" id='art' onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Technology</label>
          </div> */}
        </div>

        <div className="item">
          <h1>Publish</h1>
          {/* <span>
            <b>Staus: </b> Draft
          </span> */}
          <span>
            <b>Visibility: </b> Public
          </span>
          <label className="fileUpload" htmlFor="file">Upload Image</label>
          <input 
            style={{display: "none"}} 
            type="file" 
            id='file'
            onChange={e => setFile(e.target.files[0])}
            />
          <div className="buttons">
            {/* <button>Save as a draft</button> */}
            <button onClick={handleClick}>{state ? "Update" : "Publish"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write