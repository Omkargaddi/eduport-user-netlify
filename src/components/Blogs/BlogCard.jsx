import React from 'react';
import './BlogCard.css';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Button } from "react-bootstrap";

const BlogCard = () => {
  const location = useLocation();
  const blog = location.state?.blog;

  if (!blog) return <p>No blog data.</p>;

  const sanitizedContent = DOMPurify.sanitize(blog.content || '');
 
  return (
    <div style={{backgroundColor:"var(--base-color)"}} >
      <div className="card blog-detail-card shadow-sm rounded">
      {/* Banner image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          className="card-img-top blog-card-img"
          alt="Blog banner"
        />
      )}

      <div className="card-body">
        {/* Title */}
        <h3 className="card-title text-center fw-bold blog-card-title" style={{color:"var(--text-color)"}}>
          {blog.title}
        </h3>

        {/* Blockquote description/snippet */}
        {blog.description && (
          <blockquote className="blockquote border-start border-3 border-secondary ps-3 my-3 blog-card-quote" >
            <p className="mb-0 fst-italic text-secondary" >{blog.description}</p>
          </blockquote>
        )}

        {/* Author and Updated date */}
        <div className="d-flex justify-content-between align-items-center mb-3 blog-card-meta">
       <div>
        <small className=" me-2" style={{color:"var(--secondary-text)"}}>By</small>
        <img src={blog.creatorProfileUrl ? blog.creatorProfileUrl :"https://eduport-wda-project.s3.eu-north-1.amazonaws.com/defaultUser.webp" } alt="..." style={{width:"24px", height:"24px", borderRadius:"50%"}} />
           <small style={{fontWeight:"500", marginLeft:"4px", color:"var(--secondary-text)"}} className='fst-italic text-secondary'>{blog.creator || 'Unknown'}</small>
       </div>
          <small className="" style={{color:"var(--secondary-text)"}}>~ {blog.readtime} min read</small>
        </div>
        

        {/* Render the TinyMCE HTML content */}
        <div
          className="blog-card-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      {/* tags */}
       <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0 ms-4">Tags</h5>
        <Button variant="light" size="md" className="d-flex align-items-center border me-4 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2-icon lucide-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
          Share
        </Button>
      </div>
      <div className="d-flex flex-wrap ms-4">
        {blog.tags.map((tag, idx) => (
          <span
            key={idx}
            className="badge bg-light text-dark border rounded-pill me-1 mb-1 py-1 px-2"
            style={{ fontSize: "15px", lineHeight: 1.3 }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    </div>
    </div>
  );
};

export default BlogCard;
