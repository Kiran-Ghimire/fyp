import React, { useState } from "react";
import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "./payment.scss";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useKhaltiCheckout from "./useKhaltiCheckout";
import { handlePayment, fetchAppointment } from "../actions/booking-actions";

export default function Payment() {
  const { checkout } = useKhaltiCheckout();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const userId = userData.map((item) => item.User_ID);
  const cart = useSelector((state) => state.booking.cart);
  // const cart = useSelector((state) => state.store.cart);
  const bookingCart = useSelector((state) => state.booking.bookingCart);

  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  const offline = "Offline";
  const online = "Online";

  let history = useHistory();
  return (
    <Container maxWidth="md" style={{ marginTop: "9rem" }}>
      <Typography align="center" variant="h5">
        Choose your preferred payment method{" "}
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        style={{ marginTop: "3rem" }}
      >
        <Grid item xs={6}>
          <Link to="/">
            <Paper
              className="paper"
              onClick={() => {
                dispatch(handlePayment(userId, offline));
                dispatch(fetchAppointment());
                axios.post("/confirmation", {
                  email: userData.map((item) => item.email),
                  //cart: cart,
                  bookingCart: cart,
                });
                setSnackbar(true);
                setSnackType("success");
                setResponse("Thankyou for choosing us");
                setTimeout(() => {
                  // history.push("/#services");
                }, 2500);
              }}
            >
              <img
                src={require("../images/other/cash-in-hand.jpeg").default}
                alt="cash in hand"
                className="image-payment"
              />
            </Paper>
          </Link>
          <Typography align="center" variant="h6" className="text">
            Cash in Hand
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className="paper"
            onClick={() => {
              checkout();
              dispatch(handlePayment(userId, online));
              setSnackbar(true);
              setSnackType("success");
              setResponse("Thankyou for choosing us");
              dispatch(fetchAppointment());
              axios.post("/confirmation", {
                email: userData.map((item) => item.email),
                //cart: cart,
                bookingCart: cart,
              });
              setTimeout(() => {
                history.push("/#services");
              }, 9500);
            }}
          >
            <img
              src={require("../images/other/online-payment.jpeg").default}
              alt="online payment"
              className="image-payment"
            />
          </Paper>

          <Typography align="center" variant="h6" className="text">
            Online Payment
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
