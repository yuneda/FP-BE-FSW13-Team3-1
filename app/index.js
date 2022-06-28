const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("../config/routers");
const cors = require("cors");

// const publicDir = path.join(__dirname, "../public");
// const viewsDir = path.join(__dirname, "./views");
const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install View Engine */
// app.set("views", viewsDir);
// app.set("view engine", "ejs");

/** Set Public Directory */
// app.use(express.static(publicDir));

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(cors());

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


var allowedOrigins = ['http://localhost:3000',
  'https://secondhand-lilac.vercel.app/'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


// app.options('*', cors());

// app.use(cors({origin: '*'}));


/** Install Router */
app.use(router);

module.exports = app;
