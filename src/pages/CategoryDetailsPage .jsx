import React, { useState } from 'react';
import { Filter, ChevronRight, Heart, Star, ShoppingCart, Grid, List, Search, Sparkles } from 'lucide-react';

const CategoryDetailsPage = ({ category = 'hoodie' }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [likedProducts, setLikedProducts] = useState(new Set());

  const categories = [
    { name: "MEN'S FASHION", icon: "👔", count: 245 },
    { name: "KATUA", icon: "🧥", count: 89 },
    { name: "CASUAL SHIRT'S", icon: "👕", count: 156 },
    { name: "FORMAL SHIRT", icon: "👔", count: 78 },
    { name: "BAN COLAR SHIRT'S", icon: "👘", count: 92 },
    { name: "SWEEP SHIRT", icon: "🧥", count: 67 },
    { name: "SHORT SLEEVE SHIRT", icon: "👕", count: 134 }
  ];

  const products = [
    {
      id: 1,
      image: "/api/placeholder/300/300",
      title: "Premium Quality White Hoodie with Black Accents",
      currentPrice: 690,
      originalPrice: 990,
      discount: 30,
      color: "white",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      category: "hoodie"
    },
    {
      id: 2,
      image: "/api/placeholder/300/300",
      title: "Premium Quality Black Hoodie with Wing Design",
      currentPrice: 690,
      originalPrice: 990,
      discount: 30,
      color: "black",
      rating: 4.9,
      reviews: 98,
      badge: "New",
      category: "hoodie"
    },
    {
      id: 3,
      image: "/api/placeholder/300/300",
      title: "Premium Quality Black Pullover Hoodie",
      currentPrice: 650,
      originalPrice: 850,
      discount: 24,
      color: "black",
      rating: 4.7,
      reviews: 156,
      badge: "Popular",
      category: "hoodie"
    },
    {
      id: 4,
      image: "/api/placeholder/300/300",
      title: "Premium Quality Blue Zip-Up Hoodie",
      currentPrice: 650,
      originalPrice: 850,
      discount: 24,
      color: "blue",
      rating: 4.6,
      reviews: 87,
      badge: "Limited",
      category: "hoodie"
    },
    {
      id: 5,
      image: "/api/placeholder/300/300",
      title: "Premium Quality Navy Blue Hoodie",
      currentPrice: 650,
      originalPrice: 850,
      discount: 24,
      color: "navy",
      rating: 4.8,
      reviews: 203,
      badge: "Trending",
      category: "hoodie"
    },
    {
      id: 6,
      image: "/api/placeholder/300/300",
      title: "Premium Quality Red Hoodie",
      currentPrice: 650,
      originalPrice: 850,
      discount: 24,
      color: "red",
      rating: 4.5,
      reviews: 76,
      badge: "Hot",
      category: "hoodie"
    },
    {
      id: 7,
      image: "/api/placeholder/300/300",
      title: "Premium Quality Grey Hoodie with Wing Design",
      currentPrice: 690,
      originalPrice: 890,
      discount: 22,
      color: "grey",
      rating: 4.9,
      reviews: 145,
      badge: "Premium",
      category: "hoodie"
    },
    {
      id: 8,
      image: "/api/placeholder/300/300",
      title: "Premium Quality Green Hoodie",
      currentPrice: 720,
      originalPrice: 920,
      discount: 22,
      color: "green",
      rating: 4.7,
      reviews: 89,
      badge: "New",
      category: "hoodie"
    }
  ];

  const filteredProducts = products.filter(product => 
    category === 'hoodie' || product.category === category
  );

  const handleFilter = () => {
    console.log('Filtering with:', { minPrice, maxPrice, selectedCategory });
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-warning';
      case 'New': return 'bg-success';
      case 'Popular': return 'bg-primary';
      case 'Limited': return 'bg-danger';
      case 'Trending': return 'bg-info';
      case 'Hot': return 'bg-danger';
      case 'Premium': return 'bg-dark';
      default: return 'bg-secondary';
    }
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'white': return 'bg-light border border-secondary';
      case 'black': return 'bg-dark';
      case 'blue': return 'bg-primary';
      case 'navy': return 'bg-dark';
      case 'red': return 'bg-danger';
      case 'grey': return 'bg-secondary';
      case 'green': return 'bg-success';
      default: return 'bg-light';
    }
  };

  return (
    <div className="min-vh-100" style={{
      position: 'relative'
    }}>
      {/* Overlay for better content visibility */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}></div>

      {/* Modern Breadcrumb */}
      <div className="bg-white shadow-sm sticky-top" style={{ 
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        position: 'relative',
        zIndex: 1000
      }}>
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <span className="text-muted">Home</span>
                  </li>
                  <li className="breadcrumb-item text-muted">Categories</li>
                  <li className="breadcrumb-item active text-primary fw-bold text-capitalize">
                    {category}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-4 text-end">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-outline-primary ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="me-1" size={16} />
                  Grid
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-primary ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="me-1" size={16} />
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row">
          {/* Enhanced Sidebar */}
          <div className="col-lg-3 mb-4">
            {/* Search Filter */}
            <div className="card shadow-lg border-0 mb-4" style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-header bg-transparent border-0 pb-0">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <Search className="me-2 text-primary" size={20} />
                  Quick Search
                </h5>
              </div>
              <div className="card-body">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 shadow-sm"
                    placeholder="Search products..."
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  />
                  <button className="btn btn-primary" type="button">
                    <Search size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="card shadow-lg border-0 mb-4" style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-header bg-transparent border-0 pb-0">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <Sparkles className="me-2 text-warning" size={20} />
                  Categories
                </h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center justify-content-between ${
                        selectedCategory === cat.name
                          ? 'bg-primary text-white'
                          : 'bg-light'
                      }`}
                      style={{ 
                        transition: 'all 0.3s ease',
                        transform: selectedCategory === cat.name ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="me-2 fs-5">{cat.icon}</span>
                        <span className="fw-medium">{cat.name}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className={`badge ${selectedCategory === cat.name ? 'bg-white text-primary' : 'bg-secondary'} me-2`}>
                          {cat.count}
                        </span>
                        <ChevronRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Filter */}
            <div className="card shadow-lg border-0" style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-header bg-transparent border-0 pb-0">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <Filter className="me-2 text-success" size={20} />
                  Price Range
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Minimum Price</label>
                    <input
                      type="number"
                      className="form-control shadow-sm"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="৳0"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Maximum Price</label>
                    <input
                      type="number"
                      className="form-control shadow-sm"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="৳10000"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      onClick={handleFilter}
                      className="btn btn-gradient w-100 shadow-sm"
                      style={{ 
                        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                        border: 'none',
                        color: 'white',
                        fontWeight: '600'
                      }}
                    >
                      <Filter className="me-2" size={16} />
                      Apply Filter
                    </button>
                  </div>
                </div>
                
                {/* Sort Dropdown */}
                <div className="mt-4">
                  <label className="form-label fw-semibold">Sort By</label>
                  <select 
                    className="form-select shadow-sm"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Best Rating</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="display-5 fw-bold text-white mb-2 text-capitalize">
                  {category} Collection
                </h1>
                <p className="text-white-50 mb-0">
                  Showing {filteredProducts.length} premium products
                </p>
              </div>
              <div className="bg-white rounded-pill px-3 py-2 shadow-sm">
                <span className="fw-medium text-muted">
                  {filteredProducts.length} Products
                </span>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`row g-4 ${viewMode === 'list' ? 'row-cols-1' : 'row-cols-1 row-cols-md-2 row-cols-lg-3'}`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="col">
                  <div className="card h-100 shadow-lg border-0 position-relative overflow-hidden" 
                       style={{ 
                         background: 'rgba(255, 255, 255, 0.95)',
                         backdropFilter: 'blur(10px)',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.transform = 'translateY(-5px)';
                         e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.transform = 'translateY(0)';
                         e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                       }}
                  >
                    {/* Product Image */}
                    <div className="position-relative">
                      {/* Badges */}
                      <div className="position-absolute top-0 start-0 p-3 d-flex flex-column gap-2" style={{ zIndex: 10 }}>
                        <span className="badge bg-danger shadow-sm">
                          -{product.discount}% OFF
                        </span>
                        <span className={`badge ${getBadgeColor(product.badge)} shadow-sm`}>
                          {product.badge}
                        </span>
                      </div>
                      
                      {/* Like Button */}
                      <button
                        onClick={() => toggleLike(product.id)}
                        className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm"
                        style={{ 
                          width: '40px', 
                          height: '40px',
                          zIndex: 10,
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <Heart 
                          size={18} 
                          className={likedProducts.has(product.id) ? 'text-danger' : 'text-muted'}
                          fill={likedProducts.has(product.id) ? 'currentColor' : 'none'}
                        />
                      </button>

                      {/* Product Image Container */}
                      <div className="card-img-top d-flex align-items-center justify-content-center p-4" 
                           style={{ 
                             height: '250px',
                             background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                           }}>
                        <div 
                          className={`rounded-4 shadow-lg ${getColorClass(product.color)}`}
                          style={{ 
                            width: '150px', 
                            height: '150px',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          }}
                        >
                          {(product.color === 'black' || product.color === 'grey') && (
                            <div className="d-flex align-items-center justify-content-center h-100">
                              <span className="text-white display-6">🕊️</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="card-body">
                      <h5 className="card-title fw-bold mb-2" style={{ 
                        fontSize: '1.1rem',
                        lineHeight: '1.4',
                        height: '2.8rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {product.title}
                      </h5>
                      
                      {/* Rating */}
                      <div className="d-flex align-items-center mb-2">
                        <div className="d-flex align-items-center me-2">
                          <Star className="text-warning me-1" size={16} fill="currentColor" />
                          <span className="fw-medium">{product.rating}</span>
                        </div>
                        <span className="text-muted small">({product.reviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="d-flex align-items-center mb-3">
                        <span className="h5 fw-bold text-primary mb-0 me-2">
                          ৳{product.currentPrice}
                        </span>
                        <span className="text-muted text-decoration-line-through">
                          ৳{product.originalPrice}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="d-grid gap-2">
                        <button className="btn btn-primary fw-semibold shadow-sm">
                          <ShoppingCart className="me-2" size={16} />
                          Add to Cart
                        </button>
                        <button className="btn btn-outline-primary fw-semibold">
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsPage;