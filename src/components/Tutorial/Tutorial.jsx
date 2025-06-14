import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import "./Tutorial.css"

const Tutorial = () => {
  const { categoryId } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [list, setList] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // track intro vs. section/page
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);
  const [activePageIndex, setActivePageIndex] = useState(null);

  // track which accordion section is open; null = all closed
  const [openSectionKey, setOpenSectionKey] = useState(null);

  const toggleSidebar = () => setShowSidebar(prev => !prev);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/categories/${categoryId}`);
        setList(data);

        // default to “Introduction”
        setActiveSectionIndex(null);
        setActivePageIndex(null);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load tutorial.');
      }
    };
    fetchList();
  }, [backendUrl, categoryId]);

  if (!list) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading tutorial...</span>
        </Spinner>
      </div>
    );
  }

  const sections = list.sections;

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
    // if clicking the open section, close it; otherwise open
    setOpenSectionKey(prev => (prev === key ? null : key));
  };

  // Determine what to render in main content
  const isIntro = activeSectionIndex === null;
  const activeSection = isIntro ? null : sections[activeSectionIndex];
  const activePage = isIntro ? null : activeSection.items[activePageIndex];

  return (
    <div style={{backgroundColor:"var(--base-color2)"}}>
      {/* Mobile Navbar */}
      <div expand={false} className="p-3" style={{ backgroundColor: 'var(--navbar-secondary)' }}>
  <Container fluid className="d-flex justify-content-between">
    <Navbar.Brand className="fw-bold ms-4" style={{ color: 'var(--text-color)' }}>
      {list.title}
    </Navbar.Brand>
    {/* Mobile toggle button */}
    <button
      type="button"
      className="btn d-md-none"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      style={{ color: 'var(--text-color)' }}
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
  style={{backgroundColor:"var(--base-color2)"}}
>
  <Offcanvas.Header closeButton className="offcanvas-mobile__header" style={{backgroundColor:"var(--base-color2)"}}>
    <Offcanvas.Title className="offcanvas-mobile__title" >
      Contents
    </Offcanvas.Title>
  </Offcanvas.Header>

  <Offcanvas.Body className="offcanvas-mobile__body" style={{backgroundColor:"var(--base-color2)"}}>
    <ListGroup>
      <ListGroup.Item
        action
        active={isIntro}
        onClick={handleIntroClick}
        className="sidebar__item"
        style={{color:"var(--text-color)", backgroundColor:"var(--navbar-secondary)"}}
      >
        Introduction
      </ListGroup.Item>
    </ListGroup>

    <Accordion
      activeKey={openSectionKey}
      onSelect={toggleSection}
      className="mt-3"
    >
      {sections.map((sec, secIdx) => (
        <Accordion.Item eventKey={sec.sectionId} key={sec.sectionId}>
          <Accordion.Header className="sidebar__header" style={{color:"var(--text-color)"}}>
            {sec.title}
          </Accordion.Header>
          <Accordion.Body className="sidebar__body">
            <ListGroup>
              {sec.items.map((item, pageIdx) => (
                <ListGroup.Item
                  key={item.pageId}
                  action
                  active={
                    secIdx === activeSectionIndex &&
                    pageIdx === activePageIndex
                  }
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


      <Container fluid >
        <Row>
          {/* Desktop Sidebar */}
          <Col className="d-none d-md-block sidebar" >
    <ListGroup>
      <ListGroup.Item
        action
        active={isIntro}
        onClick={handleIntroClick}
        className="sidebar__item"
        style={{backgroundColor:"var(--navbar-secondary)", color:"var(--text-color)"}}
      >
        Introduction
      </ListGroup.Item>
    </ListGroup>

    <Accordion
      activeKey={openSectionKey}
      onSelect={toggleSection}
      className="mt-3 sidebar__accordion"
    >
      {sections.map((sec, secIdx) => (
        <Accordion.Item eventKey={sec.sectionId} key={sec.sectionId}>
          <Accordion.Header className="sidebar__header">
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
  </Col>

          {/* Main Content */}
          <Col md={9} className="px-4">
            {isIntro ? (
              <>
                {/* Introduction banner (same as before) */}
                <div className="rounded p-5 text-center mt-4 mb-5" style={{ backgroundColor: 'var(--navbar-secondary)' }}>
                    <h1 className="fw-bold mb-3" style={{color:"var(--text-color)"}}>{list.title}</h1>
                    <p className="" style={{color:"var(--secondary-text)"}}>{list.description}</p>
                </div>
                <Card className="shadow-sm mb-5" style={{border:"none"}}>
                    <Card.Body style={{backgroundColor:"var(--base-variant)"}}>
                        <Card.Title className="mb-3" style={{color:"var(--text-color)"}}>Overview</Card.Title>
                        <Card.Text className=" mb-3" style={{color:"var(--secondary-text)"}}>
                            This tutorial contains <strong>{sections.length}</strong> section
                            {sections.length > 1 ? 's' : ''}.
                        </Card.Text>
                        <Card.Title className="mb-3" style={{color:"var(--text-color)"}}>Get Started</Card.Title>
                        <Card.Text className=" mb-3" style={{color:"var(--secondary-text)"}}>
                            Welcome to the <strong>{list.title}</strong> tutorial series! To begin learning:<br /><br />
                            Select a lesson from the sidebar on the left<br />
                            Work through the lessons in order for the best learning experience<br />
                            Each lesson contains detailed explanations and examples
                        </Card.Text>
                        <Button
                            variant="primary"
                            className="mt-4 rounded-pill px-4"
                            onClick={() => {
                                // auto-open first section and first page
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
                {/* Page header */}
                <div className="rounded p-4 text-center mt-4 mb-5" style={{ backgroundColor: 'var(--navbar-secondary)', color:"var(--text-color)" }}>
                  <h2 className="fw-bold mb-3">{activePage.title}</h2>
                  
                </div>
                {/* Page content */}
               <Card className="shadow-sm mb-5 p-2" style={{borderLeft:"1px solid var(--text-color)", backgroundColor:"var(--base-color2)"}}>
  <Card.Body >
    <div
      className="tutorial-page-content"
      dangerouslySetInnerHTML={{ __html: activePage.content }}
    />
  </Card.Body>
</Card>

              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tutorial;
