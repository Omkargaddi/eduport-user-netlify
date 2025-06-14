import "./Course.css";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ list }) => {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate("/course-details", { state: { course: list } });
  };

  // Safely handle tags array (ensure at least two or fallback)
  const tag1 = list.tags && list.tags.length > 0 ? list.tags[0] : "";
  const tag2 = list.tags && list.tags.length > 1 ? list.tags[1] : "";

  return (
    <div className="card course-card h-100">
      {/* Image wrapper */}
      <div className="position-relative image-wrapper">
        <img
          src={list.imageUrl}
          alt={list.title}
          className="card-img-top course-img"
        />
        {tag1 && (
          <span className="badge badge-left">
            {tag1}
          </span>
        )}
        {tag2 && (
          <span className="badge badge-right">
            {tag2}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">
        {/* Title */}
        <h5 className="card-title mb-2" style={{color:"var(--text-color)"}}>{list.title}</h5>

        {/* Description excerpt, clamped to 3 lines, with reserved space */}
        <p className="card-text excerpt mb-3" style={{color:"var(--secondary-text)"}}>
          {list.description || "\u00A0"}
        </p>

        {/* Icons row */}
        <div className="d-flex flex-wrap align-items-center gap-2 info-row mb-3">
          <span className="d-flex gap-2 align-items-center">
            <img
              src={list.creatorProfileUrl || "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/defaultUser.webp"}
              alt="Creator"
              className="icon-creator rounded-circle"
            />
            <small className=" creator-text"  style={{color:"var(--secondary-text)"}}>
              {list.creator || "Creator"}
            </small>
          </span>
          <span className="d-flex gap-2 align-items-center">
            <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/clock.webp" alt="Duration" className="icon-sm" />
            <small className=""  style={{color:"var(--secondary-text)"}}>
              {list.duration ? list.duration : "0"} hours
            </small>
          </span>
          <span className="d-flex gap-2 align-items-center">
            <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/video.png" alt="Lectures" className="icon-sm" />
            <small className=""  style={{color:"var(--secondary-text)"}}>
              {list.lectures ? list.lectures : "0"} lectures
            </small>
          </span>
          <span className="d-flex gap-2 align-items-center">
            <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/search.png" alt="Level" className="icon-sm" />
            <small className=""  style={{color:"var(--secondary-text)"}}>
              {list.level || "Beginner"}
            </small>
          </span>
        </div>

        {/* Price */}
        {list.category === "premium" && (
          <div className="mb-3">
            <h5 className="price-text">{`\u20B9 ${list.price}`}</h5>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleViewCourse}
          className="btn btn-view-course mt-auto"
        >
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
