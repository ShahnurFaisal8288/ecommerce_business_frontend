import { ThumbsUp, Headphones, Truck, CreditCard } from "lucide-react";
import { Container, Row, Col } from "react-bootstrap";

const detailsData = [
  { icon: ThumbsUp, title: "High-quality Goods", description: "Enjoy top quality items for less" },
  { icon: Headphones, title: "24/7 Live chat", description: "Get instant assistance whenever you need it" },
  { icon: Truck, title: "Express Shipping", description: "Fast & reliable delivery options" },
  { icon: CreditCard, title: "Secure Payment", description: "Multiple safe payment methods" },
];

const FacilitiesSection = () => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #ff5f6d, #ffc371)",
        padding: "60px 0",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container>
        <h2 className="text-center mb-5 fw-bold" style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}>
          Why Choose Us
        </h2>
        <Row>
          {detailsData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Col key={idx} xs={12} md={6} lg={3} className="mb-4">
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "20px",
                    padding: "30px 20px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  className="facility-card"
                >
                  <div
                    style={{
                      background: "radial-gradient(circle at center, #ff5f6d, #ffc371)",
                      borderRadius: "50%",
                      width: 80,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                      boxShadow: "0 4px 15px rgba(255, 95, 109, 0.6)",
                    }}
                  >
                    <IconComponent color="white" size={38} />
                  </div>
                  <h5 style={{ fontWeight: "700", fontSize: "1.3rem", marginBottom: 12, textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}>
                    {item.title}
                  </h5>
                  <p style={{ fontSize: "1rem", lineHeight: 1.4, color: "#fffdd0", maxWidth: 220 }}>
                    {item.description}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Add hover effect CSS */}
      <style>{`
        .facility-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          background-color: rgba(255, 255, 255, 0.25) !important;
        }
      `}</style>
    </section>
  );
};

export default FacilitiesSection;
