import { useState } from "react";
import { User, Search, Phone, Heart, ShoppingCart, X, Menu } from 'lucide-react';

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  
  const navItems = [
    { name: "Men's Fashion", href: "#" },
    { name: "HOODIE", href: "#" },
    { name: "Kurta", href: "#" },
    { name: "Casual Shirt", href: "#" },
    { name: "Formal Shirt", href: "#" },
    { name: "Ban Collar Shirt", href: "#" },
    { name: "Sweep Shirt", href: "#" },
    { name: "Short Sleeve Shirt", href: "#" }
  ];

  const customStyles = `
    <style>
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
    </style>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <div>
        {/* Top Bar */}
        <div className="bg-danger text-white py-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <span className="fw-medium">Welcome to Fig and Fit shop</span>
              </div>
              <div className="col-md-6 text-end">
                <div className="d-flex justify-content-end gap-4">
                  <button className="btn btn-link text-white p-0 text-decoration-none">
                    <span>About</span>
                  </button>
                  <button className="btn btn-link text-white p-0 text-decoration-none">
                    <span>Contact</span>
                  </button>
                  <button className="btn btn-link text-white p-0 text-decoration-none">
                    <User className="me-1" style={{ width: "16px", height: "16px" }} />
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
          <div className="container">
            <div className="row w-100 align-items-center">
              {/* Logo Section */}
              <div className="col-lg-2 col-md-3 col-6">
                <div className="navbar-brand d-flex align-items-center mb-0">
                  <div
                    className="me-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #dc3545, #c82333)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span className="text-white fw-bold fs-5">F&F</span>
                  </div>
                  <div>
                    <h1 className="navbar-brand-custom mb-0 fs-4 fw-bold">
                      FIG & FIT
                    </h1>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      Premium Fashion
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Bar Section */}
              <div className="col-lg-4 col-md-5 d-none d-md-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control search-focus py-2 pe-5 rounded-pill border-2"
                    placeholder="Search for products, brands and more..."
                    style={{ backgroundColor: "#f8f9fa", borderColor: "#dee2e6" }}
                  />
                  <button
                    className="btn position-absolute end-0 top-50 translate-middle-y pe-3 bg-transparent border-0"
                    style={{ zIndex: 10 }}
                  >
                    <Search className="text-muted" style={{ width: "20px", height: "20px" }} />
                  </button>
                </div>
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
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-light rounded-circle p-2 position-relative cart-icon">
                      <Heart style={{ width: "24px", height: "24px" }} className="text-muted" />
                      {wishlistCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {wishlistCount}
                        </span>
                      )}
                    </button>
                    
                    <button className="btn btn-light rounded-circle p-2 position-relative cart-icon">
                      <ShoppingCart style={{ width: "24px", height: "24px" }} className="text-muted" />
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartCount}
                        </span>
                      )}
                    </button>
                    
                    <div className="d-none d-md-block text-end ms-2">
                      <p className="mb-0 small text-muted">Cart amount</p>
                      <p className="mb-0 fs-6 fw-bold text-danger">৳ 0</p>
                    </div>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    className="btn btn-outline-secondary d-lg-none"
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Navigation Menu Bar */}
        <div className="bg-white border-top d-none d-lg-block">
          <div className="container">
            <div className="d-flex justify-content-center py-3">
              <div className="d-flex flex-wrap justify-content-center gap-1">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="nav-link-custom px-4 py-2 rounded text-decoration-none text-dark fw-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="d-md-none bg-light border-top">
          <div className="container py-2">
            <div className="position-relative">
              <input
                type="text"
                className="form-control search-focus pe-5"
                placeholder="Search products..."
                style={{ backgroundColor: "#ffffff" }}
              />
              <button className="btn position-absolute end-0 top-50 translate-middle-y pe-3 bg-transparent border-0">
                <Search className="text-muted" style={{ width: "18px", height: "18px" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="d-lg-none bg-white border-top">
            <div className="container py-3">
              <div className="row">
                {navItems.map((item, index) => (
                  <div key={index} className="col-6 mb-2">
                    <a
                      href={item.href}
                      className="nav-link-custom d-block px-3 py-2 rounded text-decoration-none text-dark fw-medium text-center"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainNavbar;