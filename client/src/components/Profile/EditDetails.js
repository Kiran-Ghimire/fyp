import React, { useState } from "react";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import useCustomForm from "../common/useCustomForm";

import PopUp from "../common/PopUp";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";

const validationSchema = Yup.object().shape({
  Username: Yup.string().required(),
});
export default function EditDetails({
  detailPopUp,
  setDetailPopUp,
  setSnackType,
  setSnackbar,
  setResponse,
}) {
  const [userId, setUserId] = useState(null);

  const { CustomTextField, CustomDatePicker } = useCustomForm();

  const userData = useSelector((state) => state.login.userData);

  const submitHandler = (values) => {
    axios.post("/updateUser", { values: values, id: userId }).then((res) => {
      console.log(res.data.type);
      console.log(res.data.message);

      setDetailPopUp(false);
      setSnackbar(true);
      setResponse(res.data.message);
      setSnackType(res.data.type);
    });
  };

  return (
    <div>
      <PopUp
        title="Personal Details"
        openPopup={detailPopUp}
        setOpenPopup={setDetailPopUp}
      >
        {userData &&
          userData.length > 0 &&
          userData.map((item) => (
            <Box width="21rem" key={item.User_ID}>
              <Formik
                initialValues={{
                  Username: item.User_Name,
                  
                }}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                {({ touched, errors, handleChange, values, setFieldValue }) => (
                  <Form>
                    <Grid container component="span" spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          Username
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomTextField
                          variant="standard"
                          value={values.User_Name}
                          name="Username"
                          type="text"
                          error={errors.User_Name && touched.User_Name}
                          onChange={handleChange}
                          errortext={errors.User_Name}
                        />
                      </Grid>
                      
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          Email
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          {item.Email}
                        </Typography>
                      </Grid>
                      
                     
                    </Grid>
                    <Box style={{ marginTop: "1.2rem" }}>
                      <Button
                        type="submit"
                        onClick={() => setUserId(item.User_ID)}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setDetailPopUp(false)}>
                        Cancel
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          ))}
      </PopUp>
    </div>
  );
}
