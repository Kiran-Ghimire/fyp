import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: "20rem",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cart: {
    paddingRight: "0.1rem",
    cursor: "pointer",
    backgroundColor: "teal",
    position: "fixed",
    height: "8rem",
    width: "1.5rem",
    borderBottomLeftRadius: "0.6rem",
    borderTopLeftRadius: "0.6rem",
    right: "0",
    zIndex: "9",
    float: "right",
    writingMode: "vertical-rl",
    "&:hover": {
      width: "2rem",
    },
  },
  link: {
    color: "inherit",
    "&:hover": {
      color: "inherit",
    },
  },
}));

export default function HoverCart() {
  const classes = useStyles();

  return (
    <Link to="/hamro/bookingCart" className={classes.link}>
      <div className={classes.box}>
        <Typography
          component="span"
          align="center"
          variant="subtitle"
          className={classes.cart}
        >
          Booking Cart
        </Typography>
      </div>
    </Link>
  );
}
