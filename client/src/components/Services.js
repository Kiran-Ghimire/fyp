import React from "react";
import Hero from "./Hero";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import BookService from "./Booking/BookService";
import "../Payment/payment.scss";
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
      <Banner
        title="Our Services"
        subtitle="Get quality vehicle service a cheap price."
      >
        <Link to="/hamro/offers" className="btn btn-warning">
          SEE OFFERS
        </Link>
      </Banner>
      <Typography align="center" variant="h5" style={{ marginTop: "5rem" }}>
        Choose Vehicle Type
      </Typography>
      <Container maxWidth="md">
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
                  src={require("../images/other/bikee.jpg").default}
                  alt="bike"
                  className="image-payment"
                />
              </Paper>
            </Link>
            <Typography
              align="center"
              variant="h6"
              className="text"
              style={{ marginBottom: "5rem" }}
            >
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
                  src={require("../images/other/Car.jpg").default}
                  alt="online payment"
                  className="image-payment"
                />
              </Paper>
            </Link>
            <Typography
              align="center"
              variant="h6"
              className="text"
              style={{ marginBottom: "5rem" }}
            >
              Car
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Services;
