require("dotenv").config();

const whiteList = [process.env.ALLOWED_URL];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccesstatus: 200,
};

module.exports = corsOptions;
