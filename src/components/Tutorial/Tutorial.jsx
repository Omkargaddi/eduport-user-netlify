import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Navbar,
  Offcanvas,
  Accordion,
  ListGroup,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import "./Tutorial.css";

const Tutorial = () => {
  const { categoryId } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [list, setList] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);
  const [activePageIndex, setActivePageIndex] = useState(null);
  const [openSectionKey, setOpenSectionKey] = useState(null);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/categories/${categoryId}`);
        setList(data);
        setActiveSectionIndex(null);
        setActivePageIndex(null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tutorial.");
      }
    };
    fetchList();
  }, [backendUrl, categoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSectionIndex, activePageIndex]);

  if (!list) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading tutorial...</span>
        </Spinner>
      </div>
    );
  }

  const sections = list.sections;
  const isIntro = activeSectionIndex === null;

  const hasNext = !isIntro && (
    activePageIndex < sections[activeSectionIndex].items.length - 1 ||
    activeSectionIndex < sections.length - 1
  );

  const handleIntroClick = () => {
    setActiveSectionIndex(null);
    setActivePageIndex(null);
    setShowSidebar(false);
  };

  const handlePageClick = (secIdx, pageIdx) => {
    setActiveSectionIndex(secIdx);
    setActivePageIndex(pageIdx);
    setShowSidebar(false);
  };

  const toggleSection = (key) => {
    setOpenSectionKey((prev) => (prev === key ? null : key));
  };

  const handleNext = () => {
    if (activePageIndex < sections[activeSectionIndex].items.length - 1) {
      setActivePageIndex(activePageIndex + 1);
    } else if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
      setActivePageIndex(0);
    }
  };

  const handlePrevious = () => {
    if (activePageIndex > 0) {
      setActivePageIndex(activePageIndex - 1);
    } else if (activeSectionIndex > 0) {
      const prevSectionIndex = activeSectionIndex - 1;
      setActiveSectionIndex(prevSectionIndex);
      setActivePageIndex(sections[prevSectionIndex].items.length - 1);
    } else {
      setActiveSectionIndex(null);
      setActivePageIndex(null);
    }
  };

  // Function to get the next page title
  const getNextPageTitle = () => {
    if (activePageIndex < sections[activeSectionIndex].items.length - 1) {
      return sections[activeSectionIndex].items[activePageIndex + 1].title;
    } else if (activeSectionIndex < sections.length - 1) {
      return sections[activeSectionIndex + 1].items[0].title;
    }
    return "";
  };

  // Function to get the previous page title
  const getPreviousPageTitle = () => {
    if (activePageIndex > 0) {
      return sections[activeSectionIndex].items[activePageIndex - 1].title;
    } else if (activeSectionIndex > 0) {
      const prevSection = sections[activeSectionIndex - 1];
      return prevSection.items[prevSection.items.length - 1].title;
    } else {
      return "Introduction";
    }
  };

  const activeSection = isIntro ? null : sections[activeSectionIndex];
  const activePage = isIntro ? null : activeSection.items[activePageIndex];

  return (
    <div style={{ backgroundColor: "var(--base-color2)" }}>
      {/* Mobile Navbar */}
      <div expand={false} className="p-3" style={{ backgroundColor: "var(--navbar-secondary)" }}>
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand className="fw-bold ms-4" style={{ color: "var(--text-color)" }}>
            {list.title}
          </Navbar.Brand>
          <button
            type="button"
            className="btn d-md-none"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            style={{ color: "var(--text-color)" }}
          >
            <i className="bi bi-list" />
          </button>
        </Container>
      </div>

      {/* Mobile Offcanvas */}
      <Offcanvas
        show={showSidebar}
        onHide={toggleSidebar}
        className="offcanvas-mobile d-md-none"
        scroll
        style={{ backgroundColor: "var(--base-color2)" }}
      >
        <Offcanvas.Header closeButton className="offcanvas-mobile__header">
          <Offcanvas.Title className="offcanvas-mobile__title">Contents</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-mobile__body">
          <ListGroup>
            <ListGroup.Item
              action
              active={isIntro}
              onClick={handleIntroClick}
              className="sidebar__item"
              style={{ color: "var(--text-color)", backgroundColor: "var(--navbar-secondary)" }}
            >
              Introduction
            </ListGroup.Item>
          </ListGroup>
          <Accordion activeKey={openSectionKey} onSelect={toggleSection} className="mt-3">
            {sections.map((sec, secIdx) => (
              <Accordion.Item eventKey={sec.sectionId} key={sec.sectionId}>
                <Accordion.Header className="sidebar__header" style={{ color: "var(--text-color)" }}>
                  {sec.title}
                </Accordion.Header>
                <Accordion.Body className="sidebar__body">
                  <ListGroup>
                    {sec.items.map((item, pageIdx) => (
                      <ListGroup.Item
                        key={item.pageId}
                        action
                        active={secIdx === activeSectionIndex && pageIdx === activePageIndex}
                        onClick={() => handlePageClick(secIdx, pageIdx)}
                        className="sidebar__item sidebar__item--nested"
                      >
                        {item.title}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid>
        <Row>
          {/* Desktop Sidebar */}
          <Col className="d-none d-md-block sidebar">
            <ListGroup>
              <ListGroup.Item
                action
                active={isIntro}
                onClick={handleIntroClick}
                className="sidebar__item"
                style={{ backgroundColor: "var(--navbar-secondary)", color: "var(--text-color)" }}
              >
                Introduction
              </ListGroup.Item>
            </ListGroup>
            <Accordion activeKey={openSectionKey} onSelect={toggleSection} className="mt-3 sidebar__accordion">
              {sections.map((sec, secIdx) => (
                <Accordion.Item eventKey={sec.sectionId} key={sec.sectionId}>
                  <Accordion.Header className="sidebar__header">{sec.title}</Accordion.Header>
                  <Accordion.Body className="sidebar__body">
                    <ListGroup>
                      {sec.items.map((item, pageIdx) => (
                        <ListGroup.Item
                          key={item.pageId}
                          action
                          active={secIdx === activeSectionIndex && pageIdx === activePageIndex}
                          onClick={() => handlePageClick(secIdx, pageIdx)}
                          className="sidebar__item sidebar__item--nested"
                        >
                          {item.title}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>

          {/* Main Content */}
          <Col md={9} className="px-4">
            {isIntro ? (
              <>
                <div
                  className="rounded p-5 text-center mt-4 mb-5"
                  style={{
                    backgroundColor: "var(--navbar-secondary)",
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.45)),
                      url(${list.imageUrl})
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h1 className="fw-bold mb-3" style={{ color: "white" }}>
                    {list.title}
                  </h1>
                  <p style={{ color: "white" }}>{list.description}</p>
                </div>
                <Card className="shadow-sm mb-5" style={{ border: "none" }}>
                  <Card.Body style={{ backgroundColor: "var(--base-variant)" }}>
                    <Card.Title className="mb-3" style={{ color: "var(--text-color)" }}>
                      Overview
                    </Card.Title>
                    <Card.Text className="mb-3" style={{ color: "var(--secondary-text)" }}>
                      This tutorial contains <strong>{sections.length}</strong> section
                      {sections.length > 1 ? "s" : ""}.
                    </Card.Text>
                    <Card.Title className="mb-3" style={{ color: "var(--text-color)" }}>
                      Get Started
                    </Card.Title>
                    <Card.Text className="mb-3" style={{ color: "var(--secondary-text)" }}>
                      Welcome to the <strong>{list.title}</strong> tutorial series! To begin learning:
                      <br />
                      <br />
                      Select a lesson from the sidebar on the left
                      <br />
                      Work through the lessons in order for the best learning experience
                      <br />
                      Each lesson contains detailed explanations and examples
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="mt-4 rounded-pill px-4"
                      onClick={() => {
                        toggleSection(sections[0].sectionId);
                        handlePageClick(0, 0);
                      }}
                    >
                      Start Learning
                    </Button>
                  </Card.Body>
                </Card>
              </>
            ) : (
              <>
                <div
                  className="rounded p-4 text-center mt-4 mb-5"
                  style={{
                    transform: "rotate(180deg)",
                    backgroundImage: `
                      url(https://eduport-wda-project.s3.eu-north-1.amazonaws.com/blue-and-orange-defocused-blurred-motion-gradient-abstract-background-vector.webp)
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div style={{ transform: "rotate(180deg)" }}>
                    <h2 className="fw-bold mb-3" id="tut-header">
                      {activePage.title}
                    </h2>
                  </div>
                </div>
                <Card
                  className="shadow-sm mb-5 p-2"
                  style={{ borderLeft: "1px solid var(--text-color)", backgroundColor: "var(--base-color2)" }}
                >
                  <Card.Body>
                    <div className="tutorial-page-content" dangerouslySetInnerHTML={{ __html: activePage.content }} />
                  </Card.Body>
                </Card>
                {/* Navigation Buttons - Only shown when not on intro */}
                {!isIntro && (
                  <div className="d-flex justify-content-between mt-4 mb-5">
                    <Button variant="secondary" onClick={handlePrevious}>
                      Previous: {getPreviousPageTitle()}
                    </Button>
                    <Button variant="primary" disabled={!hasNext} onClick={handleNext}>
                      {hasNext ? `Next: ${getNextPageTitle()}` : "Next"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tutorial;