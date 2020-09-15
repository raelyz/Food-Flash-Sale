const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const path = require("path"); //native node

//process.env
//process.env.NODE_ENV => indicate whether our app is in production or not. will either return PRODUCTION or undefined

//middleware
app.use(cors());
app.use(express.json()); //req.body

// app.use(express.static(path.join(__dirname,"client/build")))
app.use(express.static("./client/build"))

if(process.env.NODE_ENV==="production"){
    // server static content
    //npm run build
    app.use(express.static(path.join(__dirname,"client/build")))
}

//__dirname is the location where index.js is running in
//ROUTES//

//create a todo
//ROUTES
/**
 * ===================================
 * ===================================
 * Routes
 * ===================================
 * ===================================
 */

// get the thing that contains all the routes
const setRoutesFunction = require('./routes');

// call it and pass in the "app" so that we can set routes on it (also models)
setRoutesFunction(app, allModels);





//catch ALL method which catches all routes we havent defined. must put at bottom

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client/build/index.html"))
})

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});