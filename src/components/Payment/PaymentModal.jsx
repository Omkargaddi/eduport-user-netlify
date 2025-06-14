import React, { useCallback, useContext, useState } from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { AppContext } from '../../context/AppContext';
import './PaymentModal.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PaymentModal({ show, onHide, course, category }) {
  const { backendUrl, getUserData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    onHide();
    if (receipt) {
      getUserData();
      navigate('/mycourses');
    }
    setReceipt(null);
    setLoading(false);
  }, [onHide, receipt, getUserData, navigate]);

  // For premium purchase
  const handleBuy = async () => {
    setLoading(true);
    try {
      const { data: order } = await axios.post(
        `${backendUrl}/payment/create-order`,
        null,
        { params: { courseId: course.id }, withCredentials: true }
      );

      const options = {
        key: 'rzp_test_z4HfPor1nc8mpv',
        amount: order.amount,
        currency: order.currency,
        name: 'Eduport',
        description: course.title,
        image: course.imageUrl,
        order_id: order.id,
        handler: async (resp) => {
          await axios.post(
            `${backendUrl}/payment/verify`,
            {
              razorpayOrderId: resp.razorpay_order_id,
              razorpayPaymentId: resp.razorpay_payment_id,
              razorpaySignature: resp.razorpay_signature,
              courseId: course.id,
              amount: course.price,
            },
            { withCredentials: true }
          );

          setReceipt({
            orderId: resp.razorpay_order_id,
            paymentId: resp.razorpay_payment_id,
            courseName: course.title,
            amount: course.price,
            date: new Date().toLocaleString(),
          });

          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  // For free enrollment
  const handleEnroll = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${backendUrl}/payment/${course.id}/${userData.id}`,
        {},
        { withCredentials: true }
      );
      toast.success('Enrolled successfully!');
      getUserData();
      navigate('/mycourses');
      onHide();
    } catch (err) {
      toast.error('Enrollment failed. Please try again.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

 const downloadPdf = () => {
  const styles = getComputedStyle(document.documentElement);
  const headerColor    = styles.getPropertyValue('--secondary-blue').trim()   || '#00246b';
  const textColor      = styles.getPropertyValue('--text-color').trim()       || '#111528';
  const accentColor    = styles.getPropertyValue('--navbar-secondary').trim() || '#537aaa';
  const secondaryText  = styles.getPropertyValue('--secondary-text').trim()   || '#464a5a';

  const doc = new jsPDF();

  // 1) Colored header bar
  doc.setFillColor(headerColor);
  doc.rect(0, 0, 210, 30, 'F');

  // 2) Title in header
  doc.setFontSize(18);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.text('Eduport Payment Receipt', 14, 20);

  // 3) Divider line
  doc.setDrawColor(accentColor);
  doc.setLineWidth(0.5);
  doc.line(14, 32, 196, 32);

  // 4) Body text
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  doc.setFont('helvetica', 'normal');
  const startY = 45;
  const lh     = 8;
  const { courseName, amount, orderId, paymentId, date } = receipt || {};

  // Course
  doc.text('Course:', 14, startY);
  doc.setFont('helvetica', 'bold');
  doc.text(courseName, 50, startY);

  // Amount
  doc.setFont('helvetica', 'normal');
  doc.text('Amount:', 14, startY + lh);
  doc.setFont('helvetica', 'bold');
  doc.text(`₹${amount}`, 50, startY + lh);

  // Order ID
  doc.setFont('helvetica', 'normal');
  doc.text('Order ID:', 14, startY + 2 * lh);
  doc.setFont('helvetica', 'bold');
  doc.text(orderId, 50, startY + 2 * lh);

  // Payment ID
  doc.setFont('helvetica', 'normal');
  doc.text('Payment ID:', 14, startY + 3 * lh);
  doc.setFont('helvetica', 'bold');
  doc.text(paymentId, 50, startY + 3 * lh);

  // Date
  doc.setFont('helvetica', 'normal');
  doc.text('Date:', 14, startY + 4 * lh);
  doc.setFont('helvetica', 'bold');
  doc.text(date, 50, startY + 4 * lh);

  // 5) Footer line + note
  doc.setDrawColor(accentColor);
  doc.line(14, startY + 6 * lh, 196, startY + 6 * lh);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(secondaryText);
  doc.text(
    'Thank you for your purchase! If you have any questions, contact support at support@eduport.com.',
    14,
    startY + 7 * lh,
    { maxWidth: 180 }
  );

  // 6) Save and cleanup
  doc.save(`receipt_${paymentId}.pdf`);
  getUserData();
  navigate('/mycourses');
  onHide();
};


  if (category === 'premium') {
    return (
      <Modal show={show} onHide={handleClose} centered dialogClassName="payment-modal">
        <Modal.Header closeButton>
          <Modal.Title className="pm-title">Purchase: {course.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pm-body">
          <img src={course.imageUrl} alt={course.title} className="pm-image" />

          {!receipt ? (
            <div className="pm-purchase-section">
              <h6 className="pm-price">
                 <strong>{course.title}</strong>
              </h6>
              <p className="pm-price">
                Price: <strong>₹{course.price}</strong>
              </p>
              
              <Button className="pm-btn" onClick={handleBuy} disabled={loading}>
                {loading && <Spinner animation="border" size="sm" className="me-2" />}  
                {loading ? 'Processing…' : 'Buy Now'}
              </Button>
            </div>
          ) : (
            <div className="pm-receipt-section">
              <Alert variant="success" className="pm-alert">
                <h5>Payment Successful!</h5>
                <p>
                  <strong>Order ID:</strong> {receipt.orderId}<br />
                  <strong>Payment ID:</strong> {receipt.paymentId}<br />
                  <strong>Amount:</strong> ₹{receipt.amount}<br />
                  <strong>Date:</strong> {receipt.date}
                </p>
              </Alert>
              <Button className="pm-btn" onClick={downloadPdf}>Download Receipt</Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <Modal show={show} onHide={handleClose} centered dialogClassName="payment-modal">
        <Modal.Header closeButton>
          <Modal.Title className="pm-title">Enroll: {course.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pm-body">
          <img src={course.imageUrl} alt={course.title} className="pm-image" />
          <h6 className="pm-price">
                 <strong>{course.title}</strong>
              </h6>
          <Button className="pm-btn mt-3" onClick={handleEnroll} disabled={loading}>
            {loading && <Spinner animation="border" size="sm" className="me-2" />}
            {loading ? 'Enrolling…' : 'Enroll Now'}
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}
