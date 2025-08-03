import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetHeroSectionQuery } from "../redux/services/heroSectionService/heroSectionApi";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: heroSlidesData, isLoading } = useGetHeroSectionQuery();

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === heroSlidesData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? heroSlidesData.length - 1 : prev - 1
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="hero-slider d-flex align-items-center justify-content-center position-relative overflow-hidden" 
           style={{ height: "clamp(50vh, 70vh, 100vh)" }}>
        <div className="text-center">
          <div className="spinner-border text-danger mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="text-muted">Loading Hero Section...</h4>
        </div>
      </div>
    );
  }

  // Show message if no data
  if (!heroSlidesData || heroSlidesData.length === 0) {
    return (
      <div className="hero-slider d-flex align-items-center justify-content-center position-relative overflow-hidden" 
           style={{ height: "clamp(50vh, 70vh, 100vh)", backgroundColor: "#f8f9fa" }}>
        <div className="text-center">
          <h2 className="text-muted">No hero slides available</h2>
          <p className="text-muted">Please check back later.</p>
        </div>
      </div>
    );
  }

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
          {heroSlidesData.map((slide) => (
            <div
              key={slide.id}
              className="hero-slide d-flex align-items-center"
              style={{
                minWidth: "100%",
                height: "clamp(50vh, 70vh, 100vh)",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://ecommerce.magneticcodes.com/${slide.image})`,
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

        {/* Slider Controls - Only show if more than 1 slide */}
        {heroSlidesData.length > 1 && (
          <>
            <button
              className="slider-control prev position-absolute top-50 start-0 translate-middle-y bg-white rounded-circle p-2 ms-3 border-0 shadow"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="slider-control next position-absolute top-50 end-0 translate-middle-y bg-white rounded-circle p-2 me-3 border-0 shadow"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slider Indicators */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
              {heroSlidesData.map((_, index) => (
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
          </>
        )}
      </section>
    </div>
  );
};

export default Hero;