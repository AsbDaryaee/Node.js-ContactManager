const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const contactsRouter = require("./router/contacts");
const usersRouter = require("./router/users");
const errorHandler = require("./middlewares/errorHander");
const connectDB = require("./database/connectDB");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1", usersRouter);

// Always add errorHandler at the bottom of the other middlewares
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`---- Server is listening on port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
