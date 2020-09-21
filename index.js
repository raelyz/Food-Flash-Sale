const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const path = require("path"); //native node


const clientBuildPath = path.join(__dirname, '/client/build') // take one step back then go into client then go into build
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

//is we in production?
if (process.env.NODE_ENV === "production") {
  //serve static content
  app.use(express.static(clientBuildPath))

}




app.use(cookieParser())

const allModels = require('./db');

const setRoutesFunction = require('./routes');

setRoutesFunction(app, allModels);


app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});