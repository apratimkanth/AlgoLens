import '../style/articles.css'; // Make sure to create a CSS file to style the CardPage
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import {React, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
// import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
// import LikeArticle from "./LikeArticle";
import { Link, useNavigate } from "react-router-dom";

const Articles = () => {
    const [articles, setArticles] = useState([]);
  const postsCollectionRef = collection(db, "Articles");
  let navigate = useNavigate();

  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
    //   console.log(data);
      setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, [1]);
  console.log(articles);

  return (
    <>
    {articles.length === 0 ? (
        <p>No articles found!</p>
      ) :
        articles.map((post) => {
            return (
                <div className="card" key={post.id}>
      <div className="card-header">
        <div className="card-username">{post.createdBy}</div>
        <div className="card-date">{post.createdAt.toDate().toDateString()}</div>
      </div>
      <div className="card-content">
        <div className="card-text-container">
          <div className="card-title">{post.title}</div>
          <div className="card-text">
          {post.description}
          </div>
          <div className="card-topic">{post.topic}</div>
          <div className="card-actions">
            <button className="like-button">
              <i className="far fa-thumbs-up"></i> {post.likes?.length}
            </button>
            <button className="comment-button">
              <i className="far fa-comment"></i> {post.comments?.length}
            </button>
          </div>
        </div>
        <div className="card-image">
          <img
            src={post.imageUrl}
            alt="Sample"
            className="image"
          />
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
