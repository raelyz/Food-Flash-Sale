const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const path = require("path"); //native node

const clientBuildPath = path.join(__dirname, '../client/build') // take one step back then go into client then go into build
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(clientBuildPath))

app.get("/", (request,response)=>{
     response.sendFile(path.join(clientBuildPath, '/index.html'));
})
app.get("*",(request,response)=>{
    response.sendFile(path.join(clientBuildPath, '/index.html'))
})

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});