
import './About.css';

const About = () => {
  return (

   <div style={{backgroundColor:"var(--base-color)", padding:"4px"}}>
     <div className="about-container" >
      {/* HERO / INTRO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>
            Welcome to <strong>Eduport</strong>, your go‑to destination for high‑quality tech education. Whether you’re just dipping your toes into web development or aiming to master advanced algorithms, Eduport has you covered.
          </p>
        </div>
        <div className="hero-image">
          <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/team.png" alt="Eduport learning" />
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to democratize tech learning—making it accessible, affordable, and engaging for everyone. From visual learners to text enthusiasts, our content caters to every style, ensuring you reach your goals faster and with confidence.
        </p>
      </section>

      {/* OFFERINGS SECTION */}
      <section className="offerings-section">
        <h2>What We Offer</h2>
        <p>We offer an ever‑growing library of:</p>
        <ul>
          <li>
            <strong>Hands‑on Courses</strong>: Dive into HTML, CSS, JavaScript, Java, Data Structures &amp; Algorithms, and many more, all crafted to take you from fundamentals to pro.
          </li>
          <li>
            <strong>In‑Depth Tutorials</strong>: Step through real‑world coding examples, best practices, and live demos that help you build projects and solidify your understanding.
          </li>
          <li>
            <strong>Insightful Blogs &amp; Notes</strong>: Keep up with industry trends, coding tips, and deep dives written by practitioners who’ve been in the trenches.
          </li>
        </ul>

        {/* Optionally, show small images/icons for each offering */}
        <div className="offerings-images" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ flex: '1 1 200px', borderRadius: '0.5rem', overflow: 'hidden', background: 'var(--base-color2)' }}>
            <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/course.png" alt="Courses" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ flex: '1 1 200px', borderRadius: '0.5rem', overflow: 'hidden', background: 'var(--base-color2)' }}>
            <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/tutorialbg.png" alt="Tutorials" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ flex: '1 1 200px', borderRadius: '0.5rem', overflow: 'hidden', background: 'var(--base-color2)' }}>
            <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/blogbg.png" alt="Blogs & Notes" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* WORK WITH US SECTION */}
      <section className="workwithus-section">
        <h2>Work With Us</h2>
        <p>
          Passionate about teaching or an expert in your field? Join the <strong>Eduport Admin</strong> community and share your knowledge with thousands of eager learners worldwide.
        </p>
        <p>As an Eduport Admin (author), you’ll be able to:</p>
        <ol>
          <li>
            <strong>Create &amp; Publish</strong>
            <ul>
              <li>Build comprehensive courses with video lectures, quizzes, and coding assignments</li>
              <li>Write detailed tutorials, blog posts, and downloadable notes</li>
            </ul>
          </li>
          <li>
            <strong>Monitor &amp; Engage</strong>
            <ul>
              <li>Track student progress through built‑in analytics</li>
              <li>Respond to questions, host live Q&amp;A sessions, and gather feedback</li>
            </ul>
          </li>
          <li>
            <strong>Earn &amp; Grow</strong>
            <ul>
              <li>Monetize your content through our transparent revenue‑share model</li>
              <li>Expand your personal brand with a dedicated author profile and endorsements</li>
            </ul>
          </li>
        </ol>
        <div className="cta-button-wrapper">
          {/* Replace href with your actual Admin signup route */}
          <a href="/admin-signup" className="cta-btn">
            Join Eduport Admin
          </a>
        </div>
      </section>
    </div>
   </div>
  );
};

export default About;
