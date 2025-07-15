import React from "react";
import { Container, Form, Table, Button, Row, Col } from "react-bootstrap";

const OrderPage = ({ location }) => {
  // In a real app, you would get these from state/route params/API
  const orderItems = [
    {
      id: 1,
      name: "Long Sleeve Formal Shirt",
      quantity: 1,
      price: 2500,
      total: 2500
    },
    {
      id: 2,
      name: "Long Sleeve Formal Shirt",
      quantity: 2,
      price: 2500,
      total: 5000
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const shippingCharge = 120;
  const payableAmount = subtotal + shippingCharge;

  return (
    <Container className="my-5">
      <h1 className="mb-4">Please Order Now</h1>
      
      {/* Customer Information */}
      <div className="mb-5 p-4 border rounded">
        <h2 className="mb-4">Customer Information</h2>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="tel" placeholder="01xxxxxxxxx" required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Full Address</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Full Address" required />
          </Form.Group>
        </Form>
      </div>

      {/* Order Summary */}
      <div className="mb-5">
        <h2 className="mb-4">Place Order</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
                <td>
                  <Button variant="outline-danger" size="sm">
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Payment Summary */}
      <div className="p-4 border rounded bg-light">
        <h3 className="mb-3">Payment Summary</h3>
        <div className="d-flex justify-content-between mb-2">
          <span>Sub Total:</span>
          <span>${subtotal}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping Charge:</span>
          <span>${shippingCharge}</span>
        </div>
        <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
          <span>Payable Amount:</span>
          <span>${payableAmount}</span>
        </div>
        
        <Form.Group className="mb-4">
          <Form.Label>Apply Coupon Code</Form.Label>
          <div className="d-flex">
            <Form.Control type="text" placeholder="Enter coupon code" />
            <Button variant="secondary" className="ms-2">
              Apply
            </Button>
          </div>
        </Form.Group>

        <Button variant="danger" size="lg" className="w-100">
          Confirm Order
        </Button>
      </div>
    </Container>
  );
};

export default OrderPage;