import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Image, Accordion, Card, Form } from "react-bootstrap";
import { Heart, Phone, ShoppingCart, Plus, Minus } from "lucide-react";
import axios from "axios";

const relatedProducts = [
  { id: 1, name: "Formal Pant", image: "/images/related1.jpg", price: "$35" },
  { id: 2, name: "Casual Shirt", image: "/images/related2.jpg", price: "$29" },
  { id: 3, name: "Tie Set", image: "/images/related3.jpg", price: "$25" },
];

// Fallback product data
const fallbackProductData = {
  id: 1272,
  name: "Formal Shirt",
  subtitle: "Long Sleeve Formal Shirt For Man's",
  code: "1272",
  price: "$2500",
  sizes: ["2XL", "3XL", "4XL"],
  image: "/images/formal-shirt.jpg",
  description: [
    "Fabrics: Oxford Cotton",
    "Made in Bangladesh",
    "Measurement:",
    "2XL = Chase, 4XL Length: 20"
  ],
  deliveryInfo: [
    "Order today and receive it within 02 - 03 days",
    "Quality Product",
    "Cash on Delivery Available",
    "Delivery Charge Inside Dhaka 60 TK",
    "Delivery Charge Outside Dhaka 120 TK"
  ],
  contactInfo: [
    "01644460875",
    "01723241752 [Bkash Personal]",
    "01723241752 [Nagad Personal]"
  ]
};

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productData, setProductData] = useState(fallbackProductData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(prev => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    alert(`Added ${quantity} ${productData.name} (Size: ${selectedSize}) to cart`);
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    
    const price = parseInt(productData.price.replace('$', ''));
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
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the ID from URL params or fallback to default
        const productId = id || fallbackProductData.id;
        
        console.log("Fetching product with ID:", productId);
        
        const response = await axios.get(`http://ecommerce-backend.test/api/product/${productId}`);
        
        console.log("API Response:", response.data);
        
        // Transform API response to match component structure
        const apiData = response.data;
        const processedData = {
          id: apiData.id,
          name: apiData.name,
          subtitle: apiData.description || "", // Use description as subtitle
          code: apiData.slug || apiData.id.toString(),
          price: `${apiData.price}`,
          sizes: apiData.sizes?.map(size => size.name) || [], // Extract size names
          image: apiData.image ? `http://ecommerce-backend.test/storage/${apiData.image}` : fallbackProductData.image,
          description: [
            `Category: ${apiData.category?.name || 'N/A'}`,
            `Stock: ${apiData.stock || 0} available`,
            apiData.description || 'No description available',
            ...(apiData.is_featured ? ['Featured Product'] : []),
            ...(apiData.is_new ? ['New Arrival'] : []),
            ...(apiData.is_on_sale ? ['On Sale'] : [])
          ],
          deliveryInfo: fallbackProductData.deliveryInfo, // Use fallback for delivery info
          contactInfo: fallbackProductData.contactInfo, // Use fallback for contact info
          stock: apiData.stock || 0,
          category: apiData.category?.name || 'N/A',
          isActive: apiData.is_active,
          isFeatured: apiData.is_featured,
          isNew: apiData.is_new,
          isOnSale: apiData.is_on_sale,
          salePrice: apiData.sale_price
        };
        
        console.log("Processed Product Data:", processedData);
        setProductData(processedData);
        
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error.message);
        
        // Use fallback data if API fails
        setProductData(fallbackProductData);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]); // Depend on the ID from URL params

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading product details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    console.warn("Using fallback data due to error:", error);
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
              src={productData.image}
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
          <p className="text-muted mb-3">{productData.subtitle}</p>
          
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="text-muted">Code: {productData.code}</span>
            <span className={`badge ${productData.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {productData.stock > 0 ? `In Stock (${productData.stock})` : 'Out of Stock'}
            </span>
            {productData.isFeatured && <span className="badge bg-primary">Featured</span>}
            {productData.isNew && <span className="badge bg-info">New</span>}
            {productData.isOnSale && <span className="badge bg-warning">On Sale</span>}
          </div>
          
          <h3 className="text-danger fw-bold mb-4">
            {productData.salePrice ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">{productData.price}</span>
                <span>${productData.salePrice}</span>
              </>
            ) : (
              productData.price
            )}
          </h3>
          
          <div className="mb-4">
            <h5 className="mb-3">Size:</h5>
            <div className="d-flex gap-2">
              {Array.isArray(productData.sizes) && productData.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "danger" : "outline-dark"}
                  size="lg"
                  onClick={() => setSelectedSize(size)}
                  className="px-4"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

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
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: "70px", textAlign: "center" }}
              />
              <Button 
                variant="outline-secondary" 
                onClick={() => handleQuantityChange("increase")}
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
                {Array.isArray(productData.description) ? (
                  <ul className="list-unstyled">
                    {productData.description.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{productData.description || 'No description available'}</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="delivery">
              <Accordion.Header>Delivery Information</Accordion.Header>
              <Accordion.Body>
                {Array.isArray(productData.deliveryInfo) ? (
                  <ul className="list-unstyled">
                    {productData.deliveryInfo.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{productData.deliveryInfo || 'No delivery information available'}</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="contact">
              <Accordion.Header>Contact for Questions</Accordion.Header>
              <Accordion.Body>
                <p className="fw-bold mb-3">Have question about this product? Please call:</p>
                {Array.isArray(productData.contactInfo) ? (
                  <ul className="list-unstyled">
                    {productData.contactInfo.map((item, index) => (
                      <li key={index} className="mb-2">
                        <Phone size={16} className="me-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{productData.contactInfo || 'No contact information available'}</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="mt-5">
        <h3 className="mb-4 border-bottom pb-2">Related Products</h3>
        <div className="d-flex flex-wrap gap-4">
          {relatedProducts.map(({ id, name, image, price }) => (
            <Card key={id} style={{ width: '18rem' }} className="shadow-sm hover-shadow">
              <Card.Img 
                variant="top" 
                src={image} 
                style={{ height: '250px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-danger fw-bold">{price}</span>
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
    </Container>
  );
};

export default ProductDetails;