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

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
