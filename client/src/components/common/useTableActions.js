import { Box, Grid, Typography, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import PopUp from "./PopUp";

import { Form, Formik } from "formik";
import useCustomForm from "./useCustomForm";
import ImageUploader from "./ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  fetchServices,
  updateService,
} from "../../actions/booking-actions";

import axios from "axios";

export default function useTableActions() {
  const { CustomTextField } = useCustomForm();
  const dispatch = useDispatch();
  const updatedService = useSelector((state) => state.booking.services);
  //   const updatedProduct = useSelector((state) => state.store.products);

  const EditItem = (props) => {
    const {
      editPopUp,
      setEditPopUp,
      item,
      imagePath,
      route,
      setRecords,
      setIsLoading,
    } = props;

    const onSubmit = (values) => {
      setIsLoading(true);
      // console.log(values.image);
      console.log(values.image);
      let image_value = values.image === null ? "old" : values.image;
      let data = new FormData();
      data.append("services_name", values.name);
      data.append("services_price", values.price);
      data.append("services_description", values.description);
      data.append("services_id", item.services_id);
      data.append("image", image_value);

      setEditPopUp(false);

      if (route === "updateService") {
        // setRecords(updatedService);
        axios.post("/updateService", data);
        // .then((res) => dispatch(updateService()));
        // dispatch(fetchServices());
        axios.get("/addServices").then((res) => {
          setRecords(res.data.result);
        });
        setTimeout(() => {
          setIsLoading(false);
          //  setRecords(updatedService);
        }, 1500);
      }
    };
    return (
      <PopUp
        title="Edit Data"
        openPopup={editPopUp}
        setOpenPopup={setEditPopUp}
      >
        <Box width="26rem">
          <Formik
            initialValues={{
              name: item.services_name,
              price: item.services_price,
              description: item.services_description,
              image: null,
            }}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, values, setFieldValue }) => (
              <Form>
                <Grid container spacing={1} component="span">
                  <Grid item xs={4}>
                    <Typography>Name</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      name="name"
                      variant="standard"
                      value={values.name}
                      type="text"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      name="price"
                      variant="standard"
                      value={values.price}
                      type="number"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Description</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      name="description"
                      variant="standard"
                      multiline
                      value={values.description}
                      type="text"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageUploader
                      prevImageValue={`${imagePath}/${item.image}`}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>

                  <Box display="flex">
                    <Button type="submit">Save</Button>
                    <Button onClick={() => setEditPopUp(false)}>Cancel</Button>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </PopUp>
    );
  };

  const DeleteItem = (props) => {
    const {
      DeletePopUp,
      setDeletePopUp,
      item,
      route,
      setRecords,
      setIsLoading,
    } = props;

    //to delete selected row
    const DeleteData = (item) => {
      setDeletePopUp(false);
      setIsLoading(true);
      if (route === "deleteService") {
        dispatch(deleteService(item));
        axios.get("/addServices").then((res) => setRecords(res.data.result));
        setTimeout(() => {
          setIsLoading(false);
          //  setRecords(updatedService);
        }, 1500);
        // dispatch(fetchServices());
      }
    };

    return (
      <PopUp
        title="Alert"
        openPopup={DeletePopUp}
        setOpenPopup={setDeletePopUp}
      >
        <Box width="20rem">
          <Typography>
            Deleting this item will remove its all records from our database.
          </Typography>

          <Box style={{ marginTop: "1rem" }}>
            <Button>
              <Typography color="error" onClick={() => DeleteData(item)}>
                Proceed
              </Typography>
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

  return { DeleteItem, EditItem };
}
