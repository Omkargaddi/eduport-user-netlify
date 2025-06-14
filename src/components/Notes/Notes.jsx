import { AppContext } from "../../context/AppContext";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Notes.css";
import { Spinner } from "react-bootstrap";

const Notes = () => {
  const [list, setList] = useState(null);
  const { backendUrl } = useContext(AppContext);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/note`);
      setList(response.data);
    } catch (error) {
      console.log(error);
      toast.warning("Error while reading the notes.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

   if (!list) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh', backgroundColor:"var(--base-color)" }}>
        <Spinner animation="border" role="status" style={{color:"var(--text-color)"}}>
          <span className="visually-hidden">Loading tutorial...</span>
        </Spinner>
      </div>
    );
  }

  // Filtered data arrays
  const notesData = list.filter((item) => item.category === "note");
  const cheatsheetsData = list.filter((item) => item.category === "cheetsheet");
  const handbooksData = list.filter((item) => item.category === "handbook");

  // Prepare sections to render to avoid repetition
  const sections = [
    {
      key: "notes",
      title: "Download Notes",
      data: notesData,
      buttonText: "PDF Notes",
      subText: "Download Notes Here",
    },
    {
      key: "cheatsheets",
      title: "Download Cheatsheets",
      data: cheatsheetsData,
      buttonText: "Download",
      subText: "Download Cheatsheets Here",
    },
    {
      key: "handbooks",
      title: "Download Handbooks",
      data: handbooksData,
      buttonText: "Download",
      subText: "Download Handbooks Here",
    },
  ];

  return (
    <>
      {sections.map((section) => (
        <div style={{ backgroundColor: "var(--base-color2)" }}>
        <div key={section.key} className="container py-5" >
          <h2 className="text-center mb-4" style={{color:"--text-color"}}>{section.title}</h2>
          {section.data.length > 0 ? (
            <div className="row g-4">
              {section.data.map((note) => (
                <div
                  key={note.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex"
                >
                  <div className="card h-100 shadow-sm notes-card">
                    <div className="card-body d-flex flex-column text-center">
                      {/* Icon/Image */}
                      <div className="icon-wrapper mx-auto mb-3">
                        <img
                          src={note.imageUrl}
                          alt={`${note.title} icon`}
                          className="notes-icon"
                        />
                      </div>

                      {/* Title */}
                      <h5 className="card-title mb-2">{note.title}</h5>
                      {/* Subtext */}
                      <p className="card-text text-muted mb-3">
                        {section.subText}
                      </p>

                      {/* Button at bottom */}
                      <div className="mt-auto d-flex justify-content-center">
                        <a
                          href={note.pdfUrl}
                          className="btn notes-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {section.buttonText}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">
              No items available in this section.
            </p>
          )}
        </div>
        </div>
      ))}
    </>
  );
};

export default Notes;
