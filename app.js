const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//
require("dotenv").config();
require("./config/passport")(passport); // Load passport configuration
require("./db/index"); // Load database configuration

app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "dist/portfolio")));
app.use(require("./config/morgan"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      conString:
        "pg://" +
        "postgres" +
        ":" +
        "" +
        "@" +
        "localhost" +
        "/" +
        process.env.DB_NAME,
    }),
    name: "sqlserver.sid",
    secret: "1some2THING3that4IT5is6SECRET",
    resave: true,
    autoreconnect: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));
// app.get("*", (req, res) => {
// if( context.Response.StatusCode == 404 && !Path.HasExtension( context.Request.Path.Value ) ) {
//   context.Request.Path = "/index.html";
//   await next();
// }
// return res.redirect("/");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  const dictionary = require("./utils/dictionary.json");
  const lang = dictionary.language;

  if (lang !== "en") {
    const error_in_dictionary = Object.entries(dictionary[lang].words).find(
      (el) => el[0] === err.message
    );
    if (error_in_dictionary) err.message = error_in_dictionary[1];
  }

  res.json({ name: err.name, message: err.message });
});

module.exports = app;
