import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Accordion,
  Card,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Heart, Phone, ShoppingCart, Plus, Minus } from "lucide-react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  // const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const productData = location?.state || null;
  console.log("Product Data:", productData);

  // Get available stock for selected size
  const getAvailableStock = () => {
    if (!selectedSize || !productData?.sizes) return productData?.stock || 0;

    const sizeData = productData.sizes.find(
      (size) => size.display_name === selectedSize
    );
    return sizeData?.pivot?.quantity || 0;
  };

  const handleQuantityChange = (action) => {
    const maxStock = getAvailableStock();

    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, maxStock));
    } else if (action === "decrease") {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Reset quantity when size changes to ensure it doesn't exceed new size's stock
    const sizeData = productData.sizes.find((s) => s.display_name === size);
    const maxStock = sizeData?.pivot?.quantity || 0;
    if (quantity > maxStock) {
      setQuantity(Math.max(1, Math.min(quantity, maxStock)));
    }
  };

  const handleAddToCart = () => {
    if (!productData?.sizes || productData.sizes.length === 0) {
      // No sizes available, proceed without size selection
      if (productData?.stock === 0) {
        alert("Product is out of stock");
        return;
      }
    } else if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    const availableStock = getAvailableStock();
    if (availableStock === 0) {
      alert("Selected size is out of stock");
      return;
    }

    alert(
      `Added ${quantity} ${productData.name} ${
        selectedSize ? `(Size: ${selectedSize})` : ""
      } to cart`
    );
  };

  const handleOrderNow = () => {
    if (productData?.sizes && productData.sizes.length > 0 && !selectedSize) {
      alert("Please select a size first");
      return;
    }

    const availableStock = getAvailableStock();
    if (availableStock === 0) {
      alert("Product is out of stock");
      return;
    }

    const price = parseFloat(productData.sale_price || productData.price);
    const orderData = {
      items: [
        {
          id: productData.id,
          name: productData.name,
          quantity: quantity,
          price: price,
          size: selectedSize || null,
          total: price * quantity,
        },
      ],
      subtotal: price * quantity,
    };

    navigate("/order", { state: orderData });
    console.log("PassingData", { state: orderData });
  };

  // Show message if no product data
  if (!productData) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The requested product could not be found.</p>
          <Link to="/">
            <Button variant="outline-warning">Go Back to Home</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  const availableStock = getAvailableStock();
  const hasStock = availableStock > 0;
  const hasSizes = productData.sizes && productData.sizes.length > 0;

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col md={6}>
          <div
            className="position-relative overflow-hidden rounded-3 border"
            style={{ height: "500px", cursor: "zoom-in" }}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <Image
              src={`https://ecommerce.magneticcodes.com/${productData.image}`}
              alt={productData.name}
              fluid
              className="h-100 w-100 object-fit-cover"
              style={{
                transform: zoom ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        </Col>

        <Col md={6}>
          <h1 className="fw-bold mb-2">{productData.name}</h1>
          <p className="text-muted mb-3">{productData.category?.name}</p>

          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
            <span className="text-muted">Code: {productData.slug}</span>
            <span className={`badge ${hasStock ? "bg-success" : "bg-danger"}`}>
              {hasStock
                ? `In Stock ${
                    selectedSize
                      ? `(${availableStock})`
                      : `(${productData.stock})`
                  }`
                : "Out of Stock"}
            </span>
            {productData.is_featured === 1 && (
              <span className="badge bg-primary">Featured</span>
            )}
            {productData.is_new === 1 && (
              <span className="badge bg-info">New</span>
            )}
            {productData.is_on_sale === 1 && (
              <span className="badge bg-warning">On Sale</span>
            )}
          </div>

          <h3 className="text-danger fw-bold mb-4">
            {productData.sale_price ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">
                  ${productData.price}
                </span>
                <span>${productData.sale_price}</span>
              </>
            ) : (
              `$${productData.price}`
            )}
          </h3>

          {hasSizes && (
            <div className="mb-4">
              <h5 className="mb-3">Size:</h5>
              <div className="d-flex gap-2 flex-wrap">
                {productData.sizes.map((size) => {
                  const sizeStock = size.pivot?.quantity || 0;
                  const isOutOfStock = sizeStock === 0;

                  return (
                    <Button
                      key={size.id}
                      variant={
                        selectedSize === size.display_name
                          ? "danger"
                          : isOutOfStock
                          ? "outline-secondary"
                          : "outline-dark"
                      }
                      size="lg"
                      onClick={() =>
                        !isOutOfStock && handleSizeChange(size.display_name)
                      }
                      className="px-4 position-relative"
                      disabled={isOutOfStock}
                      title={
                        isOutOfStock ? "Out of stock" : `${sizeStock} available`
                      }
                    >
                      {size.display_name}
                      {isOutOfStock && (
                        <span className="position-absolute top-50 start-50 translate-middle text-muted">
                          ✕
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
              {selectedSize && (
                <small className="text-muted">
                  {availableStock} items available in {selectedSize}
                </small>
              )}
            </div>
          )}

          <div className="mb-4">
            <h5 className="mb-3">Quantity:</h5>
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                min="1"
                max={availableStock}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value) || 1;
                  setQuantity(
                    Math.max(1, Math.min(newQuantity, availableStock))
                  );
                }}
                style={{ width: "70px", textAlign: "center" }}
              />
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity >= availableStock}
              >
                <Plus size={18} />
              </Button>
            </div>
            <small className="text-muted">
              Maximum: {availableStock} items
            </small>
          </div>

          <div className="d-flex gap-3 mb-5 flex-wrap">
            <Button
              variant="danger"
              size="lg"
              className="px-4 flex-grow-1"
              onClick={handleOrderNow}
              disabled={!hasStock || (hasSizes && !selectedSize)}
              style={{ minWidth: "150px" }}
            >
              Order Now ({quantity})
            </Button>
            <Button
              variant="outline-danger"
              size="lg"
              className="px-4"
              onClick={handleAddToCart}
              disabled={!hasStock || (hasSizes && !selectedSize)}
            >
              <ShoppingCart size={20} className="me-2" />
              Add To Cart
            </Button>
            <Button
              variant={isWishlisted ? "danger" : "outline-secondary"}
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </Button>
          </div>

          <Accordion
            activeKey={activeAccordion}
            onSelect={(e) => setActiveAccordion(e)}
          >
            <Accordion.Item eventKey="description">
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>
                <p>{productData.description || "No description available"}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="delivery">
              <Accordion.Header>Delivery Information</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    Order today and receive it within 02 - 03 days
                  </li>
                  <li className="mb-2">Quality Product</li>
                  <li className="mb-2">Cash on Delivery Available</li>
                  <li className="mb-2">Delivery Charge Inside Dhaka 60 TK</li>
                  <li className="mb-2">Delivery Charge Outside Dhaka 120 TK</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="contact">
              <Accordion.Header>Contact for Questions</Accordion.Header>
              <Accordion.Body>
                <p className="fw-bold mb-3">
                  Have question about this product? Please call:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Phone size={16} className="me-2" />
                    01644460875
                  </li>
                  <li className="mb-2">
                    <Phone size={16} className="me-2" />
                    01723241752 [Bkash Personal]
                  </li>
                  <li className="mb-2">
                    <Phone size={16} className="me-2" />
                    01723241752 [Nagad Personal]
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      {relatedProducts.length > 0 && (
        <Row className="mt-5">
          <h3 className="mb-4 border-bottom pb-2">Related Products</h3>
          <div className="d-flex flex-wrap gap-4">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                style={{ width: "18rem" }}
                className="shadow-sm hover-shadow"
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {product.name}
                  </Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-danger fw-bold">
                      ${product.sale_price || product.price}
                    </span>
                    <Link to={`/product/${product.id}`}>
                      <Button variant="outline-danger" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
