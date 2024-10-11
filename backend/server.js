const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./auth.js");

const connectDB = require("./config/db.js");

const productRoutes = require("./routes/product.route.js");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");

dotenv.config();

const app = express();

// Cookie session middleware
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS to only allow requests from the frontend and only specific methods
app.use(
  cors({
    origin: "https://mern-tutorial-yzc5.onrender.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// the hosting port on the computer
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

const dirname = path.resolve();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
  app.use(express.static(path.join(dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at \"http://localhost:${PORT}\"`);
});
