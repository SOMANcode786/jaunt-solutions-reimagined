const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use(
  cors({
    origin: ["https://jauntsolutions.com", "https://www.jauntsolutions.com", "http://localhost:8080", "http://localhost:8081"],
    credentials: true,
  }),
);

// Root route
app.get("/", (req, res) => {
  res.send("Jaunt Solutions API is running...");
});
app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
