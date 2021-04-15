import React from "react";
import Hero from "./Hero";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import BookService from "./Booking/BookService";
import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "../Payment/payment.scss";
import { useDispatch } from "react-redux";
import { vehicleType } from "../actions/booking-actions";

//import RoomsContainer from '../components/RoomsContainer';
const Services = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Hero hero="servicesHero"></Hero>
      <Banner title="Our Services" subtitle="Best in Town">
        <Link to="/" className="btn btn-warning">
          RETURN HOME
        </Link>
      </Banner>
      <Typography align="center" variant="h5">
        Choose Vehicle Type
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        style={{ marginTop: "3rem" }}
      >
        <Grid item xs={6}>
          <Link to="/hamro/bike/booking">
            <Paper
              className="paper"
              onClick={() => dispatch(vehicleType("bike"))}
            >
              <img
                src={require("../images/other/cash-in-hand.jpeg").default}
                alt="cash in hand"
                className="image-payment"
              />
            </Paper>
          </Link>
          <Typography align="center" variant="h6" className="text">
            Bike
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link
            to="/hamro/car/booking"
            onClick={() => dispatch(vehicleType("car"))}
          >
            <Paper className="paper">
              <img
                src={require("../images/other/online-payment.jpeg").default}
                alt="online payment"
                className="image-payment"
              />
            </Paper>
          </Link>
          <Typography align="center" variant="h6" className="text">
            Car
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Services;
