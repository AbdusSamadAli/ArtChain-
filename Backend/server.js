const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const artworkRoutes = require('./routes/artworkRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const authRoutes =  require('./routes/authRoutes')
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE"],
    credentials: true, 
  })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();
app.use("/auth", authRoutes);
app.use('/api/certificate', certificateRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/artworks', artworkRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
