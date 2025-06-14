import "./Course.css";
import CourseCard from "./CourseCard";
import { AppContext } from "../../context/AppContext";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function Course() {
  const [list, setList] = useState(null);
  const { backendUrl, userData } = useContext(AppContext);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/course`);
      setList(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while reading the courses.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (!list) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh', backgroundColor:"var(--base-color2)" }}>
        <Spinner animation="border" role="status" style={{color:"var(--text-color)"}}>
          <span className="visually-hidden">Loading courses...</span>
        </Spinner>
      </div>
    );
  }

  // Filter only if userData and myCourses exist
  let filteredList = list;
  if (userData && userData.myCourses) {
    const purchasedIds = new Set(userData.myCourses.map(course => course.id));
    filteredList = list.filter(course => !purchasedIds.has(course.id));
  }

  const premiumList = filteredList.filter((item) => item.category === "premium");
  const freeList = filteredList.filter((item) => item.category === "free");

  return (
    <>
      <section className="courses-section py-5" style={{backgroundColor:"var(--base-color2)"}}>
        <div className="container">

          {/* Premium Courses */}
          <h2 className="text-center mb-4" style={{color:"var(--text-color)"}}>Premium Courses</h2>
          <div className="row">
            {premiumList.length > 0 ? (
              premiumList.map((c) => (
                <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
                  <CourseCard list={c} />
                </div>
              ))
            ) : (
              <p className="text-center" style={{color:"var(--text-color)"}}>No premium courses available.</p>
            )}
          </div>

          {/* Free Courses */}
          <h2 className="text-center mt-5 mb-4" style={{color:"var(--text-color)"}}>Free Courses</h2>
          <div className="row">
            {freeList.length > 0 ? (
              freeList.map((c) => (
                <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
                  <CourseCard list={c} />
                </div>
              ))
            ) : (
              <p className="text-center" style={{color:"var(--text-color)"}}>No free courses available.</p>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
