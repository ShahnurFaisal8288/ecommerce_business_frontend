import { Card, Button, Badge } from "react-bootstrap";
import { ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/features/cartSlice";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        rating: item.rating,
        is_new: item.is_new,
        sale_price: item.sale_price,
      })
    );
    Swal.fire({
      icon: "success",
      title: "Item added to cart successfully!",
      showConfirmButton: true,
    });
  };

  return (
    <div>
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
          <Card.Title className="text-truncate">{product.name}</Card.Title>

          {product.rating && (
            <div className="d-flex align-items-center mb-2">
              <div className="d-flex me-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    strokeWidth={2}
                    color={
                      i < Math.floor(product.rating) ? "#facc15" : "#d1d5db"
                    }
                    fill={i < Math.floor(product.rating) ? "#facc15" : "none"}
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
            <Link
              to={`/product/${product.id}`}
              state={product}
              className="mb-2"
            >
              <Button
                href={`/product/${product.id}`}
                variant="dark"
                className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
              >
                <ShoppingCart size={20} />
                Order Now
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => handleAddToCart(product)}
              className="w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
