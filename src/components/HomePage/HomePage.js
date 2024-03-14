// created by Thanh Thao Bui - 104170172
// This page is used for the content in the home page
// I used reactstrap (React + Bootstrap) and CSS to style this page

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./homepage.css";

const HomePage = () => {
  return (
    <section className="home__section">
      <Container>
        <Row>
          <Col lg="12" md="12" sm="6">
            <div className="home__content">
              {/* the heading of the content  */}
              <h2>
                <span>Decentralized Trading System</span> 
              </h2>
              {/* the introduction of the website */}
              <p>
                Welcome to COS30049 project of EHC 35.2 team! 
                We are EHC 35.2 Team.
                In this project, we create a NFT decentralized trading platform. 
                Let's explore functions of this website.
              </p>

              <div className="home__btns d-flex align-items-center gap-4">
                {/* the Explore button link to dashboard page */}
                <button className="explore__btn d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>{" "}
                  <Link to="/dashboard">Explore</Link>
                </button>

                {/* the Create button link to create new product page */}
                <button className="create__btn d-flex align-items-center gap-2">
                  <i className="ri-ball-pen-line"></i>
                  <Link to="/create">Create</Link>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
