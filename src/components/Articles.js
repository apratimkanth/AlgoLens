import '../style/articles.css'; // Make sure to create a CSS file to style the CardPage
import { collection, getDocs, onSnapshot, orderBy, query,doc,updateDoc,arrayUnion,arrayRemove } from "firebase/firestore";
import {React, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
// import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
// import LikeArticle from "./LikeArticle";
import { Link, useNavigate } from "react-router-dom";

const Articles = () => {
  const [user] = useAuthState(auth);
    const [articles, setArticles] = useState([]);
  const postsCollectionRef = collection(db, "Articles");
  let navigate = useNavigate();
  const [text_color,setText_color]=useState("text_color_black");

  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
    //   console.log(data);
      setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  const updatelike=async(id,likes)=>{
    if (!user) {
      alert("Please login first");
      navigate("/signin");
    }
    else{
      const likesRef = doc(db, "Articles", id);
      const userid=user.uid;
      if (likes?.includes(userid)) {
        updateDoc(likesRef, {
          likes: arrayRemove(userid),
        }).then(() => {
            console.log("unliked");
            setText_color("text_color_black");
        }).catch((e) => {
              console.log(e);
        });
      }
      else{
          updateDoc(likesRef,{
              likes:arrayUnion(userid)
          }).then(() => {
              console.log("liked");
              setText_color("text_color_blue");
          }).catch((e) => {
                console.log(e);
          });
      }
      getPosts();
    }
    
  }

  useEffect(() => {
    getPosts();
  }, []);
  console.log(articles);

  return (
    <>
    {articles.length === 0 ? (
        <p></p>
      ) :
        articles.map((post) => {
            return (
              <div className='card-body' key={post.id}>
              <div className='card-main'>
                  <div className='card-upper'>
                      <div className='card-username'>{post.createdBy}</div>
                      <div className='card-created-date'>{post.createdAt.toDate().toDateString()}</div>
                  </div>
                  <div className='card-lower'>
                      <div className='card-content'>
                          <div className='card-content-upper'>
                              <div className='card-title'>{post.title}</div>
                              <div className='card-text'>{post.description}</div>
                          </div>
                          <div className='card-content-lower'>
                              <div className='card-topic'>{post.topic}</div>
                              <div className='card-extra'>
                                  <div className='card-likes'>
                                      <p className={'like-display'+' '+text_color}>
                                          <i className="fa fa-thumbs-up" style={{ fontSize : "20px",marginRight:"2px",cursor:"pointer"}} onClick={()=>{
              updatelike(post.id,post.likes);
            }}></i>
                                          <p >{post.likes?.length}</p>
                                      </p>
                                  </div>
                                  <div className='card-comments'>
                                      <p style={{ display : "flex"}}>
                                          <i className="fa fa-comment-o" style={{ fontSize : "20px",marginRight:"2px",cursor:"pointer"}}></i>
                                          <p >{post.comments?.length}</p>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className='card-image'>
                      <img
                          src={post.imageUrl}
                          alt="Sample"
                          className="image"
                      />
                      </div>
                  </div>
              </div>
          </div>
            )
            })
        }
        {/* // <p>heelo</p> */}
    </>
  );
};

export default Articles;
