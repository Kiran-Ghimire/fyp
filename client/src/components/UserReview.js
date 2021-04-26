import { Avatar } from "@material-ui/core";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  imgSize: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  container: {
    marginTop: "10%",
    marginBottom: "10%",
  },
}));

const reviews = [
  {
    id: 1,
    name: "Ram Singh",
    review:
      "Thank you so much for the wonderful work on my Vehicle, I recommend every one to service thier vehicle at Hamro Workshop. Absolutely Best servicing.",
    image: "client1",
  },
  {
    id: 2,
    name: "Gopal Bahadur",
    review:
      "Been using Hamro Workshop for past 2 years and it has never let me down.",
    image: "client2",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    review:
      "Loved the servicing. I recommend every one for ceramic coating at Hamro Workshop. Absolutely the best!!!",
    image: "client3",
  },
];

const Client = ({ item }) => {
  const classes = useStyles();
  return (
    <div>
      <Box marginBottom="1rem">
        <Box display="flex" justifyContent="center">
          <Avatar
            className={classes.imgSize}
            src={require(`../images/other/${item.image}.jpg`).default}
          ></Avatar>
        </Box>
        <Box textAlign="center" style={{ marginTop: "1rem" }}>
          <Typography variant="subtitle">{item.name}</Typography>
          <br />
          <br />
          <Typography variant="subtitle">{item.review}</Typography>
        </Box>
      </Box>
    </div>
  );
};

function UserReview() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" align="center" style={{ marginBottom: "1rem" }}>
        WHAT OUR USERS SAY
      </Typography>
      <Grid container spacing={4} component="div" style={{ padding: "2rem" }}>
        {reviews.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Client item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserReview;
