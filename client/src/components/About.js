import { Grid, Box, Typography, Button, Container } from "@material-ui/core";
import React from "react";

function About() {
  return (
    <Container style={{ marginTop: "5%", marginBottom: "12%" }} maxWidth="sm">
      <Grid container spacing={4} style={{ padding: "1rem" }}>
        <Grid item xs={12} md={6}>
          <Box style={{ display: "flex", alignItems: "center" }}></Box>
        </Grid>

        <Grid item xs={2} md={12}>
          <Box
            height="10rem"
            display="flex"
            align="center"
            marginTop=" 2rem"
            marginLeft="10rem"
          >
            <img
              src={require("../images/other/logowhite.png").default}
              alt="logo"
            />
          </Box>
          <Box alignItems="center" display="flex">
            <div>
              <Typography variant="h4" align="center">
                Who are We?
              </Typography>
              <br />
              <Typography variant="body1" align="center">
                Our workshop is very nice. Please book your vehicle in our
                workshop.
              </Typography>
              <br />
              <Typography variant="h6" align="center">
                Welcome to Hamro Workshop
              </Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
