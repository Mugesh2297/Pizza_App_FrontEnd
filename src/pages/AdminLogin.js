import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminUser } from "../actions/userAction";

import Loader from "../Components/Loader";
import Success from "../Components/Success";
import Error from "../Components/Error";
import '../CSS/login.css';

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const adminState = useSelector(state => state.adminUserReducer)
  const { loading, success, error } = adminState

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/admin";
    }
  }, []);

  function handleLogin() {
    const user = { email, password };
    dispatch(adminUser(user));

  }
  return (
    <>
      <Container className="adminForm">
        <Row>
          <Col md={3}>
          </Col>
          <Col
            xs={12} sm={12} md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Form className="form adminlogin">
              <h1 className="text-center text-white">Admin Login</h1>
              {loading && <Loader />}
              {success && <Success success="Admin Registered Successfully" />}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleLogin}>
                Admin Login
              </Button>
              <br/>
              <br/>
              {error && <Error error="email or password incorrect" />}

            </Form>
          </Col>
          <Col md={3}>
          </Col>
        </Row>
        <div className="text-center">
                <p className="">
                  <strong>Test Account</strong>: admin@gmail.com <br />
                  <strong>password</strong> : Mugesh@22
                </p>

              </div>
      </Container>
    </>
  );
}

export default AdminLogin;





