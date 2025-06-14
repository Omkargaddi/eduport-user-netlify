import React, { useContext } from 'react';
import './MyCourses.css';
import { AppContext } from '../../context/AppContext';

export default function MyCourses() {
  const { userData } = useContext(AppContext);
  const myCourses = userData?.myCourses || [];

  if (myCourses.length === 0) {
    return (
      <div className="my-courses2 empty-state">
        <p>You haven’t purchased any courses yet. Browse our <b><a href="/course">Course</a></b> catalog to get started!</p>
      </div>
    );
  }

  return (
   <>
    <div style={{backgroundColor:"var(--base-variant)"}} className='p-1'>
      <h2 className="section-title text-center mt-5 mb-2"
            style={{ color: "var(--text-color)" }}>
        My Courses
      </h2>
    <div className="my-courses">
      
      {myCourses.map((course, idx) => (
        <div className="course-card" key={idx}>
          <img
            src={course.imageUrl}
            alt={course.title}
            className="course-card__image"
          />
          <div className="course-card__body">
            <h3 className="course-card__title">{course.title}</h3>
            <p className="course-card__desc">{course.description}</p>
            <ul className="course-card__info">
              <li><strong>Lectures:</strong> {course.lectures}</li>
              <li><strong>Duration:</strong> {course.duration}</li>
            </ul>
            <button className="course-card__btn">View</button>
          </div>
        </div>
      ))}
    </div>
    </div>
   </>
  );
}
