import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Toolbar,
  Typography,
  Grid,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { totalPrice as bill, cart } from "../../actions/booking-actions";

export default function BookingCart() {
  const [bookingCart, setBookingCart] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const [userId] = userData.map((item) => item.User_ID);

  useEffect(() => {
    axios.get("/getAppointment").then((res) => {
      const value = res.data.result.filter((item) => item.User_ID === userId);
      setBookingCart(value);
    });
  }, []);

  let totalPrice;
  let withVAT;
  if (bookingCart?.length > 0) {
    let array = bookingCart.map((item) => item.servicesPrice);
    totalPrice = array.reduce((a, b) => a + b);
    withVAT = totalPrice + Math.round(totalPrice * (13 / 100));
  }
  return (
    <Container maxWidth="md" style={{ marginBottom: "12rem" }}>
      <div style={{ marginTop: "10rem" }}>
        {bookingCart !== undefined && bookingCart.length > 0 ? (
          bookingCart.map((item) => (
            <Grid key={item.services_id} item xs={12} sm={8}>
              <Paper>
                <Grid container spacing={2} style={{ padding: "1rem" }}>
                  <Grid item xs={5}>
                    <Box
                      display="flex"
                      alignItems="center"
                      paddingLeft="0.5rem"
                      height="70px"
                      overflow="hidden"
                    >
                      <img
                        src={
                          require(`../../images/services/${item.image}`).default
                        }
                        alt="product"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">{item.servicesName}</Typography>
                    <Typography variant="body2">
                      Rs. {item.servicesPrice}
                    </Typography>
                    <Typography variant="body2">
                      Vehicle Name: {item.vehicle_name}
                    </Typography>
                    <Typography variant="body2"> Time: {item.time}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2">
                      Total = {item.services_price}
                    </Typography>
                    <Typography
                      type="button"
                      color="error"
                      variant="body2"
                      onClick={() => {
                        axios.post("/deleteCart", {
                          id: item.appointment_id,
                        });
                      }}
                    >
                      Remove
                      <AiFillDelete
                        style={{ marginLeft: "0.4rem" }}
                        size={15}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper>
              <Box padding="0.5rem" textAlign="center">
                <Typography variant="body2" style={{ color: "lightGrey" }}>
                  No items in the cart.{" "}
                  <Link
                    // lassName={classes.link}
                    to="/"
                  >
                    VISIT HOME
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}
        {bookingCart !== undefined && bookingCart.length > 0 && (
          <Grid item xs={12} sm={4}>
            <Paper>
              <Box padding="1.2rem" marginTop="1.5rem">
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="body2">Price : </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">{totalPrice}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography align="left" variant="body2">
                      VAT
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {" "}
                    <Typography align="left" variant="body2">
                      13%
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">Total Amount: </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2"> {withVAT}</Typography>
                  </Grid>
                </Grid>
                <Box
                  marginTop="0.5rem"
                  marginBottom="-0.4rem"
                  textAlign="center"
                >
                  <Link
                    // className={classes.link}
                    to="/hamro/payment"
                  >
                    <Button
                      style={{ backgroundColor: "#757ce8" }}
                      onClick={() => {
                        dispatch(bill(withVAT));
                        console.log(bookingCart);
                        dispatch(cart(bookingCart));
                      }}
                    >
                      Checkout
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}
      </div>
    </Container>
  );
}
