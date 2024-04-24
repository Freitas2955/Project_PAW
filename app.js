var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/////////////////
var multer  = require('multer');
var cors  = require('cors');
var bodyParser = require('body-parser');
////////////////

var mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var employeesRouter = require("./routes/employees");
var entitiesRouter = require("./routes/entities");
var donatorsRouter = require("./routes/donators");
var donationsRouter = require("./routes/donations");
var pointsRouter = require("./routes/points");
var partnersRouter = require("./routes/partners");

var app = express();



///////////////////////
// Multer storage options
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'tmp/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

// init multer package on express to receive files
app.use(upload.single('file'));

app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.use(cors());

// view engine setup for ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
////////////////////////






// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/employees", employeesRouter);
app.use("/entities", entitiesRouter);
app.use("/donators", donatorsRouter);
app.use("/donations", donationsRouter);
app.use("/points", pointsRouter);
app.use("/partners", partnersRouter);

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
  res.render("error");
});

module.exports = app;
