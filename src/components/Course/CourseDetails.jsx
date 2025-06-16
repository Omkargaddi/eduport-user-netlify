import { useLocation, useNavigate } from "react-router-dom";
import "./CourseDetails.css";
import { useContext, useRef, useState } from "react";
import PaymentModal from "../Payment/PaymentModal";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";


const CourseDetails = () => {
    const [showPay, setShowPay] = useState(false);
  const location = useLocation();
  const course = location.state?.course;
  const {  isLoggedIn, userData } = useContext(AppContext);
const navigate = useNavigate();

const handleBuyNow = () => {
  if(isLoggedIn){
    if(userData.authenticated){
      setShowPay(true);
    }else{
      toast.warning("Please verify before purchasing course!")
      navigate("/");
    }
  }else{
    toast.warning("Please login first!")
    navigate("/login");
  }
}

  const reviews = [
    [
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-01.jpg",
        title: "CRACKED MICROSOFT & AMAZON",
        name: "Ashutosh Kumar Pandey",
        text: "I trusted Eduport & enrolled in Alpha in my 2nd year for placement preparation. It gave me a good path to follow along with a streamlined syllabus. The batch supported me a lot.",
      },
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-34.jpg",
        title: "CRACKED GOOGLE",
        name: "Rojal Sapkota",
        text: "The best things about Alpha was solving lots of questions while saving a lot of my time. In fact 2 of the Qs asked to me in Google interview were directly from Alpha. I am very grateful to Eduport for everything.",
      },
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-03.jpg",
        title: "CRACKED JP MORGAN",
        name: "Varad Ingale",
        text: "I followed Eduport for everything & watched almost all the videos. With their batch I could study consistently, the alternate day schedule kept me extra motivated to complete all topics. It is a dream come true.",
      },
    ],
    [
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-04.jpg",
        title: "CRACKED GOOGLE & MICROSOFT",
        name: "Sakshi Goyat",
        text: "I tried to study DSA from YouTube but it was confusing & the path was not clear so I enrolled in this course for my placement prep. Studying consistently, completing assignments & contests helped me crack 3 tech companies.",
      },
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-05.jpg",
        title: "CRACKED FASTENAL",
        name: "Divyang Awasthi",
        text: "I am a student of Tier3 college & initially faced a lot of issues in coding. But after studying from Eduport, I believe any student who consistently studies from them can crack a good placement like me.",
      },
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-06.jpg",
        title: "CRACKED MICROSOFT",
        name: "Kartik Agarwal",
        text: "With Eduport batch I understood the importance of daily practice & an ATS friendly resume for placements. Even just before my Microsoft interviews I was watching Alpha lectures.",
      },
    ],
    [
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-37.jpg",
        title: "CRACKED DEUTSCHE BANK",
        name: "Krishna Manish Laddha ",
        text: "Because of Eduport I got 1st day 1st offer in placement season. The batch gave me a great flow & consistency. With ease I was able to complete all my lectures & questions.",
      },
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-36.jpg",
        title: "CRACKED SIEMENS",
        name: "Tuba Pervaiz",
        text: "I am from Electrical branch & initially coding with college was tough for me. I wasn't able to build momentum with youtube either. But with the batch I started coding & practicing questions daily. In my interview I got the exact question we solved in class & I was so happy..",
      },
      {
        image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/user-35.jpg",
        title: "CRACKED PAYPAL",
        name: "Epsita Mukherjee Kartik Agarwal",
        text: "Eduport helped me cracked Paypal internship & & get a PPO for job. The batch gave me a structured path to follow. Everything from lecture & assignments to mentorship session helped me a lot during my interviews.",
      },
    ],
  ];

  if (!course) return <p>No course data.</p>;

  return (
    <>
      <div style={{backgroundColor:"var(--base-color2)"}}>
        <div className="course-details p-5 text-white">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent p-0 mb-2 small">
            <li className="breadcrumb-item">
              <a href="#" className="text-white-50 text-decoration-none">
                <img
                  src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/designer8.png"
                  alt="..."
                  style={{ width: "20px", height: "20px", marginRight: "6px" }}
                />
                Eduport
              </a>
            </li>
            <li className="mx-2">
              <i class="bi bi-chevron-right" style={{color:"white"}}></i>
            </li>
            <li
              className="breadcrumb-item active text-white"
              aria-current="page"
            >
              Courses
            </li>
          </ol>
        </nav>

        <h1 className="fw-bold display-5 mb-3">{course.title}</h1>

        <p className="lead mb-4" style={{ maxWidth: "750px" }}>
          {course.description}
        </p>
        
       {Array.isArray(course.tags) && course.tags.some(tag => tag.trim() !== "")
  ? course.tags
      .filter(tag => tag.trim() !== "")
      .map((tag, idx) => (
        <button
          key={idx}
          className="btn btn-warning rounded-pill px-4 py-2 mb-4 me-3"
        >
          {tag}
        </button>
      ))
  : <p>No tags available</p>
}


        <div>
                <small className=" me-2 text-white-50" style={{color:"gray", fontSize:"15px"}}>Instructor </small>
                <img src={course.creatorProfileUrl ? course.creatorProfileUrl :"https://eduport-wda-project.s3.eu-north-1.amazonaws.com/defaultUser.webp" } alt="..." style={{width:"24px", height:"24px", borderRadius:"50%"}} />
                   <small style={{fontWeight:"500", marginLeft:"4px", color:"white", fontSize:"15px"}} className='fst-italic '>{course.creator || 'Unknown'}</small>
               </div>

        <div className="d-flex justify-content-between mt-3">
          <span className="text-white-50 small">Last updated 6/11/2025</span>
          <span style={{color:"white"}}>{course.language}</span>
        </div>
      </div>

      {/* second section */}
      <div className="container my-5" style={{backgroundColor:"var(--base-color2)"}}>
        <div className="row gy-4">
          {/* Left: What you'll learn */}
         <div className="col-12 col-lg-8">
  <div
    className="shadow-sm p-4"
    style={{ backgroundColor: "var(--base-color)", borderRadius: "18px" }}
  >
    <h3 className="text-center fw-bold mb-5">
      <span className="me-2" style={{ color: "var(--text-color)" }}>What</span>
      <span className="text-primary me-2">you’ll</span>
      <span style={{ color: "var(--text-color)" }}>learn</span>
    </h3>
    <ol className=" flex-grow-1">
      {course.whatLearn.map((item, idx) => {
        // split at the first “:”
        const [heading, ...rest] = item.split(':');
        const description = rest.join(':').trim();
        return (
          <li key={idx} style={{ fontSize: "18px", color: "var(--secondary-text)", marginBottom: "0.75rem" }}>
            <b>{heading}:</b> {description}
          </li>
        );
      })}
    </ol>
  </div>



            {/* Requirements Card */}
            <div
  className="shadow-sm p-4 my-4"
  style={{ backgroundColor: "var(--base-color)", borderRadius: "18px" }}
>
  <div className="card-body">
    <h3 className="text-center fw-bold mb-5">
      <span className="text-primary">Requirements</span>
    </h3>
    <ol className="requirements-list mb-0 flex-grow-1">
      {course.requirements.map((req, idx) => (
        <li
          key={idx}
          style={{
            fontSize: "18px",
            color: "var(--secondary-text)",
            marginBottom: "0.75rem",
          }}
        >
          {req}
        </li>
      ))}
    </ol>
  </div>
</div>

          </div>

                <div className="col-12 col-lg-4 col-md-6">
                <div className="card sidebar-card">
                  <img
                  src={course.imageUrl}
                  className="card-img-top rounded-top"
                  alt="Course preview"
                  />
                  <div className="card-body">
                  {course.category === "premium" && (
                    <h3 className="price mb-2">
                    {`\u20B9 ${(course.price)}`}{" "}
                    <span className=" text-decoration-line-through" style={{color:"var(--secondary-text)"}}>
                     {`\u20B9 ${(course.price * 1.2).toFixed(2)}`}
                    </span>
                    </h3>
                  )}
                  <button
              className="btn btn-primary btn-buy mb-3 w-100"
              onClick={handleBuyNow}
              >
              {course.category === 'premium' ? 'Buy now' : 'Enroll now'}
              </button>
                  <p className="text-center mb-4" style={{color:"var(--secondary-text)"}}>
                    {course.category === "premium"
                    ? "Purchase this course to get access"
                    : "Enroll in this course to get access"}
                  </p>

                  <h5 className="fw-semibold" style={{color:"var(--text-color)"}}>This course includes:</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex gap-2 align-items-center flex-grow-1" style={{color:"var(--secondary-text)"}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="green"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    {`${course.lectures} lectures`}
                    </li>
                    <li className="d-flex gap-2 align-items-center flex-grow-1" style={{color:"var(--secondary-text)"}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="green"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>
  {`${(course.duration / 60).toFixed(1)} hours (so far)`}
</span>
                    </li>
                    <li className="d-flex gap-2 align-items-center  flex-grow-1" style={{color:"var(--secondary-text)"}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="green"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    Access on mobile and desktop (2 Years)
                    </li>
                    <li className="d-flex gap-2 align-items-center  flex-grow-1" style={{color:"var(--secondary-text)"}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="green"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    Certificate of completion
                    </li>
                  </ul>
                  <hr />
                  <button className="btn btn-secondary ">
                    <i className="bi bi-share me-2"></i>Share
                  </button>
                  </div>
                </div>
                </div>
              </div>
              </div>

              {/* fourth section */}
      <section className="reviews-section py-5 ">
        <div className="container">
          <h3 className="text-center fw-bold mb-5" style={{color:"var(--text-color)"}} >
            Read reviews from <span className="text-primary">students</span>
          </h3>

          <div
            id="carouselReviews"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* Indicators */}
            <div className="carousel-indicators mb-4">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  data-bs-target="#carouselReviews"
                  data-bs-slide-to={idx}
                  className={idx === 0 ? "active" : ""}
                  aria-current={idx === 0 ? "true" : undefined}
                  aria-label={`Slide ${idx + 1}`}
                  style={{ backgroundColor: "black" }}
                />
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
              {reviews.map((group, idx) => (
                <div
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  key={idx}
                >
                  <div className="row justify-content-center">
                    {group.map((review, i) => (
                      <div
                        key={i}
                        className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4"
                      >
                        <div className="card review-card flex-fill text-center border-0 shadow-sm">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="rounded-circle mx-auto mt-4"
                            style={{ height: "200px", width: "200px" }}
                          />
                          <div className="card-body d-flex flex-column">
                            <h5 className="fw-bold mb-1">{review.title}</h5>
                            <p className="text-primary mb-3">{review.name}</p>
                            <p className="text-muted flex-grow-1">
                              {review.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselReviews"
              data-bs-slide="prev"
              style={{ backgroundColor: "gray", width: "60px" }}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselReviews"
              data-bs-slide="next"
              style={{ backgroundColor: "gray", width: "60px" }}
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* fifth section */}
      
      <section className="cert-sec py-5" style={{backgroundColor:"var(--base-color2)"}}>
        <h3 className="text-center cert-heading mb-3" style={{color:"var(--text-color)"}}>
        Get <span className="text-primary">Certified.</span>
      </h3>
        <div className="container shadow-sm border-1-black">
          {/* Section title */}

          <div className="row align-items-center" style={{backgroundColor:"var(--base-color)"}}>
            {/* Left side: bullets + button */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <ul className="list-unstyled cert-list mb-4">
                <li className="d-flex align-items-start mb-4">
                  <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/ribbon.png" alt="..." className="cert-icon me-3" />
                  <div>
                    <h5 className="fw-bold mb-1">Start today</h5>
                    <p className="mb-0">
                      You are just months away from cracking your dream company.
                    </p>
                  </div>
                </li>
                <li className="d-flex align-items-start">
                  <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/ribbon.png" alt="..." className="cert-icon me-3" />
                  <div>
                    <h5 className="fw-bold mb-1">Believe in yourself</h5>
                    <p className="mb-0">
                      Coding is simple. You just need the right guidance.
                      Consistency & hard work will help you be
                      Internship/Placement ready for Tech companies.
                    </p>
                  </div>
                </li>
              </ul>
              <button className="btn btn-enroll">
                Enroll Now <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>

            {/* Right side: small heading + logo + certificate */}
            <div className="col-lg-6 text-center">
              <div className="cert-image-wrapper mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-uppercase fw-semibold">
                    Start your placement journey today.
                  </small>
                  <img
                    src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/designer8.png"
                    alt="Apna College logo"
                    className="apna-logo"
                  />
                </div>
                <img
                  src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/certificateImage.webp"
                  alt="Certificate of Completion"
                  className="img-fluid certificate-img"
                  style={{ maxHeight: "300px", maxWidth: "400px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>



<PaymentModal
        show={showPay}
        onHide={() => setShowPay(false)}
        course={course}
        category={course.category}
      />
    </>
  );
};

export default CourseDetails;
