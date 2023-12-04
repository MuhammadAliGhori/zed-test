const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./connect");
const cors = require("cors");
const updatedRoutes = require("./routes");

const app = express();
const PORT = 8000;

const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')));




// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", updatedRoutes);

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://zedapp:zedapp@cluster0.nt0qqvj.mongodb.net/zedapp?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

start();
