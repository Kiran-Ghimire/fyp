import {
  Typography,
  Box,
  Paper,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ContactForm from "./common/ContactForm";
import CustomSnackbar from "./common/CustomSnackbar";
import About from "./About";
import UserReview from "./UserReview";

const useStyles = makeStyles({
  paper: {
    width: "40rem",
    padding: "2.5rem",
    height: "30rem",
  },
  box: {
    display: "flex",

    marginTop: "2rem",
  },
  submitBtn: {
    textAlign: "center",
    marginTop: "1.4rem",
  },
});

function Contact() {
  const classes = useStyles();

  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <>
      <div id="contact" style={{ marginBottom: "10rem" }}></div>
      {response && response.length > 0 && (
        <CustomSnackbar
          snackbarOpen={snackbar}
          setSnackbar={setSnackbar}
          snackType={snackType}
          snackContent={response}
        />
      )}
      {/* for smooth scrolling */}
      <div style={{ marginBottom: "5rem" }}></div>
      <Box>
        <Container>
          <Typography variant="h4" align="center">
            CONTACT US
          </Typography>
          <Box className={classes.box}>
            <Paper className={classes.paper}>
              <ContactForm
                subject="Feedback By"
                staff="false"
                setResponse={setResponse}
                setSnackType={setSnackType}
                setSnackbar={setSnackbar}
              />
            </Paper>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883.4598219141939!2d85.3122004211209!3d27.660443591113857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1971e9018033%3A0x3f9695db6873b15c!2sKusunti%20Ganeshstan!5e0!3m2!1sen!2snp!4v1618564840836!5m2!1sen!2snp"
              width="400"
              height="300"
              style={{
                border: "0",
                borderRadius: "10px",
                marginTop: "3rem",
                marginLeft: "4rem",
              }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Container>
      </Box>
      <About />
      <UserReview />
    </>
  );
}

export default Contact;
