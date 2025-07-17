import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Card, Button, Row, Col, Alert, Badge } from "react-bootstrap";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialOrderItems = location.state?.items || [
    {
      id: 1,
      name: "Long Sleeve Formal Shirt",
      quantity: 1,
      price: 2500,
      total: 2500
    }
  ];

  const [orderItems, setOrderItems] = useState(initialOrderItems);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    mobile: '',
    address: '',
    notes: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const shippingCharge = 120;
  const payableAmount = subtotal + shippingCharge - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setOrderItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleApplyCoupon = () => {
    const coupons = {
      'SAVE10': 0.1,
      'WELCOME20': 0.2,
      'FIRST50': 50
    };
    
    if (coupons[couponCode]) {
      const couponValue = coupons[couponCode];
      const discountAmount = couponValue < 1 ? subtotal * couponValue : couponValue;
      setDiscount(discountAmount);
      alert(`Coupon applied! You saved $${discountAmount}`);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.fullName || !customerInfo.mobile || !customerInfo.address) {
      alert('Please fill in all required fields');
      return;
    }

    if (orderItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const apiPayload = {
        name: customerInfo.fullName,
        mobile_no: customerInfo.mobile,
        total_amount: payableAmount,
        billing_address: customerInfo.address,
        notes: customerInfo.notes,
        products: orderItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        }))
      };

      const response = await fetch('http://ecommerce-backend.test/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      navigate('/', {
        state: {
          order: data,
          summary: {
            items: orderItems,
            subtotal,
            shippingCharge,
            discount,
            total: payableAmount
          }
        }
      });

    } catch (error) {
      console.error('Order submission error:', error);
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderItems.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info" className="text-center py-5">
          <h4>🛒 Your cart is empty</h4>
          <p>Add some amazing products to your cart to place an order.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <Container>
        {apiError && (
          <Alert variant="danger" className="mb-4">
            {apiError}
          </Alert>
        )}

        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            🛍️ Complete Your Order
          </h1>
          <p className="lead text-white-50">
            You're just one step away from getting your amazing products!
          </p>
        </div>

        <Form onSubmit={handleSubmitOrder}>
          <Row className="g-4">
            <Col lg={8}>
              <Card className="shadow-lg mb-4" style={{ borderRadius: '20px', border: 'none' }}>
                <Card.Header className="text-white text-center py-4"
                  style={{ 
                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
                    borderRadius: '20px 20px 0 0',
                    border: 'none'
                  }}>
                  <h3 className="mb-0">👤 Customer Information</h3>
                </Card.Header>
                <Card.Body className="p-4">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold text-dark">
                          <i className="fas fa-user me-2"></i>Full Name *
                        </Form.Label>
                        <Form.Control 
                          type="text" 
                          name="fullName"
                          value={customerInfo.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold text-dark">
                          <i className="fas fa-phone me-2"></i>Mobile Number *
                        </Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="mobile"
                          value={customerInfo.mobile}
                          onChange={handleInputChange}
                          placeholder="01xxxxxxxxx"
                          required
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-dark">
                      <i className="fas fa-map-marker-alt me-2"></i>Full Address *
                    </Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-0">
                    <Form.Label className="fw-bold text-dark">
                      <i className="fas fa-sticky-note me-2"></i>Special Notes (Optional)
                    </Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={2} 
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions or requests..."
                    />
                  </Form.Group>
                </Card.Body>
              </Card>

              <Card className="shadow-lg" style={{ borderRadius: '20px', border: 'none' }}>
                <Card.Header className="text-white text-center py-4"
                  style={{ 
                    background: 'linear-gradient(45deg, #4ECDC4, #44A08D)',
                    borderRadius: '20px 20px 0 0',
                    border: 'none'
                  }}>
                  <h3 className="mb-0">📦 Order Summary</h3>
                </Card.Header>
                <Card.Body className="p-4">
                  {orderItems.map((item, index) => (
                    <div key={item.id} className="mb-4">
                      <Card className="border-0 shadow-sm"
                        style={{ 
                          borderRadius: '15px',
                          background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)'
                        }}>
                        <Card.Body className="p-4">
                          <Row className="align-items-center">
                            <Col md={6}>
                              <div className="d-flex align-items-center">
                                <div className="me-3 d-flex align-items-center justify-content-center"
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
                                    color: 'white',
                                    fontSize: '24px'
                                  }}>
                                  🛍️
                                </div>
                                <div>
                                  <h5 className="mb-1 fw-bold text-dark">{item.name}</h5>
                                  <div className="text-muted small">
                                    Unit Price: <span className="fw-bold">${item.price}</span>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md={3}>
                              <div className="d-flex align-items-center justify-content-center">
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  style={{ borderRadius: '50%', width: '35px', height: '35px' }}>
                                  -
                                </Button>
                                <span className="mx-3 fw-bold fs-5">{item.quantity}</span>
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  style={{ borderRadius: '50%', width: '35px', height: '35px' }}>
                                  +
                                </Button>
                              </div>
                            </Col>
                            <Col md={2}>
                              <div className="text-center">
                                <div className="fw-bold fs-5 text-success">${item.total}</div>
                                <small className="text-muted">Total</small>
                              </div>
                            </Col>
                            <Col md={1}>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                style={{ borderRadius: '50%', width: '35px', height: '35px' }}>
                                🗑️
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                      {index < orderItems.length - 1 && <hr className="my-4" />}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="shadow-lg sticky-top"
                style={{ 
                  borderRadius: '20px',
                  border: 'none',
                  top: '20px'
                }}>
                <Card.Header className="text-white text-center py-4"
                  style={{ 
                    background: 'linear-gradient(45deg, #FFA726, #FB8C00)',
                    borderRadius: '20px 20px 0 0',
                    border: 'none'
                  }}>
                  <h3 className="mb-0">💳 Payment Summary</h3>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                      <span className="text-dark">Sub Total:</span>
                      <span className="fw-bold fs-5">${subtotal}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                      <span className="text-dark">Shipping:</span>
                      <span className="fw-bold fs-5">${shippingCharge}</span>
                    </div>
                    {discount > 0 && (
                      <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style={{ backgroundColor: '#d4edda' }}>
                        <span className="text-success">Discount:</span>
                        <span className="fw-bold fs-5 text-success">-${discount}</span>
                      </div>
                    )}
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded" style={{ backgroundColor: '#e8f5e8' }}>
                      <span className="fw-bold fs-4 text-dark">Total:</span>
                      <span className="fw-bold fs-3 text-success">${payableAmount}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Form.Label className="fw-bold text-dark mb-3">
                      🎫 Apply Coupon Code
                    </Form.Label>
                    <div className="d-flex mb-2">
                      <Form.Control 
                        type="text" 
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        style={{ 
                          borderRadius: '15px 0 0 15px',
                          border: '2px solid #e9ecef',
                          borderRight: 'none'
                        }}
                      />
                      <Button 
                        variant="warning"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        style={{ 
                          borderRadius: '0 15px 15px 0',
                          border: '2px solid #FFA726',
                          borderLeft: 'none'
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="text-muted small">
                      <Badge bg="info" className="me-1">SAVE10</Badge>
                      <Badge bg="success" className="me-1">WELCOME20</Badge>
                      <Badge bg="warning">FIRST50</Badge>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-100 py-3 fw-bold"
                    disabled={isSubmitting}
                    style={{
                      borderRadius: '15px',
                      background: isSubmitting 
                        ? 'linear-gradient(45deg, #6c757d, #5a6268)'
                        : 'linear-gradient(45deg, #28a745, #20c997)',
                      border: 'none',
                      fontSize: '18px'
                    }}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing Order...
                      </>
                    ) : (
                      '🚀 Confirm Order'
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      <i className="fas fa-shield-alt me-1"></i>
                      Secure Payment • 
                      <i className="fas fa-truck ms-2 me-1"></i>
                      Fast Delivery • 
                      <i className="fas fa-medal ms-2 me-1"></i>
                      Quality Guaranteed
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default OrderPage;