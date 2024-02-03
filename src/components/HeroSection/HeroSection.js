import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="12" md="12" sm="6">
            <div className="hero__content">
              <h2>
                <span>Coinmiya - Decentralized Trading System</span> 
              </h2>
              <p>
                Coinmiya is a decentralized NFT trading system, offering users a secure 
                and transparent platform to trade Non-Fungible Tokens (NFT). Through 
                smart contracts, it automates transactions, empowering users 
                with direct control over their digital assets. Yoimi's commitment 
                to decentralization ensures a trustworthy environment, making NFT 
                trading seamless and user-friendly.
              </p>

              <div className="hero__btns d-flex align-items-center gap-4">
                <button className="explore__btn d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>{" "}
                  <Link to="/dashboard">Explore</Link>
                </button>
                <button className="create__btn d-flex align-items-center gap-2">
                  <i className="ri-ball-pen-line"></i>
                  <Link to="/create">Create</Link>
                </button>
              </div>
            </div>
          </Col>

          {/* <Col lg="6" md="6">
            <div className="hero__img">
              <img src={heroImg} alt="" className="w-100" />
            </div>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
