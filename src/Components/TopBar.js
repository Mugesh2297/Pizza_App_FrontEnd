import React from "react";
import { Navbar, Container, Nav, Image, NavDropdown,  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import img from "../pizza.png";
import { logoutUser } from "../actions/userAction";

function TopBar() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  return (
    <>
      <Navbar variant="dark" expand="lg" sticky="top" style={{ backgroundColor: "#006491" }}>
        <Container>
          <Navbar.Brand>
            <Image  src={img} style={{ height: "50px" }} />
          </Navbar.Brand>
          <Navbar.Brand>
            <h3>Pizza App</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {currentUser ? (
                <>
                  <LinkContainer to="/">
                    {/* <NavDropdown
                      title={currentUser.name}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item>
                      <Nav.Link href="#home" className="text-dark">Home</Nav.Link>
                      <NavDropdown.Divider />
                      <Nav.Link href="#home"  onClick={() => {
                            dispatch(logoutUser());
                          }} className="text-dark">Log Out</Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown> */}
                    <NavDropdown title={currentUser.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#/orders" > <LinkContainer className="text-dark" to="/orders">
                      <Nav.Link>Orders</Nav.Link>
                    </LinkContainer></NavDropdown.Item>
              <NavDropdown.Item href="#home">
                <LinkContainer onClick={() => {
                            dispatch(logoutUser());
                          }} className="text-dark" to="/">
                      <Nav.Link>Log Out</Nav.Link>
                    </LinkContainer>
              </NavDropdown.Item>
            </NavDropdown>
                  </LinkContainer>
                  {currentUser.isAdmin === false ? (
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        Cart&nbsp;{cartState.cartItems.length}
                      </Nav.Link>
                    </LinkContainer>

                  ) : (
                    <LinkContainer to="/admin">
                      <Nav.Link>Admin panel</Nav.Link>
                    </LinkContainer>
                  )}
                 
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/adminlogin">
                    <Nav.Link>Admin</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
