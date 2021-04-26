import React from "react";
import Hero from "./Hero";
import Banner from "./Banner";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Container, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const NewCard = ({ cardImage, title, subTitle, children }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subTitle}
      />
      <CardMedia
        className={classes.media}
        image={cardImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Offers = () => {
  return (
    <Container
      style={{ marginTop: "10rem", marginBottom: "20rem" }}
      maxWidth="md"
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <NewCard
            cardImage={require("../images/other/christmas.jpg").default}
            title="Christmas Offer"
            subTitle="December 25 2021"
          >
            Get 10% off on our services
          </NewCard>
        </Grid>
        <Grid item xs={4}>
          <NewCard
            cardImage={require("../images/other/dashain.PNG").default}
            title="Dashain Offer"
            subTitle="October 24-27 2021 "
          >
            Get 20% off on our services
          </NewCard>
        </Grid>
        <Grid item xs={4}>
          <NewCard
            cardImage={require("../images/other/newyear.jpg").default}
            title="New Year Offer"
            subTitle="Jan 1 2021"
          >
            Get 10% off on our services.
          </NewCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Offers;
