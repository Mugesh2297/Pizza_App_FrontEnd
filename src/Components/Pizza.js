import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartAction";
import { FaRupeeSign } from "react-icons/fa";
import "../CSS/Pizza.css";
import Swal from 'sweetalert2';

function Pizza({ pizza }) {

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const [varient, setVarient] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (currentUser) {
      dispatch(addToCart(pizza, quantity, varient));
      Toast.fire({ icon: 'success', title: 'This item has been added to cart' })
    } else {
      Toast.fire({ icon: 'warning', title: `Please login to shop pizza!` })
    }
  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card
        className="imageupload mb-4 cards mainCard">
        <Card.Img
        className="img-fluid mt-2"
          variant="top"
          src={pizza.image}
          style={{height:"auto", width:"auto", borderRadius:"50px"}}
          onClick={handleShow}
        />
        <Card.Body>
          <Card.Title className="text-dark text-center">{pizza.name}</Card.Title>
          <hr className="text-dark" />
          <Card.Text>
            <Row >
              <Col md={6} className="pizzaAppmob">
                <p className="text-dark">Varients</p>
                <select className="text-dark rounded bg-transparent"
                  value={varient}
                  onChange={(e) => setVarient(e.target.value)}
                >
                  {pizza.varients.map((varient) => (
                    <option className="text-success">{varient}</option>
                  ))}
                </select>
              </Col>
              <Col md={6} className="pizzaAppmob quantity ">
                <p className="text-dark">Quantity</p>
                <select className="text-dark rounded bg-transparent"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[...Array(10).keys()].map((v, i) => (
                    <option value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </Col>
            </Row>
          </Card.Text>
          <Row>
            <Col md={6} className="text-dark mt-2 pizzaAppmob priceArea">
              Price : <FaRupeeSign /> {pizza.prices[0][varient] * quantity}
            </Col>
            <Col md={6} className="pizzaAppmob">
              <Button onClick={addToCartHandler} variant="primary" className="mr-5">
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Card.Img
              variant="top"
              src={pizza.image}
              style={{ height: "270px", borderRadius: "5px" }}
            />
          </div>
          <div>
            <h5>Description</h5>
            <p>{pizza.description}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Pizza;
