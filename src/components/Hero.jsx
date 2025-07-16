import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ... rest of your Hero component code remains the same

const Hero = () => {
  // Hero slider state
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const response = await fetch(
          "http://ecommerce-backend.test/api/hero-section"
        );
        const data = await response.json();
        setHeroSlides(data);
        console.log("Hero slides fetched:", data);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      }
    };

    fetchHeroSlides();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div>
      {/* Hero Slider Section */}
      <section className="hero-slider position-relative overflow-hidden">
        <div
          className="slider-track d-flex"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="hero-slide d-flex align-items-center"
              style={{
                minWidth: "100%",
                height: "clamp(50vh, 70vh, 100vh)",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(http://ecommerce-backend.test/storage/${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="hero-content text-white">
                      <h1 className="display-4 fw-bold mb-3">
                        {slide.title ?? "Welcome"}
                      </h1>
                      <p className="lead mb-4">
                        {slide.subtitle ?? "Enjoy our latest collection"}
                      </p>
                      {slide.button_text && (
                        <a
                          href={slide.button_link ?? "#"}
                          className="btn btn-danger btn-lg px-4 py-2"
                        >
                          {slide.button_text}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          className="slider-control prev position-absolute top-50 start-0 translate-middle-y bg-white rounded-circle p-2 ms-3 border-0"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="slider-control next position-absolute top-50 end-0 translate-middle-y bg-white rounded-circle p-2 me-3 border-0"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator rounded-circle p-1 border-0 ${
                currentSlide === index ? "bg-danger" : "bg-white bg-opacity-50"
              }`}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: "12px",
                height: "12px",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
