import {
    Typography,
    Box,
    Paper,
    TextField,
    makeStyles,
    Grid,
    Button,
    Checkbox,
    Container
  } from "@material-ui/core";
  
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector} from 'react-redux';
  import { userData, authToken} from '../../actions/index';

  

  
  import { Formik, Form } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  
//   import GLogin from "./GLogin";
//   import FLogin from "./FLogin";
import { useHistory, Link } from "react-router-dom";
  
  import {FcHome} from 'react-icons/fc';

  import GoogleLog from './GoogleLog';
  
  
  
  
  const useStyles = makeStyles({
    contactContainer: { marginTop: "10%", marginBottom: "10%" },
    paper: {
      width: "33rem",
      padding: "2.5rem", 
    },
    box: {
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem",
    },
    submitBtn: {
      textAlign: "center",
      marginTop: "1.4rem",
    },
    signIn: {
      marginTop: "-1rem",
      paddingBottom: "1rem",
      marginLeft: "18rem",
    },
    link: {
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        color: "inherit",
        textDecoration: "none",
      },
    },
  });
  
  axios.defaults.withCredentials = true;
  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required("Invalid Email!!"),
    password: Yup.string().required("Password is required"),
    
  });
  
  const initialValues = {
    email: "",
    password: "",
    loggedIn: false,
  };
  
  const Login=() => {
    let history = useHistory();
    const classes = useStyles();

    const [response, setResponse] = useState();
    const [snackbar, setSnackbar] = useState(false);
    const [snackType, setSnackType] = useState();

    const  dispatch = useDispatch();
    const Token = useSelector((state) => state.login.authToken);
  
    const onSubmit = (values) => {
      axios
        .post("/hamro/login", {
          values,
        })
        .then((response) => {
          setResponse(response.data.message);
          setSnackType(response.data.type);
          if (response.data.auth === true) {
            dispatch(userData(response.data.result));
            dispatch(authToken(response.data.token));
          }
        });
    };

    useEffect(async () => {
       await axios.get("/hamro/login").then((response) => {
        if (response.data.loggedIn === true && Token != null) {
          setSnackbar(true);
          setResponse(response.data.message);
          setSnackType(response.data.type);
          setTimeout(() => {
            history.push("/");
          }, 1500);
        }
      });
    }, []);

    const userAuthenticated = async () => {
      await axios
        .post("/isUserAuth")
        .then((response) => {
          response.data.auth === true &&
            setTimeout(() => {
              history.push("/");
            }, 1500);
        })
        .catch((err) => console.log(err));
  
      axios.defaults.headers.common["authorization"] = Token;
    };
  
    

    
  
    return (
        <div className={classes.background}>
        <Container className={classes.contactContainer}>
        <Typography variant="h4" style={{ textAlign: "center", color: "#c28285" }}>
        <FcHome  style={{margin:'0 0.5rem -0.2rem 0' }} />Hamro Workshop
        </Typography>
        <Box className={classes.box}>
          <Paper className={classes.paper}>
          <Link  to="/hamro/signup" className={classes.link}>
          <Typography
            align="right"
            type="button"
            variant="body2"
            className={classes.signIn}
          >
            Create an account
          </Typography>
        </Link>
        

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={onSubmit}
            >
              {({ errors, handleChange, touched, values, setFieldValue }) => (
                <Form>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        label="Your Email"
                        size="small"
                        color="secondary"
                        fullWidth
                        name="email"
                        type="email"
                        id="email"
                        
                        error={errors.email && touched.email}
                        onChange={handleChange}
                        helperText={
                          errors.email && touched.email ? (
                            <Typography style={{ color: "#f5f5f5" }}>
                              {errors.email}
                            </Typography>
                          ) : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {" "}
                      <TextField
                        label="Password"
                        size="small"
                        color="secondary"
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        error={errors.password && touched.password}
                        helperText={
                          errors.password && touched.password ? (
                            <Typography style={{ color: "#f5f5f5" }}>
                              {errors.password}
                            </Typography>
                          ) : null
                        }
                      />
                    </Grid>
                    
                  </Grid>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      size="large"
                      className={classes.submitBtn}
                      onClick={() => {
                        userAuthenticated();
                        setSnackbar(true);
                      }}
                    >
                      Login
                    </Button>
                    
                  </Box>
                </Form>
              )}
            </Formik>
  
            <hr style={{ backgroundColor: "white" }} />
            <Box textAlign= 'center'><GoogleLog  /></Box>
          </Paper>
          
          
        </Box>
      </Container>
        </div>
      
    );
  }
  
  export default Login;
  