import { Button } from "@material-ui/core";
import { Grid, Box, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import PopUp from "../common/PopUp";
import useCustomForm from "../common/useCustomForm";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../actions/index";
import { useHistory } from "react-router";

export default function useSettings() {
  const { CustomTextField } = useCustomForm();
  let history = useHistory();

  const ChangePassword = () => {
    return (
      <Formik>
        {({ errors, touched, handleChange }) => (
          <Form>
            <Box width="10rem">
              <Grid container>
                <Grid item xs={12}>
                  <CustomTextField
                    variant="standard"
                    label="Name from db"
                    name="prevPassword"
                    type="text"
                    error={errors.prevPassword && touched.prevPassword}
                    onChange={handleChange}
                    errortext={errors.prevPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    variant="standard"
                    label="Name from db"
                    name="prevPassword"
                    type="text"
                    error={errors.prevPassword && touched.prevPassword}
                    onChange={handleChange}
                    errortext={errors.prevPassword}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <CustomTextField
                    variant="standard"
                    label="Name from db"
                    name="prevPassword"
                    type="text"
                    error={errors.prevPassword && touched.prevPassword}
                    onChange={handleChange}
                    errortext={errors.prevPassword}
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };

  const DeleteAccount = (props) => {
    const { deletePopUp, setDeletePopUp, userId } = props;

    const dispatch = useDispatch();
    return (
      <PopUp
        title="Alert"
        openPopup={deletePopUp}
        setOpenPopup={setDeletePopUp}
      >
        <Box width="20rem">
          <Typography>
            Deleting your account will remove all the records from our database.
          </Typography>

          <Box style={{ marginTop: "1rem" }}>
            <Button
              onClick={() => {
                setDeletePopUp(false);
                dispatch(deleteAccount(userId));
                history.push("/");
              }}
            >
              <Typography color="error">Proceed</Typography>
            </Button>
            <Button>
              <Typography onClick={() => setDeletePopUp(false)}>
                Abort
              </Typography>
            </Button>
          </Box>
        </Box>
      </PopUp>
    );
  };

  return { ChangePassword, DeleteAccount };
}
