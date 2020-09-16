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

let getTimeline = (request,response)=> {

    db.poolRoutes.getTimelineFX((err,result)=>{
        if(err){
            console.log("error at controllertimeline----", err.message);
        } else{
            let data = result.rows;
            console.log(data,"--- hello from controller timeline")
            response.send(data)
        }
        })
}

  let getHome = (request, response) => {
    response.send("Working")
  }

  let getDashboardMerchant = (request, response) => {
  }

  let getNewListing = (request, response) => {
    let { name, pw } = request.body
    let values = [name, pw]
    db.poolRoutes.getNewListingFX(values, (error, result) => {
      if (error) {
        console.log(error, 'error at getNewMerchant Controller')
      } else {
        response.send("registration successful!")
      }
    })
  }

  let getAllListing = (request, response) => {
    let { merchant_id } = request.cookies
    let values = [merchant_id]
    db.poolRoutes.getAllListingFX(values, (error, result) => {
      if (error) {
        console.log(error, 'error at getAllListing Controller')
      } else {
        response.send(result)
      }
    })
  }

  let getToggleListing = (request, response) => {
    let { toggle, listing_id } = request.body
    let values = [toggle, listing_id]
    db.poolRoutes.getToggleListingFX(values, (error, result) => {
      if (error) {
        console.log(error, `error at getActivateListing Controller`)
      } else {
        response.send("toggle successful")
      }
    })
  }

  let getEditListing = (request, response) => {
    let { listing_id } = request.body
    let values = [listing_id]
    db.poolRoutes.getEditListingFX(values, (error, result) => {
      if (error) {
        console.log(error, `error at geteditlisting controller`)
      } else {
        response.send(result)
      }
    })
  }

  let getUpdateListing = (request, response) => {
    let { item_name, unit_price, quantity, price_ceiling, price_floor, category_id, merchant_id, description, time_limit_min, live, listing_id } = request.body
    let values = [item_name, unit_price, quantity, price_ceiling, price_floor, category_id, merchant_id, description, time_limit_min, live, listing_id]
    db.poolRoutes.getUpdateListingFX(values, (error, result) => {
      if (error) {
        console.log(error, `erroratgetupdatelisting controlelr`)
      } else {
        response.send("update successful!")
      }
    })
  }

let getIndivShop = (request,response)=> {
    let values = [request.params.id];
    db.poolRoutes.getIndivShopFX(values,(err,result)=>{
        if(err){
            console.log("error at controllerindivshop----", err.message);
        } else{
            let data = result.rows;
            console.log(data,"--- hello from controllerindivShop")
            response.send(data)
        }
        })
}




  return {
    getHome,
    getLoginDetails,
    getTimeline,
    getIndivShop,
    getDashboardMerchant,
    getNewListing,
    getAllListing,
    getToggleListing,
    getEditListing,
    getUpdateListing


  };
}