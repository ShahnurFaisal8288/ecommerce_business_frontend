import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Image, Accordion, Card, Form, Spinner, Alert } from "react-bootstrap";
import { Heart, Phone, ShoppingCart, Plus, Minus } from "lucide-react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(prev => Math.min(prev + 1, productData?.stock || 1));
    } else if (action === "decrease") {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || productData?.stock === 0) {
      alert("Please select a size first");
      return;
    }
    alert(`Added ${quantity} ${productData.name} (Size: ${selectedSize}) to cart`);
  };

  const handleOrderNow = () => {
    if (!selectedSize || productData?.stock === 0) {
      alert("Please select a size first");
      return;
    }
    
    const price = parseFloat(productData.sale_price || productData.price);
    const orderData = {
      items: [{
        id: productData.id,
        name: productData.name,
        quantity: quantity,
        price: price,
        size: selectedSize,
        total: price * quantity
      }],
      subtotal: price * quantity
    };

    navigate('/order', { state: orderData });
    console.log('PassingData',{ state: orderData })
  };


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`http://ecommerce-backend.test/api/product/${id}`);
        console.log("API Response:", response.data);
        
        // Set main product data
        setProductData(response.data.product);
        
        // Set related products with full image URLs
        const processedRelatedProducts = response.data.related_products.map(product => ({
          ...product,
          image: `http://ecommerce-backend.test/storage/${product.image}`
        }));
        setRelatedProducts(processedRelatedProducts);
        
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading product details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <h4>Error loading product</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (!productData) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          <h4>Product not found</h4>
          <p>The requested product could not be found.</p>
        </Alert>
      </Container>
    );
  }

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
              src={`http://ecommerce-backend.test/storage/${productData.image}`}
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
          
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="text-muted">Code: {productData.slug}</span>
            <span className={`badge ${productData.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {productData.stock > 0 ? `In Stock (${productData.stock})` : 'Out of Stock'}
            </span>
            {productData.is_featured && <span className="badge bg-primary">Featured</span>}
            {productData.is_new && <span className="badge bg-info">New</span>}
            {productData.is_on_sale && <span className="badge bg-warning">On Sale</span>}
          </div>
          
          <h3 className="text-danger fw-bold mb-4">
            {productData.sale_price ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">${productData.price}</span>
                <span>${productData.sale_price}</span>
              </>
            ) : (
              `$${productData.price}`
            )}
          </h3>
          
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="mb-4">
              <h5 className="mb-3">Size:</h5>
              <div className="d-flex gap-2">
                {productData.sizes.map((size) => (
                  <Button
                    key={size.id}
                    variant={selectedSize === size.display_name ? "danger" : "outline-dark"}
                    size="lg"
                    onClick={() => setSelectedSize(size.display_name)}
                    className="px-4"
                  >
                    {size.display_name}
                  </Button>
                ))}
              </div>
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
                max={productData.stock}
                onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, productData.stock)))}
                style={{ width: "70px", textAlign: "center" }}
              />
              <Button 
                variant="outline-secondary" 
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity >= productData.stock}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>

          <div className="d-flex gap-3 mb-5">
            <Button 
              variant="danger" 
              size="lg" 
              className="px-4 flex-grow-1"
              onClick={handleOrderNow}
              disabled={!selectedSize || productData.stock === 0}
            >
              Order Now ({quantity})
            </Button>
            <Button 
              variant="outline-danger" 
              size="lg" 
              className="px-4"
              onClick={handleAddToCart}
              disabled={!selectedSize || productData.stock === 0}
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

          <Accordion activeKey={activeAccordion} onSelect={(e) => setActiveAccordion(e)}>
            <Accordion.Item eventKey="description">
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>
                <p>{productData.description || 'No description available'}</p>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="delivery">
              <Accordion.Header>Delivery Information</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">Order today and receive it within 02 - 03 days</li>
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
                <p className="fw-bold mb-3">Have question about this product? Please call:</p>
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
              <Card key={product.id} style={{ width: '18rem' }} className="shadow-sm hover-shadow">
                <Card.Img 
                  variant="top" 
                  src={product.image}
                  style={{ height: '250px', objectFit: 'cover' }} 
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-danger fw-bold">${product.price}</span>
                    <Button variant="outline-danger" size="sm">
                      <ShoppingCart size={16} className="me-1" />
                      Add to Cart
                    </Button>
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