const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");
// const userRoute=require("./router/user")
const itemRouter = require("../src/router/item");
const authRoutes = require("./router/authRouter");
const userRoutes = require("./router/userRouter");
const orderRouter=require("./router/order");
const favRouter = require("./router/fav.js");
const commentRouter = require("./router/comments.js");


const app = express();
app.get("/", (req, res) => {
  res.send("Home");
});

app.use(cors("*"));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(userRoute);
app.use(orderRouter)
app.use(itemRouter)
app.use(authRoutes)
app.use(userRoutes)
app.use(favRouter)
app.use(commentRouter)


// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
    server: app,
    startup: (port) => {
      app.listen(port, () => {
        console.log(`Server Up on ${port}`);
      });
    },
  };