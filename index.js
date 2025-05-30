const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const notesRoute = require("./routes/notesRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server is Running on port 5000"));
  })
  .catch((error) => console.log(error));
