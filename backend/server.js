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

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

const dirname = path.resolve();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at \"http://localhost:${PORT}\"`);
});
