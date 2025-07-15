import { ShoppingCart, Star } from "lucide-react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const ProductSection = () => {
  const categories = [
    "SHIT Cambo Set", "Shit Cambo Set", "Farmar River Air", "HOODIE",
    "Katua", "Casual Shirt's", "Formal Shirt", "Ban Colar Shirt's", "Sweep Shirt", "Men's Fashion"
  ];

  const sections = [
    {
      title: "Formal Shirt",
      products: [
        { id: 1, name: "Premium Formal Shirt", discount: "20%", price: "$2400", originalPrice: "$3000", isNew: true, rating: 4.6 },
        { id: 2, name: "Office Wear Formal Shirt", discount: "15%", price: "$2200", originalPrice: "$2600", rating: 4.3 },
      ],
    },
    {
      title: "Short Sleeve Shirt",
      products: [
        { id: 3, name: "Casual Short Sleeve Shirt", discount: "25%", price: "$1800", originalPrice: "$2400", rating: 4.1 },
        { id: 4, name: "Printed Summer Shirt", discount: "30%", price: "$1750", originalPrice: "$2500" },
      ],
    },
    {
      title: "Ban Colar Shirt's",
      products: [
        { id: 5, name: "Stylish Ban Colar Shirt", discount: "18%", price: "$2100", originalPrice: "$2550", rating: 4.0 },
      ],
    },
    {
      title: "Sweep Shirt",
      products: [
        { id: 6, name: "Elegant Sweep Shirt", discount: "28%", price: "$2000", originalPrice: "$2800", isNew: true, rating: 4.8 },
      ],
    },
    {
      title: "Casual Shirt's",
      products: [
        { id: 7, name: "Trendy Casual Shirt", discount: "22%", price: "$1900", originalPrice: "$2450", rating: 4.2 },
      ],
    },
    {
      title: "Katua",
      products: [
        { id: 8, name: "Classic Katua Design", discount: "35%", price: "$1600", originalPrice: "$2450", isNew: true },
      ],
    },
    {
      title: "Men's Fashion",
      products: [
        { id: 9, name: "Men's Combo Fashion Pack", discount: "40%", price: "$3000", originalPrice: "$5000", rating: 4.9 },
      ],
    },
    {
      title: "HOODIE",
      products: [
        { id: 10, name: "Winter Hoodie", discount: "20%", price: "$2800", originalPrice: "$3500", isNew: true, rating: 4.7 },
      ],
    },
  ];

  return (
    <Container className="py-5">
      {/* 🔝 Top Categories */}
      <div className="mb-5">
        <h2 className="mb-4 fw-bold">Top Categories</h2>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Button key={index} variant="outline-secondary" className="rounded-pill">
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* 🛍 Product Sections */}
      {sections.map((section, idx) => (
        <div key={idx} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">{section.title}</h2>
            <Button variant="outline-dark" size="sm">
              View All
            </Button>
          </div>
          <Row className="g-4">
            {section.products.map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card className="position-relative h-100 shadow-sm">
                  {product.isNew && (
                    <Badge bg="danger" className="position-absolute top-0 start-0 m-2">NEW</Badge>
                  )}
                  <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
                    {product.discount} OFF
                  </Badge>
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "250px" }}>
                    <span className="text-muted">Product Image</span>
                  </div>
                  <Card.Body>
                    <Card.Title className="text-truncate">{product.name}</Card.Title>
                    {product.rating && (
                      <div className="d-flex align-items-center mb-2">
                        <div className="d-flex me-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              strokeWidth={2}
                              color={i < Math.floor(product.rating) ? "#facc15" : "#d1d5db"}
                              fill={i < Math.floor(product.rating) ? "#facc15" : "none"}
                            />
                          ))}
                        </div>
                        <small className="text-muted">({product.rating})</small>
                      </div>
                    )}
                    <div className="mb-3">
                      <span className="fw-bold me-2">{product.price}</span>
                      <small className="text-muted text-decoration-line-through">{product.originalPrice}</small>
                    </div>
                   <Button href={`/product/${product.id}`} variant="dark" className="w-100 d-flex align-items-center justify-content-center gap-2">
                        <ShoppingCart size={20} />
                        Order Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default ProductSection;
