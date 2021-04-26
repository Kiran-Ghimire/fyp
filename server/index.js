const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const router = require("./router");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(router);
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "User_ID",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const loginRouter = require("./routes/login");
app.use(loginRouter);

const registerRouter = require("./routes/register");
app.use(registerRouter);

const addServicesRouter = require("./routes/addServices");
app.use(addServicesRouter);

const updateServicesRouter = require("./routes/updateService");
app.use(updateServicesRouter);

const deleteServicesRouter = require("./routes/deleteItems");
app.use(deleteServicesRouter);

const userRoleRouter = require("./routes/userRole");
app.use(userRoleRouter);

const updateRoleRouter = require("./routes/updateRole");
app.use(updateRoleRouter);

const updateUserRouter = require("./routes/updateUser");
app.use(updateUserRouter);

const profileImageRouter = require("./routes/profileImage");
app.use(profileImageRouter);

const accountDeleteRouter = require("./routes/accountDelete");
app.use(accountDeleteRouter);

const demoteAdminRotuer = require("./routes/demoteAdmin");
app.use(demoteAdminRotuer);

const adminDetailsRouter = require("./routes/adminDetail");
app.use(adminDetailsRouter);

const bookAppointmentRouter = require("./routes/bookAppointment");
app.use(bookAppointmentRouter);

const appointmentDetailsRouter = require("./routes/appointmentDetails");
app.use(appointmentDetailsRouter);

const deleteCartRouter = require("./routes/deleteCart");
app.use(deleteCartRouter);

const paymentRouter = require("./routes/payment");
app.use(paymentRouter);

const confirmationRouter = require("./routes/emailUser");
app.use(confirmationRouter);

const userDetailRouter = require("./routes/userDetail");
app.use(userDetailRouter);

const contactFormEmailRouter = require("./routes/contactFormEmail");
app.use(contactFormEmailRouter);

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.json({
      auth: false,
      message: "Yo, we need a token, pls give it to us next time!",
    });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.post("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ auth: true, message: "Yo, you are authenticated congo" });
});

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// app.listen(3001, () => {
//   console.log("running server");
// });

server.listen(process.env.PORT || 3001, () =>
  console.log(`Server has started.`)
);
