// Home.jsx
import React, { useState, useEffect } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const words = ["Learn", "Code", "Build", "Succeed"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = wordIndex % words.length;
    const fullText = words[current];
    const delta = isDeleting ? 100 : 200;

    const handleType = () => {
      const nextText = isDeleting
        ? fullText.substring(0, charIndex - 1)
        : fullText.substring(0, charIndex + 1);
      setText(nextText);

      if (!isDeleting && nextText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && nextText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    };

    const ticker = setTimeout(handleType, delta);
    return () => clearTimeout(ticker);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <>
      <section className="home-hero d-flex justify-content-center align-items-center flex-column text-center">
        {/* Hero content */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <h1
                className="mb-3"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 6vw, 80px)",
                  lineHeight: 1.1,
                }}
              >
                <span style={{ color: "var(--text-color)" }}>Welcome to</span>{" "}
                <span className="loading-text" >Eduport</span>
              </h1>

              <h3
                className="h3 fw-light mb-4"
                style={{ color: "var(--text-color)" }}
              >
                <span className="typewriter">{text}</span>
                <span className="cursor">|</span> with fun!
              </h3>

              <p
                className="mb-4 "
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 22px)",
                  lineHeight: 1.5,
                  color: "var(--secondary-text)",
                }}
              >
                Confused about which course to take? We've got you covered!
                Browse courses and discover the best option for you. It's free!
                Eduport is our effort to teach the basics and those coding
                techniques in a short time that would take years to master.
              </p>

              {/* Buttons centered and stacked on small, inline on larger but still centered */}
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <NavLink to="/course" className="btn btn-primary btn-lg">
                  Explore Courses
                </NavLink>
                <NavLink
                  to="/blog"
                  className="btn btn-lg"
                  style={{
                    backgroundColor: "var(--base-color)",
                    color: "var(--text-color)",
                  }}
                >
                  Read Articles
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Info-box centered */}
        <div className="container">
          <div
            className="info-box shadow-lg rounded-4  bg-opacity-75 p-4 mx-auto mt-6"
            style={{
              maxWidth: "800px",
              backgroundColor: "var(--base-variant)",
              color: "var(--text-color)",
            }}
          >
            <div className="d-flex text-center align-items-center justify-content-center">
              <div className="col-4 mb-3 mb-md-0">
                <h3 className="fw-bold mb-1">100+</h3>
                <p className="mb-0" style={{ color: "var(--secondary-text)" }}>
                  Courses
                </p>
              </div>

              <div
                className="vr mx-3"
                style={{ border: "1px solid var(--text-color)" }}
              ></div>

              <div className="col-4 mb-3 mb-md-0">
                <h3 className="fw-bold mb-1">500K+</h3>
                <p className=" mb-0" style={{ color: "var(--secondary-text)" }}>
                  Students
                </p>
              </div>

              <div
                className="vr mx-3"
                style={{ border: "1px solid var(--text-color)" }}
              ></div>

              <div className="col-4">
                <h3 className="fw-bold mb-1">5.0</h3>
                <p className=" mb-0" style={{ color: "var(--secondary-text)" }}>
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Practice Section */}
      <section
        className="practice-section py-5"
        style={{ backgroundColor: "var(--base-color)" }}
      >
        <div className="container">
          <h2
            className="section-title text-center mb-3"
            style={{ color: "var(--text-color)" }}
          >
            Code Smarter with Real-World Practice
          </h2>
          <p
            className="section-subtitle text-center  mb-5"
            style={{ color: "var(--secondary-text)" }}
          >
            At Eduport, you don’t just learn code — you engage in practical
            exercises that reflect real-world scenarios. From beginner-friendly
            lessons to advanced courses, we prepare you for projects you’ll
            actually build.
          </p>
          <div className="row g-4">
            {[
              {
                title: "Web Development",
                desc: "Learn HTML, CSS, JavaScript and modern frameworks to build responsive websites and web applications.",
                image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/web-developments.webp",
              },
              {
                title: "Data Science & AI",
                desc: "Master Python, data analysis, machine learning and AI with hands-on projects.",
                image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/py-problems.jpg",
              },
              {
                title: "Data Structures & Algorithms",
                desc: "Learn DSA and crack interviews at top companies like Google and Microsoft.",
                image: "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/dsa.png",
              },
            ].map((card, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="practice-card h-100 rounded shadow-sm">
                  <img
                    src={card.image}
                    alt="..."
                    className="img-fluid w-100"
                    style={{ objectFit: "cover", height: "240px" }}
                  />

                  <div className="p-4">
                    <h5
                      className="fw-semibold mb-2"
                      style={{ color: "var(--text-color)" }}
                    >
                      {card.title}
                    </h5>
                    <p
                      className="mb-0"
                      style={{ color: "var(--secondary-text)" }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="stats-section py-5 text-center"
        style={{ backgroundColor: "var(--base-color2)" }}
      >
        <div className="container">
          <h2
            className="fw-bold mb-5"
            style={{ fontSize: "30px", color: "var(--text-color)" }}
          >
            Empowering Aspiring Developers to Build Their Future in Tech!
          </h2>
          <div className="row mb-5">
            <div className="col-md-4 mb-4 mb-md-0">
              <p className=" mb-1" style={{ color: "var(--secondary-text)" }}>
                Students land their first developer job in
              </p>
              <h3 className="fw-bold" style={{ color: "var(--text-color)" }}>
                6 months
              </h3>
              <p className="" style={{ color: "var(--secondary-text)" }}>
                on average
              </p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <p className=" mb-1" style={{ color: "var(--secondary-text)" }}>
                Over
              </p>
              <h3 className="fw-bold" style={{ color: "var(--text-color)" }}>
                7,000,000+
              </h3>
              <p className="" style={{ color: "var(--secondary-text)" }}>
                students trained
              </p>
            </div>
            <div className="col-md-4">
              <p className=" mb-1" style={{ color: "var(--secondary-text)" }}>
                Total YouTube Views
              </p>
              <h3 className="fw-bold" style={{ color: "var(--text-color)" }}>
                1 Billion+
              </h3>
              <p className="" style={{ color: "var(--secondary-text)" }}>
                views and counting
              </p>
            </div>
          </div>

          <h4 className="fw-bold mb-4" style={{ color: "var(--text-color)" }}>
            Helped students achieve their{" "}
            <span className="text-primary">dream job</span> at
          </h4>
          <div className="row justify-content-center">
            {[
              "amazon",
              "google",
              "microsoft",
              "goldman",
              "paypal",
              "samsung",
              "ey",
              "hitachi",
              "jpmorgan",
              "ibm",
              "dell",
              "deloitte",
            ].map((company, idx) => (
              <div key={idx} className="col-4 col-sm-3 col-md-2 mb-4">
                <div className="bg-white p-2 rounded shadow-sm h-100 d-flex align-items-center justify-content-center ">
                  <img
                    src={`https://logo.clearbit.com/${company}.com`}
                    alt={company}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "40px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className=" mt-3" style={{ color: "var(--secondary-text)" }}>
            + many more companies
          </p>
        </div>
      </section>

      <section
        className="offerings-section py-5"
        style={{ backgroundColor: "var(--base-color2)" }}
      >
        <div className="container">
          <h2
            className="section-title mb-4"
            style={{ color: "var(--text-color)" }}
          >
            Master Coding with Our Core Offerings
          </h2>
          <div className="row g-4">
            {[
              {
                icon: "bi-lightbulb",
                title: "Beginner-Friendly",
                text: "Step-by-step courses designed for absolute beginners to kickstart their coding journey.",
              },
              {
                icon: "bi-stack",
                title: "Advanced Concepts",
                text: "Deep dive into advanced topics and frameworks to level up your skills.",
              },
              {
                icon: "bi-code-slash",
                title: "Real-World Projects",
                text: "Learn by building real-world projects and gain hands-on experience.",
              },
              {
                icon: "bi-currency-dollar",
                title: "Affordable Pricing",
                text: "Access premium courses at prices tailored for students and professionals.",
              },
              {
                icon: "bi-journal-bookmark",
                title: "Comprehensive Resources",
                text: "Gain access to templates, docs, and code snippets to enhance your learning.",
              },
              {
                icon: "bi-bar-chart",
                title: "Industry Insights",
                text: "Stay updated with the latest trends and insights from the tech industry.",
              },
            ].map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div
                  className="offering-card p-4 h-100 text-center"
                  style={{ backgroundColor: "var(--base-variant)" }}
                >
                  <div className="icon-circle mb-3">
                    <i className={`bi ${item.icon} fs-2`} style={{color:"white"}}></i>
                  </div>
                  <h5
                    className="fw-semibold mb-2"
                    style={{ color: "var(--text-color)" }}
                  >
                    {item.title}
                  </h5>
                  <p
                    className=" mb-0"
                    style={{ color: "var(--secondary-text)" }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section py-5">
        <div className="container">
          <h2
            className="section-title text-center mb-5"
            style={{ color: "var(--text-color)" }}
          >
            Testimonials
          </h2>
          <div className="row g-4">
            {/* Testimonial 1 */}
            <div className="col-md-6">
              <div className="testimonial-card p-4 h-100 rounded">
                <div className="quote-icon mb-3">“</div>
                <p className="testimonial-text mb-4">
                  I don’t have words to thank this man, I’m really grateful to
                  have this channel and website in my daily routine. If you’re a
                  mere beginner, then you can trust this guy and can put your
                  time into his content. I can assure you that it’ll be worth
                  it.
                </p>
                <p className="mb-0" style={{ color: "var(--text-color)" }}>
                  <strong>Mohit Kumar</strong>
                </p>
                <p
                  className="text small"
                  style={{ color: "var(--secondary-text)" }}
                >
                  Web Developer
                </p>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="col-md-6">
              <div className="testimonial-card p-4 h-100  rounded">
                <div className="quote-icon mb-3">“</div>
                <p className="testimonial-text mb-4">
                  For everyone who wants to level up their #Coding and #Dev
                  skills – seriously, this channel is for you! Both basic and
                  advanced stacks are covered on this channel, and one can learn
                  according to their skill levels. And the icing on the cake is,
                  most of the content is available for free.
                </p>
                <p className="mb-0" style={{ color: "var(--text-color)" }}>
                  <strong>Rakesh Shetty</strong>
                </p>
                <p
                  className=" small"
                  style={{ color: "var(--secondary-text)" }}
                >
                  Web Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="cta-section text-center py-5">
        <div className="container">
          <h3 className="fw-bold mb-3">Start Your Coding Journey</h3>
          <p className=" mb-4" style={{color:"white"}}>
            Learn coding step-by-step with India’s most loved programming
            mentor.
          </p>
          <NavLink to="/tutorial" className="btn btn-primary btn-lg">
            Start Now
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Home;
