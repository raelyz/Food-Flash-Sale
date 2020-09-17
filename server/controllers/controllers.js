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
            // Add conditional statement in App.js, where if App.js received something render the timeline page instead using the cookies
                response.send({
                    userId: response.cookie.user_id,
                    userName: response.cookie.username
                })
            } else {
            // If App.js receives nothing, then will just render the landing page
                response.send({})
            }
        }
    }

    let getUserLoginDetails=(request,response)=> {
        let values = [ request.body.username, request.body.email, sha256(`${request.body.password}`) ]
            db.poolRoutes.getUserLoginDetailsFX(values, (err,results)=> {
                // If username/password does not match with the DB|| username < 1 characters long || password < 1 characters long || email < 1 characters long
                if(results.rows.length === 0 || request.body.username === 0 || request.body.password === 0 || request.body.email === 0) {
                    response.send({})
                } else {
                    response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results.user_id).toString())}`))
                    response.cookie("reference", (`${sha256((results.user_id).toString())}`))
                    // UID means User ID UUN means User username
                    response.cookie("UID", results.user_id)
                    response.cookie("UUN", results.username)
                    response.send({
                        userId: results.user_id,
                        userName: results.username
                    })
                }
            })
    }
    let getMerchantLoginDetails=(request,response)=> {
        let values = [ request.body.name, request.body.email, sha256(`${request.body.password}`) ]
            db.poolRoutes.getMerchantLoginDetailsFX(values, (err,results)=> {
                if(results.rows.length === 0 || request.body.name === 0 || request.body.password === 0 || request.body.email === 0) {
                    response.send({})
                } else {
                    response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results.merchant_id).toString())}`))
                    response.cookie("reference", (`${sha256((results.merchant_id).toString())}`))
                    // UID means Merchant ID UUN means Merchant username
                    response.cookie("MID", results.merchant_id)
                    response.cookie("MUN", results.name)
                    response.send({
                        merchantId: results.merchant_id,
                        merchantUsername: results.name
                    })
                }
            })
    }


    let postUserDetails=(request,response)=> {
        let values = [ request.body.username,request.body.email ]
        // Query to check if the login details already exists
        db.poolRoutes.getUserDetailsFX(values, (err,results)=> {
            // If the username already exists render the same login page
            // If query returned nothing || if user registers with an empty username || if user register a password with no length
            // Add @ email check here
            if(results.length !== 0 || results.username.length == 0 || request.body.password.length == 0) {
                response.send({})
            } else {
                values.push(sha256(`${request.body.password}`));
                // If the username does not exists render the email input page and pass in object of user ID and user UN
                db.poolRoutes.insertUserDetailsFX(values, (err,results2)=> {
                    response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results2.user_id).toString())}`))
                    response.cookie("reference", (`${sha256((results2.user_id).toString())}`))
                    response.cookie("UID", results.user_id)
                    response.cookie("UUN", results.username)
                    response.send({
                        userId: results.user_id,
                        userName: results.username
                    })
                })
            }
        })
    }
    let postMerchantDetails=(request,response)=> {
        let values = [ request.body.name,request.body.email ]
        // Query to check if the login details already exists
        db.poolRoutes.getMerchantDetailsFX(values, (err,results)=> {
            // If the merchant username already exists render the same login page
            // If query returned nothing || if merchant registers with and empty name || if merchant register a password with no length
            if(results.length !== 0 || results.name.length == 0 || request.body.password.length == 0) {
                response.send({})
            } else {
                values.push(sha256(`${request.body.password}`));
                // If the username does not exists render the email input page and pass in object of merchant ID and merchant UN
                db.poolRoutes.insertMerchantDetailsFX(values, (err,results2)=> {
                    response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results2.merchant_id).toString())}`))
                    response.cookie("reference", (`${sha256((results2.merchant_id).toString())}`))
                    response.cookie("MID", results.merchant_id)
                    response.cookie("MUN", results.name)
                    response.send({
                        merchantId: results.merchant_id,
                        merchantUsername: results.name
                    })
                })
            }
        })
    }

    let logout=(request,response)=> {
        response.cookie("loggedIn", "")
        response.cookie("reference", "")
        response.cookie("UID", "")
        response.cookie("MID", "")
        response.cookie("UUD", "")
        response.cookie("MUD", "")
        // Clear all cookies and send empty object
        response.send({})
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

let postSubmitReceiptOrder = (request,response)=> {
    let checked= false;
    let checkValue =[request.body.listing_id];
    let values = [1,request.body.merchant_id]
    console.log(checkValue,"----this is from checkValue");
    db.poolRoutes.checkInventoryFX(checkValue,(err,result)=>{
        if(err){
            console.log("error at controllerCheckInventory----", err.message);
        } else{
            (result.rows[0].quantity > checkValue[0]? checked=true: checked=false)
            let inventoryQuantity = result.rows[0].quantity;
            console.log(checked)
            if(checked){
        db.poolRoutes.postSubmitReceiptFX(values,(err,res)=>{
        if(err){
            console.log("error at controllerSubmitReceipt----", err.message);
        } else{
            console.log(res.rows)
            let receipt_id = res.rows[0].receipt_id;
            let value = [receipt_id, request.body.listing_id,request.body.price,request.body.quantity,request.body.revenue];
            db.poolRoutes.postSubmitOrderFX(value,(err,ress)=>{
                if(err){
                    console.log(err.message,"---error at order")
                } else {
                    console.log(ress.rows)
                    let quantity = inventoryQuantity - request.body.quantity
                    let valuez = [quantity, request.body.listing_id]
                    db.poolRoutes.depleteInventoryFX(valuez,(err,rez)=>{
                        if(err){
                            console.log(err.message, "---error at updateinvenyory")
                        } else{
                            console.log(rez.rows)
                        }
                    })
                }
            })


        }
    })

    }
        }
    })

}


// handle payment failure!!!!!!!!!!! if payment fails, add back into inventory




  return {
    getHome,
    getTimeline,
    getIndivShop,

    getDashboardMerchant,
    getNewListing,
    getAllListing,
    getToggleListing,
    getEditListing,
    getUpdateListing,

    getUserLoginDetails,
    getMerchantLoginDetails,
    postUserDetails,
    postMerchantDetails,
    logout,
    postSubmitReceiptOrder

  };
}