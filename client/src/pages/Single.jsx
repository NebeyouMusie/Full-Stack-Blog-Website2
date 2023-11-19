import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios';
import moment from 'moment'
import DOMPurify from "dompurify"
import { useGlobalContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const {currentUser} = useGlobalContext();
  const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try{
          const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
          setPost(res.data);
        }catch(err){
          console.log(err);
        }
      }

      fetchData();
    }, [postId])


  const handleDelete = async () => {
  try{
    await axios.delete(`http://localhost:8800/api/posts/${postId}`, { withCredentials: true });
    navigate('/');
  }catch(err){
    console.log(err);
  }
}



  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
             <i className="editIcon fa-solid fa-pen-to-square"></i>
            </Link>
            <i onClick={handleDelete} className="deleteIcon fa-solid fa-trash"></i>
          </div>}
        </div>

        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p> 
      </div>
      <Menu category={post.cat}/>
    </div>
  )
}

export default Single