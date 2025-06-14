import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import './Tutorials.css'

const Tutorials = () => {
  const [categories, setCategories] = useState(null);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error while reading the categories.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

   if (!categories) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh', backgroundColor:"var(--base-color)" }}>
        <Spinner animation="border" role="status" style={{color:"var(--text-color)"}}>
          <span className="visually-hidden">Loading tutorial...</span>
        </Spinner>
      </div>
    );
  }

  return (
 <section className="blogs-section py-5" style={{backgroundColor:"var(--base-color2)"}}>
      <div className="container">
        <h2 className="text-center fw-bold mb-4" style={{color:"var(--text-color)"}}>Tutorials</h2>

        <div className="row">
          {categories.map((categories) => (
            <div
              key={categories.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="card h-100 blog-card" >
                <div className="blog-image-wrapper">
                  <img
                    src={categories.imageUrl}
                    alt={categories.title}
                    className="card-img-top"
                  />
                </div>
                {/* Body */}
                <div className="card-body d-flex flex-column" style={{backgroundColor:"var(--base-color)"}}>
                  <h5 className="card-title" style={{color:"var(--text-color)"}}>{categories.title}</h5>
                  <p className="card-text excerpt" style={{color:"var(--secondary-text)"}}>{categories.description}</p>
                  
                  <button
                  onClick={() => navigate(`/tutorial/${categories.id}`)}
          className="btn mt-auto tutorial-btn"
        >
         Start Learning!
        </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default Tutorials;
