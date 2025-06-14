import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "../src/pages/Home";
import ResetPassword from "../src/components/ResetPassword/ResetPassword.jsx";
import Login from "../src/components/Login/Login.jsx";
import Course from "./components/Course/Course.jsx";
import { ToastContainer } from "react-toastify";
import EmailVerify from "../src/components/EmailVerify/EmailVerify.jsx";
import Profile from "../src/components/Profile/Profile.jsx";
import CourseDetails from "./components/Course/CourseDetails.jsx";
import Notes from "./components/Notes/Notes.jsx";
import Blogs from "./components/Blogs/Blogs.jsx";
import Header1 from "./components/Header/Header1.jsx";
import Footer from "./components/Footer/Footer.jsx";
import BlogCard from "./components/Blogs/BlogCard.jsx";
import Tutorials from "./components/Tutorial/Tutorials.jsx";
import Tutorial from "./components/Tutorial/Tutorial.jsx";
import Contact from "./components/ContactUs/Contact.jsx";
import About from "./components/About/About.jsx";
import Support from "./components/Support/Support.jsx";
import MyCourses from "./components/MyCourses/MyCourses.jsx";

const Layout = () => {
  return (
    <>
      <Header1 />
        <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: "10000" }}
      />
      <Routes>
        {/* Routes with header and footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="course" element={<Course />} />
          <Route path="profile" element={<Profile />} />
          <Route path="course-details" element={<CourseDetails />} />
          <Route path="blog-details" element={<BlogCard />} />
          <Route path="notes" element={<Notes />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="tutorial" element={<Tutorials />} />
           <Route path="contact" element={<Contact />} />
           <Route path="about" element={<About />} />
           <Route path="support" element={<Support />} />
          <Route path="/tutorial/:categoryId" element={<Tutorial />} />
           <Route path="/mycourses" element={<MyCourses />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
        {/* Routes without header and footer */}
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="email-verify" element={<EmailVerify />} />
      </Routes>
    </>
  );
}

export default App;
