const sha256=require('js-sha256');
const path = require("path");
const clientBuildPath = path.join(__dirname, '../../client/build')

let SALT = "debuggod";
let reference = "";

module.exports = (db) => {
    let getHome = (request,response) => {
        if(!request.cookies['loggedIn']) {
            response.send({})
    } else {
        let reference = request.cookies['reference']
        let cookieValue = request.cookies['loggedIn']
        if(cookieValue === sha256(`true${SALT}-${reference}`)) {
            // Add conditional statement in App.js, where if App.js received something render the timeline page
                response.send({something: "Some data here"})
            } else {
                response.send("You are tempering");
            }
        }
        }
    let getLoginDetails=(request,response)=> {
        let params = [
        request.body.username,
        request.body.email,
        sha256(`${request.body.password}`)
        ]
        db.poolRoutes.getLoginCredentialsFX(params, (err,results)=> {
            // If username/password does not match with the DB|| username < 1 characters long || password < 1 characters long || email < 1 characters long
            if(results.rows.length === 0 || request.body.username === 0 || request.body.password === 0 || request.body.email === 0) {
                response.redirect("/");
            } else {
                response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results.rows[0].id).toString())}`))
                response.cookie("reference", (`${sha256((results.rows[0].id).toString())}`))
                db.poolRoutes.getKeywordDataFX([username], (err,data)=> {
                    globalDataVar = data.rows;
                })
                // REDIRECT TO HOME PAGE AND RENDER OUT EMIALS FROM SQL
                response.redirect('/emailinput')
            }
        })
    }

  return {
    Home,
    getLoginDetails
  };
}