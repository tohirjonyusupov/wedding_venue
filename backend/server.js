const cors = require("cors");
// require("dotenv").config();
const express = require("express");
const app = express();

// const authRoutes = require("./routes/authRoutes");
// const studentRouter = require("./routes/ownerRoutes");
// const teacherRoutes = require("./routes/clientRoutes");
const adminRoute = require("./routes/adminRoutes");
// const authRoutes = require("./routes/authRoutes");
// const { authentication } = require("./middlewares/authentication");

app.use(cors());
app.use(express.json());

const PORT = 4000;

// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// })
// app.use("/", authRoutes);

// app.use(authentication);

app.use("/admin", adminRoute);
// app.use("/owner", studentRouter);
// app.use("/client", teacherRoutes);

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});