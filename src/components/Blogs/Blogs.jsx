import React, { useState, useContext, useEffect } from "react";
import "./Blogs.css"; 
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {toast} from 'react-toastify';
import axios from 'axios';
import { Spinner } from "react-bootstrap";

const Blogs = () => {
const [blogs, setBlogs]= useState(null);
 const { backendUrl } = useContext(AppContext);
 const navigate = useNavigate();


 

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/blog`);
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while reading the blogs.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

   if (!blogs) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh', backgroundColor:"var(--base-color)" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden" style={{color:"var(--text-color)"}}>Loading tutorial...</span>
        </Spinner>
      </div>
    );
  }

   const handleViewBlog = ( blogId ) => {
    const blog = blogs.find((item) => item.id === blogId);
    navigate("/blog-details", { state: { blog } });
  };

  return (
   <>
   
    <section className="blogs-section py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Blogs</h2>

        <div className="row">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card h-100 blog-card">
                <div className="blog-image-wrapper">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="card-img-top"
                  />
                </div>
                
                {/* Body */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{color:"var(--text-color)"}}>{blog.title}</h5>
                  <p className="card-text excerpt">{blog.description}</p>
                  
                  <button
                   onClick={() => handleViewBlog(blog.id)}
          className="btn btn-readmore mt-auto"
        >
          Read More
        </button>
        
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
   
   
   </>
  );
};

export default Blogs;

