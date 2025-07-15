import { Container, Row, Col } from "react-bootstrap";
import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #121212, #1e1e1e)",
        color: "#ccc",
        fontSize: "0.9rem",
        borderTop: "4px solid #e60000",
      }}
    >
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={4} className="mb-4 mb-md-0">
            <img
              src="/path-to-logo.png"
              alt="Fig and Fit Logo"
              style={{ width: 140, marginBottom: 15, filter: "drop-shadow(0 0 3px #e60000)" }}
            />
            <p style={{ lineHeight: 1.7, color: "#bbb", fontWeight: 500 }}>
              <strong>Fig and Fit</strong> is a complete e-commerce website. Here, consumers of all ages
              can buy every essential product of the day, from gadgets, electronics, home appliances,
              leather goods, jewelry, baby accessories, cosmetics, fashion, and lifestyle products —
              all at affordable prices delivered to your home.
            </p>
          </Col>

          <Col md={2} className="mb-4 mb-md-0">
            <h5
              style={{
                color: "#fff",
                borderBottom: "3px solid #e60000",
                paddingBottom: "8px",
                fontWeight: "700",
                letterSpacing: "1.2px",
              }}
            >
              Quick Links
            </h5>
            <ul className="list-unstyled mt-3">
              {["Home Page", "User Login", "User Register"].map((link, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#bbb",
                      textDecoration: "none",
                      transition: "color 0.3s, transform 0.3s",
                      fontWeight: 500,
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#e60000";
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#bbb";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={2} className="mb-4 mb-md-0">
            <h5
              style={{
                color: "#fff",
                borderBottom: "3px solid #e60000",
                paddingBottom: "8px",
                fontWeight: "700",
                letterSpacing: "1.2px",
              }}
            >
              Information
            </h5>
            <ul className="list-unstyled mt-3">
              {["Shipment Info", "About Us", "Return Policy"].map((link, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#bbb",
                      textDecoration: "none",
                      transition: "color 0.3s, transform 0.3s",
                      fontWeight: 500,
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#e60000";
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#bbb";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={4}>
            <h5
              style={{
                color: "#fff",
                borderBottom: "3px solid #e60000",
                paddingBottom: "8px",
                fontWeight: "700",
                letterSpacing: "1.2px",
              }}
            >
              Follow Us
            </h5>
            <div className="d-flex gap-4 mt-3">
              {[Instagram, Youtube, Twitter, Linkedin].map((IconComp, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social Link"
                  style={{
                    color: "#bbb",
                    border: "2px solid #e60000",
                    padding: "10px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 6px transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e60000";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#e60000";
                    e.currentTarget.style.boxShadow = "0 0 8px #e60000";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#bbb";
                    e.currentTarget.style.borderColor = "#e60000";
                    e.currentTarget.style.boxShadow = "0 0 6px transparent";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <IconComp size={26} />
                </a>
              ))}
            </div>
          </Col>
        </Row>

        {/* Removed payment logos section */}

        {/* Copyright */}
        <Row>
          <Col
            className="text-center text-muted"
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            &copy; {new Date().getFullYear()} figandfit.com &nbsp;|&nbsp; Developed by{" "}
            <a
              href="https://mit.edu"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#e60000", fontWeight: 700 }}
              onMouseEnter={(e) => (e.target.style.color = "#ff3b3b")}
              onMouseLeave={(e) => (e.target.style.color = "#e60000")}
            >
              MIT
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
