const express = require("express");
const path = require("path");
require("dotenv").config();
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const PORT = process.env.PORT;
const app = express();

// custom middleware logger
app.use(logger);

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

// build-in middleware for static files
app.use("/", express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/register", require("./routes/register"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

// all
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      err: "404 Not Found",
    });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log("Server running on port:", PORT));
