import { ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const ProductSection = () => {
  const [categories, setCategories] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://ecommerce-backend.test/api/product"
        );
        const data = await response.json();

        // Group products by category name
        const grouped = {};
        data.forEach((product) => {
          const categoryName = product.category?.name || "Uncategorized";
          if (!grouped[categoryName]) {
            grouped[categoryName] = [];
          }
          grouped[categoryName].push(product);
        });

        setGroupedProducts(grouped);
        console.log("Grouped products:", grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="py-5">
      {Object.keys(groupedProducts).map((categoryName, idx) => (
        <div key={idx} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">{categoryName}</h2>
            <Button variant="outline-dark" size="sm">
              View All
            </Button>
          </div>
          <Row className="g-4">
            {groupedProducts[categoryName].map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card className="position-relative h-100 shadow-sm">
                  {product.is_new && (
                    <Badge
                      bg="danger"
                      className="position-absolute top-0 start-0 m-2"
                    >
                      NEW
                    </Badge>
                  )}

                  <div
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{ height: "250px", overflow: "hidden" }}
                  >
                    {product.image ? (
                      <img
                        src={`http://ecommerce-backend.test/storage/${product.image}`}
                        alt={product.name}
                        className="img-fluid"
                        style={{ maxHeight: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </div>

                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {product.name}
                    </Card.Title>

                    {product.rating && (
                      <div className="d-flex align-items-center mb-2">
                        <div className="d-flex me-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              strokeWidth={2}
                              color={
                                i < Math.floor(product.rating)
                                  ? "#facc15"
                                  : "#d1d5db"
                              }
                              fill={
                                i < Math.floor(product.rating)
                                  ? "#facc15"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                        <small className="text-muted">({product.rating})</small>
                      </div>
                    )}

                    <div className="mb-3">
                      <span className="fw-bold me-2">${product.price}</span>
                      {product.sale_price && (
                        <small className="text-muted text-decoration-line-through">
                          ${product.sale_price}
                        </small>
                      )}
                    </div>

                    <Button
                      href={`/product/${product.id}`}
                      variant="dark"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Order Now
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="w-100 d-flex align-items-center justify-content-center gap-2 mt-2"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
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
