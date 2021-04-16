import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "../scss/inventory.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAppointment,
  fetchServices,
  fetchStaffs,
  fetchUserAppointment,
  loadCurrentService,
} from "../../actions/booking-actions";

function BookService() {
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => state.booking.vehicle);
  console.log(vehicle);
  const userData = useSelector((state) => state.login.userData);
  useEffect(() => {
    let id;
    userData !== undefined && userData.map((item) => (id = item.User_ID));
    console.log(id);
    dispatch(fetchUserAppointment(id));
    dispatch(fetchServices());

    dispatch(fetchAppointment());
  }, []);

  const services = useSelector((state) => state.booking.services);

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "10rem" }}>
        <Box>
          <Grid container spacing={2}>
            {services.map((item) => (
              <Grid key={item.services_id} item xs={12} sm={6} md={3}>
                <Paper className="product-container">
                  <Box className="image-container">
                    <img
                      src={
                        require(`../../images/services/${item.image}`).default
                      }
                      alt="product-img"
                      height="100%"
                      width="100%"
                      className="image"
                    />
                  </Box>
                  <Box textAlign="center" marginTop="0.3rem">
                    <Typography align="center" variant="body1">
                      {item.services_name}
                    </Typography>
                    <Typography align="center" variant="body1">
                      Rs. {item.services_price}
                    </Typography>

                    <Link
                      to={`/hamro/${vehicle}/booking/${item.services_id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={() => dispatch(loadCurrentService(item))}
                    >
                      <Button
                        style={{
                          marginBottom: "0.6rem",
                          backgroundColor: "teal",
                          marginTop: "0.3rem",
                          width: "9rem",
                        }}
                      >
                        <Typography variant="caption">BOOK NOW</Typography>
                      </Button>
                    </Link>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default BookService;
