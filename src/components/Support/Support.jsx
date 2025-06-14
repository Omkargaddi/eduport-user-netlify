// Support.js
import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import {
  RocketTakeoff,
  ShieldLock,
  PersonCircle,
} from 'react-bootstrap-icons';
import './Support.css'; // Make sure your CSS variables are defined globally

const supportCards = [
  {
    icon: <RocketTakeoff size={32} className="mb-2" />,
    title: 'Getting Started',
    text:
      'Learn how to set up your account, explore key features, and get the most out of our platform.',
    link: '#',
  },
  {
    icon: <ShieldLock size={32} className="mb-2" />,
    title: 'Security & Protection',
    text:
      'Keep your account safe with our advanced security measures and best practices.',
    link: '#',
  },
  {
    icon: <PersonCircle size={32} className="mb-2" />,
    title: 'Account & Subscription',
    text:
      'Manage your account settings, update subscription plans, and handle billing.',
    link: '#',
  },
];

const faqData = [
   {
    question: "What is Web Development?",
    answer: "It is the process of building websites for the internet. We use many websites like Amazon, Flipkart, Netflix & many more. We will learn the process of designing, building & deploying such websites on the internet.",
  },
   {
    question: "What is MERN Stack in Development?",
    answer: "MERN stands for MongoDB, Express, React & Node. These are the 4 key technologies that will be covered in the batch. MERN is the most popular stack for web development & choice for today’s web developers.",
  },
   {
    question: "Why should I learn Web Development?",
    answer: "Almost all tech companies do some kind of development, thus becoming a SKILLED Full Stack Web Developer opens up a lot of jobs for you. You will built projects that will give you a practical coding & development experience. These projects will be useful when you apply for internships & placements. Even if you apply for Software Engineering roles, development experience will give you an edge in the selection process. You can also use your development skills to do freelancing, contribute to open source or work on building your own tech startup.",
  },
   {
    question: "Can I access lectures on multiple devices at once?",
    answer: "You can access lectures from any type of device - computer, laptop, phone, ipad etc. but you'll only be able to access/login to the batch on one device at a time. ",
  },
  {
    question: "I don't know anything about coding. Is these batches good for me?",
    answer:" Absolutely! This batch is designed for complete beginners. We'll start from fundamentals and build up your skills step by step.",
  },
  {
    question: "Do I need to be a Computer Science student to take up these batches?",
    answer: "Not at all. Whether you're from any discipline, as long as you have the enthusiasm to learn, you're welcome here.",
  },
  {
    question: "How will I ask my doubts?",
    answer: "You can post questions in our live chat during sessions, submit through the dashboard forum, or book one-on-one doubt-clearing calls.",
  },
  {
    question: "What is the batch duration?",
    answer: "This is a 12-week intensive program, with 3 sessions per week and additional weekend workshops.",
  },
  {
    question: "Is the batch in Hindi or English?",
    answer: "Sessions are primarily in English, but explanations and materials are bilingual to ensure clarity for all participants.",
  },
   {
    question: "Will there be a Certificate of completion?",
    answer: "Yes, you will get a certificate of completion after finishing all the lectures.",
  },
  {
    question: "Is there a batch schedule? ",
    answer: "Yes, the schedule will be for alternate day lectures. Additional details about the live mentorship sessions are shared with students on orientation day (Day 1) of the batch.",
  },
  {
    question: "Is there a group/community I can join after enrolling?",
    answer: "Yes, an exclusive Eduport 7.0 community will be there for all enrolled students.",
  },
  {
    question: "I just completed 12th and I want to start preparing for my internship/job as a Software Developer, can I take it?",
    answer: "Yes, you are eligible to enrol as we will cover everything from basics to advanced. It is always better to start as early as possible. It will give you a good head start and ample time to practice. ",
  },
  {
    question: "Where will I find my batch after enrollment?",
    answer: "You will find your batch in the My Courses section on the website. Please note, the lectures will be visible after the batch starts on 10th June, 2025.",
  },
  {
    question: "I paid but did not receive any welcome email/unable to access my batch. What to do?",
    answer: "In most of the cases this is because you filled a different email address or wrongly typed your email address while payment. In such a case please send us an email at delta@eduport.in with the subject ENROLMENT ISSUE Delta 7.0 along with your full name, phone number, payment id from Razorpay and a screenshot of your payment. (Support team (10am-6pm) may take 24 hours to address your issue due to heavy load.)",
  },
];

const Support = () => (
  <Container fluid className="py-5" style={{ background: 'var(--base-variant)' }}>
    <Container>
      <h3 style={{ color: 'var(--text-color)' , display:"flex", justifyContent:"center"}}>Need Assistance?</h3>
      <p style={{ color: 'var(--secondary-text)', display:"flex", justifyContent:"center" }} className="mb-4">
        If you’re feeling overwhelmed, remember you don’t have to face it alone.
        Reach out and get the help you need.
      </p>

      <Form className="mb-5">
        <InputGroup style={{display:"flex", justifyContent:"center"}}>
          <FormControl
            placeholder="Ask a question..."
            style={{
              background: 'var(--base-color)',
              color: 'var(--text-color)',
              maxWidth:"400px"
            }}
          />
          <Button
            variant="primary"
            style={{
              background: 'var(--secondary-blue)',
              borderColor: 'var(--secondary-blue)',
            }}
          >
            Search
          </Button>
        </InputGroup>
      </Form>

      <Row className="mb-5">
        {supportCards.map((card, i) => (
          <Col md={4} key={i} className="mb-3">
            <Card style={{ background: 'var(--base-color)', border: 'none' }}>
              <Card.Body className="text-center">
                <div
                  className="icon-holder"
                  style={{ color: 'var(--secondary-blue)' }}
                >
                  {card.icon}
                </div>
                <Card.Title style={{ color: 'var(--text-color)' }}>
                  {card.title}
                </Card.Title>
                <Card.Text style={{ color: 'var(--secondary-text)' }}>
                  {card.text}
                </Card.Text>
                <a
                  href={card.link}
                  style={{
                    color: 'var(--secondary-blue)',
                    fontWeight: 500,
                  }}
                >
                  Learn More
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="faq-wrapper" style={{ backgroundColor: 'var(--base-color)' }}>
    <h3 className="faq-title" style={{ color: 'var(--text-color)' }}>
      Frequently asked questions
    </h3>
    <p className="faq-subtitle">
      <span style={{ color: 'var(--secondary-text)' }}>Batch related Doubts</span>
    </p>

    <Accordion defaultActiveKey={null} className="faq-accordion">
      {faqData.map((item, idx) => (
        <Accordion.Item
          eventKey={idx.toString()}
          key={idx}
          className="faq-card"
          style={{ backgroundColor: 'var(--base-variant)', border: 'none' }}
        >
          <Accordion.Header
            className="faq-question"
            style={{
              color: 'var(--text-color)',
              cursor: 'pointer',
              backgroundColor: 'var(--base-variant)',
            }}
          >
            {item.question}
          </Accordion.Header>
          <Accordion.Body
            className="faq-answer"
            style={{ color: 'var(--secondary-text)' }}
          >
            {item.answer}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </div>
    </Container>
  </Container>
);

export default Support;
