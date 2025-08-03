import { ShoppingCart, Star } from "lucide-react";
import { useMemo } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useGetAllProductsQuery } from "../redux/services/productService/productApi";

const ProductSection = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  // Group products by category using useMemo for performance
  const groupedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return {};

    const grouped = {};
    products.forEach((product) => {
      const categoryName = product.category?.name || "Uncategorized";
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(product);
    });

    return grouped;
  }, [products]);

  // Loading state
  if (isLoading) {
    return (
      <Container className="py-5">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-danger mb-3"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-muted">Loading Products...</h4>
          </div>
        </div>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="py-5">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <h4 className="text-danger">Error Loading Products</h4>
            <p className="text-muted">Please try again later.</p>
          </div>
        </div>
      </Container>
    );
  }

  // No products state
  if (!products || products.length === 0) {
    return (
      <Container className="py-5">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <h4 className="text-muted">No Products Available</h4>
            <p className="text-muted">Check back later for new products.</p>
          </div>
        </div>
      </Container>
    );
  }

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
                      style={{ zIndex: 1 }}
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
                        src={`https://ecommerce.magneticcodes.com/${product.image}`}
                        alt={product.name}
                        className="img-fluid"
                        style={{
                          maxHeight: "100%",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column">
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

                    <div className="mt-auto">
                      <Button
                        href={`/product/${product.id}`}
                        variant="dark"
                        className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
                      >
                        <ShoppingCart size={20} />
                        Order Now
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <ShoppingCart size={20} />
                        Add to Cart
                      </Button>
                    </div>
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
