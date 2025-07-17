import { useEffect, useState } from "react";
import {
  User,
  Search,
  Phone,
  Heart,
  ShoppingCart,
  X,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate derived values
  const cartCount = cartItems.reduce((sum, item) => sum + 1, 0);
  const wishlistCount = wishlistItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));

    fetchCategories();
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [cartItems, wishlistItems]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://ecommerce-backend.test/api/categories");
      setNavItems(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Sample product for demonstration
  const sampleProduct = {
    id: 1,
    name: "Premium T-Shirt",
    price: 29.99,
    image: "/path/to/image.jpg"
  };

  return (
    <>
      {/* Custom CSS */}
      <style>{`
        .navbar-brand-custom {
          background: linear-gradient(45deg, #dc3545, #c82333);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .search-focus:focus {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }
        .nav-link-custom {
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nav-link-custom:hover {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545 !important;
        }
        .cart-icon:hover {
          color: #dc3545 !important;
        }
        .phone-section {
          border-left: 1px solid #dee2e6;
          padding-left: 1rem;
        }
        .wishlist-active {
          color: #dc3545 !important;
          fill: #dc3545 !important;
        }
        .badge-notification {
          font-size: 0.6rem;
          padding: 0.2rem 0.35rem;
        }
      `}</style>

      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="sticky-top">
        {/* Top Bar */}
        <div className="bg-danger text-white py-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <span className="fw-medium">Welcome to Fig and Fit shop</span>
              </div>
              <div className="col-md-6 text-end">
                <div className="d-flex justify-content-end gap-4">
                  <Link to="/about" className="text-white text-decoration-none">About</Link>
                  <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
                  <Link to="/login" className="text-white text-decoration-none">
                    <User className="me-1" style={{ width: "16px", height: "16px" }} />
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <div className="row w-100 align-items-center">
              {/* Logo Section */}
              <div className="col-lg-2 col-md-3 col-6">
                <Link to="/" className="navbar-brand d-flex align-items-center mb-0 text-decoration-none">
                  <div className="me-3" style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #dc3545, #c82333)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}>
                    <span className="text-white fw-bold fs-5">F&F</span>
                  </div>
                  <div>
                    <h1 className="navbar-brand-custom mb-0 fs-4 fw-bold">
                      Ak's Shop
                    </h1>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      Premium Fashion
                    </p>
                  </div>
                </Link>
              </div>

              {/* Search Bar Section */}
              <div className="col-lg-4 col-md-5 d-none d-md-block">
                <form onSubmit={handleSearch}>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control search-focus py-2 pe-5 rounded-pill border-2"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderColor: "#dee2e6",
                      }}
                    />
                    <button
                      type="submit"
                      className="btn position-absolute end-0 top-50 translate-middle-y pe-3 bg-transparent border-0"
                      style={{ zIndex: 10 }}
                    >
                      <Search className="text-muted" style={{ width: "20px", height: "20px" }} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Section */}
              <div className="col-lg-6 col-md-4 col-6">
                <div className="d-flex align-items-center justify-content-end gap-3">
                  {/* Phone Section */}
                  <div className="d-none d-lg-flex align-items-center phone-section">
                    <Phone className="text-danger me-2" style={{ width: "20px", height: "20px" }} />
                    <div>
                      <p className="mb-0 small fw-medium">Call Us Now:</p>
                      <p className="mb-0 small text-danger fw-semibold">01644460875</p>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="d-flex align-items-center gap-3">
                    <button 
                      onClick={() => toggleWishlist(sampleProduct)}
                      className="btn btn-light rounded-circle p-2 position-relative cart-icon"
                    >
                      <Heart
                        style={{ width: "20px", height: "20px" }}
                        className={`text-muted ${wishlistCount > 0 ? "wishlist-active" : ""}`}
                      />
                      {wishlistCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger badge-notification">
                          {wishlistCount}
                        </span>
                      )}
                    </button>

                    <button 
                      onClick={() => addToCart(sampleProduct)}
                      className="btn btn-light rounded-circle p-2 position-relative cart-icon"
                    >
                      <ShoppingCart
                        style={{ width: "20px", height: "20px" }}
                        className="text-muted"
                      />
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger badge-notification">
                          {cartCount}
                        </span>
                      )}
                    </button>

                    <div className="d-none d-md-block text-end">
                      <p className="mb-0 small text-muted">Cart total</p>
                      <p className="mb-0 fs-6 fw-bold text-danger">৳ {cartTotal.toFixed(2)}</p>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                      className="btn btn-outline-secondary d-lg-none ms-2"
                      type="button"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      aria-label="Toggle navigation"
                    >
                      {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Navigation Menu Bar */}
        <div className="bg-white border-top d-none d-lg-block">
          <div className="container">
            <div className="d-flex justify-content-center py-2">
              <nav className="d-flex flex-wrap justify-content-center gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/category/${item.slug}`}
                    className="px-2 py-1 text-dark text-decoration-none nav-link-custom fw-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="d-md-none bg-light border-top">
          <div className="container py-2">
            <form onSubmit={handleSearch}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control search-focus pe-5"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: "#ffffff" }}
                />
                <button
                  type="submit"
                  className="btn position-absolute end-0 top-50 translate-middle-y pe-3 bg-transparent border-0"
                >
                  <Search className="text-muted" style={{ width: "18px", height: "18px" }} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="d-lg-none bg-white border-top">
            <div className="container py-3">
              <div className="row">
                {navItems.map((item) => (
                  <div key={item.id} className="col-6 mb-2">
                    <Link
                      to={`/category/${item.slug}`}
                      className="nav-link-custom d-block px-3 py-2 rounded text-decoration-none text-dark fw-medium text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                <div className="col-6 mb-2">
                  <Link
                    to="/login"
                    className="nav-link-custom d-block px-3 py-2 rounded text-decoration-none text-dark fw-medium text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="me-1" size={16} />
                    Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainNavbar;