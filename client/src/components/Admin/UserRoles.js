import {
  Typography,
  Button,
  Paper,
  Box,
  Container,
  InputAdornment,
  TextField,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import PopUp from "../common/PopUp";
import CustomSnackbar from "../common/CustomSnackbar";
import AdminDashboard from "./AdminDashboard";
import CustomToolbar from "../common/CustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { ListItem } from "@material-ui/core";
import {
  fetchStaffs,
  demoteStaff,
  fetchAdmin,
  demoteAdmin,
} from "../../actions/booking-actions";

export default function UserRoles() {
  //state for snackbar
  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  //popup for demoting staff
  const [deletePopUp, setDeletePopUp] = useState(false);

  //for popup
  const [openPopUp, setOpenPopUp] = useState(false);

  //to store role
  const [role, setRole] = useState("C");

  //for search box value
  const [value, setValue] = useState("");

  const [admin, setAdmin]= useState([])

  //data from backend
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [prevRole, setPrevRole] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/getAdmin").then(res => setAdmin(res.data.result))
    dispatch(fetchStaffs());
    dispatch(fetchAdmin());
  }, []);

  const staffsAvailable = useSelector((state) => state.booking.staffs);
  const adminsAvailable = useSelector((state) => state.booking.admins);

  const fetchUser = () => {
    axios.post("/admin/userRole", { email: value }).then((res) => {
      setUserData(res.data.result);
      setSnackbar(true);
      setResponse(res.data.message);
      setSnackType(res.data.type);
    });
    setTimeout(() => {
      dispatch(fetchStaffs());
      dispatch(fetchAdmin());
    }, 1000);
  };

  const updateUser = (id) => {
    axios.post("/updateRole", { id: id, role: role }).then((res) => {
      setSnackbar(true);
      setResponse(res.data.message);
      setSnackType(res.data.type);
      axios
        .post("/admin/userRole", { email: value })
        .then((res) => setUserData(res.data.result));
    });
    axios.get("/getAdmin").then(res => setAdmin(res.data.result))
    setOpenPopUp(false);
    setTimeout(() => {
      dispatch(fetchStaffs());
      dispatch(fetchAdmin());
    }, 1000);
  };
  const demoteAdmins = () => {
    setDeletePopUp(false);
    console.log(userId);
    dispatch(demoteAdmin(userId));
    setTimeout(() => {
      axios.get("/getAdmin").then(res => setAdmin(res.data.result))
      dispatch(fetchAdmin());
    }, 1000);
  };


  return (
    <AdminDashboard>
      {response && response.length > 0 && (
        <CustomSnackbar
          snackbarOpen={snackbar}
          setSnackbar={setSnackbar}
          snackType={snackType}
          snackContent={response}
        />
      )}
      <Typography variant="h6">User Roles</Typography>
      <Grid container justify="center">
        <Grid item xs={4}>
          <TextField
            label="Search User"
            variant="outlined"
            value={value}
            type="text"
            placeholder="Email Address"
            onChange={(e) => setValue(e.target.value)}
            size="small"
            color="secondary"
            fullWidth
            inputProps={{
              maxLength: 50,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsSearch />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => fetchUser()}
            style={{
              marginLeft: "2rem",
              width: "8rem",
              backgroundColor: "teal",
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {userData &&
        userData.length > 0 &&
        userData.map((item) => (
          <Box
            key={item.User_ID}
            marginTop="2rem"
            display="flex"
            justifyContent="center"
          >
            <Paper style={{ padding: "1.5rem", width: "29.2rem" }}>
              <Typography
                align="center"
                variant="h6"
                style={{ paddingBottom: "1rem" }}
              >
                USER DETAIL
              </Typography>
              <Grid container justify="center" style={{ paddingLeft: "4rem" }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Username</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    {item.User_Name} 
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Email id</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">{item.Email}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Role</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    {item.role === "A" ? (
                      <span>Admin</span>
                    )  : (
                      <span>Client</span>
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="center" marginTop="1.2rem">
                <Button
                  style={{ backgroundColor: "teal", width: "12rem" }}
                  onClick={() => setOpenPopUp(true)}
                >
                  <Typography>Change Role</Typography>
                </Button>
              </Box>
            </Paper>
            <PopUp
              title="Choose User Role"
              openPopup={openPopUp}
              setOpenPopup={setOpenPopUp}
            >
              <Box width="20rem">
                <RadioGroup
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="C"
                    control={<Radio />}
                    label="Client"
                  />
                  <FormControlLabel
                    value="A"
                    control={<Radio />}
                    label="Admin"
                  />
                  
                </RadioGroup>

                <Box style={{ marginTop: "1rem" }}>
                  <Button onClick={() => updateUser(item.User_ID)}>
                    <Typography>Proceed</Typography>
                  </Button>
                  <Button onClick={() => setOpenPopUp(false)}>
                    <Typography>Abort</Typography>
                  </Button>
                </Box>
              </Box>
            </PopUp>
          </Box>
        ))}
      <Grid container spacing={3} style={{ marginTop: "4rem" }}>
       

        <Grid item xs={12} md={6}>
          <Paper>
            {!admin > 0 && (
              <ListItem>
                <Typography variant="body2" style={{ padding: "0.5rem" }}>
                  No Records Available
                </Typography>
              </ListItem>
            )}
            <CustomToolbar variant="regular" title="Admins" />
            {admin.map((admin) => (
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body2">
                  {admin.User_Name} 
                </Typography>
                <Typography
                  type="button"
                  variant="body2"
                  color="error"
                  onClick={() => {
                    setUserId(admin.User_ID);
                    setDeletePopUp(true);
                  }}
                >
                  <AiFillDelete size="20" style={{ marginBottom: "0.4rem" }} />
                </Typography>
                <PopUp
                  title="Demote Admin"
                  openPopup={deletePopUp}
                  setOpenPopup={setDeletePopUp}
                >
                  <Typography color="error">
                    Note : Admin will be demoted to client and will be unable to
                    use features available for Admins.
                  </Typography>
                  <Box marginTop="1rem">
                    <Button onClick={() => demoteAdmins()}>Proceed</Button>
                    <Button onClick={() => setDeletePopUp(false)}>Abort</Button>
                  </Box>
                </PopUp>
              </ListItem>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </AdminDashboard>
  );
}
