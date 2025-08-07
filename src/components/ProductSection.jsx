import { ShoppingCart, Star } from "lucide-react";
import { useMemo } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useGetAllProductsQuery } from "../redux/services/productService/productApi";
import ProductCard from "./common/ProductCard/ProductCard";

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
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default ProductSection;
