const sha256 = require("js-sha256");
const path = require("path");
const clientBuildPath = path.join(__dirname, "../../client/build");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51HSOL8BBF6zBM44ruPfaaaUfYvLytW3Kvr3aYbx4aiV637zLiTO21r5Ik1Sew7mxxZqwWMaQjsSIRgq18GnR6gmy00EMJeg4NE"
);
let SALT = "debuggod";

let reference = "";
module.exports = (db) => {
  let getHome = (request, response) => {
    if (!request.cookies["loggedIn"]) {
      response.send({});
    } else {
      let reference = request.cookies["reference"];
      let cookieValue = request.cookies["loggedIn"];
      if (cookieValue === sha256(`true${SALT}-${reference}`)) {
        // Add conditional statement in App.js, where if App.js received something render the timeline page instead using the cookies

        if (request.cookies["UID"] && request.cookies["UUN"]) {
          response.send({
            "userId": request.cookies['UID'],
            "userName": request.cookies['UUN']
          })
        }
        if (request.cookies["MID"] && request.cookies["MUN"]) {
          response.send({
            "merchantId": request.cookies['MID'],
            "merchantUsername": request.cookies['MUN']
          })
        }
      }
    }
  };
  // WHEN AN EXISTING USER IS LOGGING IN
  let getUserLoginDetails = (request, response) => {
    let values = [request.body.username, sha256(`${request.body.password}`)];
    db.poolRoutes.getUserLoginDetailsFX(values, (err, results) => {
      // If username/password does not match with the DB
      if (results.rows.length === 0) {
        response.send({});
      } else {
        response.cookie(
          "loggedIn",
          sha256(`true${SALT}-${sha256(results.rows[0].user_id.toString())}`),
          { maxAge: 600000 }
        );
        response.cookie(
          "reference",
          `${sha256(results.rows[0].user_id.toString())}`,
          { maxAge: 600000 }
        );
        // UID means User ID UUN means User username
        response.cookie("UID", results.rows[0].user_id, { maxAge: 600000 });
        response.cookie("UUN", results.rows[0].username, { maxAge: 600000 });

        response.send({
          "userId": results.rows[0].user_id,
          "userName": results.rows[0].username,
        });
      }
    });
  };
  // WHEN AN EXISTING MERCHANT IS LOGGING IN
  let getMerchantLoginDetails = (request, response) => {
    let values = [request.body.name, sha256(`${request.body.password}`)];
    db.poolRoutes.getMerchantLoginDetailsFX(values, (err, results) => {
      if (results.rows.length === 0) {
        response.send({});
      } else {
        response.cookie(
          "loggedIn",
          sha256(
            `true${SALT}-${sha256(results.rows[0].merchant_id.toString())}`
          ),
          { maxAge: 600000 }
        );
        response.cookie(
          "reference",
          `${sha256(results.rows[0].merchant_id.toString())}`,
          { maxAge: 600000 }
        );
        // UID means Merchant ID UUN means Merchant username
        response.cookie("MID", results.rows[0].merchant_id, { maxAge: 600000 });
        response.cookie("MUN", results.rows[0].name, { maxAge: 600000 });

        response.send({
          "merchantId": results.rows[0].merchant_id,
          "merchantUsername": results.rows[0].name,
        });
      }
    });
  };

  // WHEN REGISTERING A NEW USER
  let postUserDetails = (request, response) => {
    let values = [request.body.username, request.body.email];
    // Query to check if the login details already exists
    db.poolRoutes.getUserDetailsFX(values, (err, results) => {
      // If the username already exists render the same login page
      // If query returned nothing || if user registers with an empty username || if user register a password with no length
      // Add @ email check here

      if (
        results.rows.length !== 0 ||
        request.body.username.length == 0 ||
        request.body.password.length == 0
      ) {
        response.send({});
      } else {
        values.push(sha256(`${request.body.password}`));
        // If the username does not exists render the email input page and pass in object of user ID and user UN
        db.poolRoutes.insertUserDetailsFX(values, (err, results2) => {
          response.cookie(
            "loggedIn",
            sha256(`true${SALT}-${sha256(results2.user_id.toString())}`),
            { maxAge: 600000 }
          );
          response.cookie(
            "reference",
            `${sha256(results2.user_id.toString())}`,
            { maxAge: 600000 }
          );
          response.cookie("UID", results2.user_id, { maxAge: 600000 });

          response.send({
            "userId": results2.user_id,
            "userName": results2.username,
          });
        });
      }
    });
  };
  // WHEN REGISTERING A NEW MERCHANT
  let postMerchantDetails = (request, response) => {
    let address = request.body.address + "!!!!" + request.body.postalCode
    let values = [request.body.name, request.body.email, address, request.body.uen]
    // Query to check if the login details already exists
    db.poolRoutes.getMerchantDetailsFX(values, (err, results) => {
      // If the merchant username already exists render the same login page
      // If query returned nothing || if merchant registers with and empty name || if merchant register a password with no length
      console.log(results);
      if (results.rows.length !== 0 || request.body.name.length == 0 || request.body.password.length == 0) {
        response.send({})
      } else {
        values.push(request.body.cuisine);
        values.push(request.body.latitude);
        values.push(request.body.longitude);
        values.push(sha256(`${request.body.password}`));
        // If the username does not exists render the email input page and pass in object of merchant ID and merchant UN
        db.poolRoutes.insertMerchantDetailsFX(values, (err, results2) => {
          console.log(results2);
          response.cookie('loggedIn', sha256(`true${SALT}-${sha256(results2.merchant_id.toString())}`), { maxAge: 600000 });
          response.cookie('reference', `${sha256(results2.merchant_id.toString())}`, { maxAge: 600000 });
          response.cookie('MID', results2.merchant_id, { maxAge: 600000 });
          response.cookie('MUN', results2.name, { maxAge: 600000 });
          response.send({
            "merchantId": results2.merchant_id,
            "merchantUsername": results2.name,
          });
        });
      }
    });
  };

  let logout = (request, response) => {
    response.cookie("UID", "", { maxAge: 1 })
    response.cookie("loggedIn", "", { maxAge: 1 })
    response.cookie("reference", "", { maxAge: 1 })
    response.cookie("MID", "", { maxAge: 1 })
    response.cookie("UUN", "", { maxAge: 1 })
    response.cookie("MUN", "", { maxAge: 1 })
    response.send({})
  }

  let getTimeline = (request, response) => {
    db.poolRoutes.getTimelineFX((err, result) => {
      if (err) {
        console.log("error at controllertimeline----", err.message);
      } else {
        let data = result.rows;
        // console.log(data, "--- hello from controller timeline")
        response.send(data);
      }
    });
  };

  let getDashboardMerchant = (request, response) => { };

  let getNewListing = (request, response) => {
    console.log(request.body);
    let {
      item_name,
      unit_price,
      quantity,
      price_ceiling,
      price_floor,
      category_id,
      description,
      time_limit_min,
      merchant_id,
    } = request.body;
    let values = [
      item_name,
      unit_price,
      quantity,
      quantity,
      price_ceiling,
      price_floor,
      category_id,
      merchant_id,
      description,
      time_limit_min
    ];
    db.poolRoutes.getNewListingFX(values, (error, result) => {
      if (error) {
        console.log(error, "error at getNewListing Controller");
      } else {
        response.send({})
      }
    });
  };

  let getAllListing = (request, response) => {
    let merchant_id = request.params.id;
    let values = [merchant_id];
    db.poolRoutes.getAllListingFX(values, (error, result) => {
      if (error) {
        console.log(error, "error at getAllListing Controller");
      } else {
        response.send(result);
      }
    });
  };

  let getToggleListing = (request, response) => {
    console.log(request.body, `this is important`);
    let { boolean, listing_id } = request.body;
    let values = [boolean, listing_id];

    db.poolRoutes.getToggleListingFX(values, (error, result) => {
      if (error) {
        console.log(error, `error at getActivateListing Controller`);
      } else {
        response.send("toggle successful");
      }
    });
  };

  let getEditListing = (request, response) => {
    let { listing_id } = request.body;
    let values = [listing_id];
    db.poolRoutes.getEditListingFX(values, (error, result) => {
      if (error) {
        console.log(error, `error at geteditlisting controller`);
      } else {
        response.send(result);
      }
    });
  };

  let getUpdateListing = (request, response) => {
    let {
      item_name,
      unit_price,
      quantity,
      price_ceiling,
      price_floor,
      category_id,
      merchant_id,
      description,
      time_limit_min,
      listing_id,
    } = request.body;
    let values = [
      item_name,
      unit_price,
      quantity,
      quantity,
      price_ceiling,
      price_floor,
      category_id,
      description,
      listing_id,
      time_limit_min
    ];
    //     console.log(values)
    db.poolRoutes.getUpdateListingFX(values, (error, result) => {
      if (error) {
        console.log(error, `erroratgetupdatelisting controlelr`);
      } else {
        response.send({})
      }
    });
  };

  let getOrderHistory = (request, response) => {
    //     console.log(request.params.id, `checking if its here`);
    let values = [request.params.id];
    db.poolRoutes.getOrderHistoryFX(values, (err, result) => {
      if (err) {
        console.log(err, "error at getorderhistory controller");
      } else {
        response.send(result);
      }
    });
  };

  let getIndivShop = (request, response) => {
    let values = [request.params.id];
    db.poolRoutes.getIndivShopFX(values, (err, result) => {
      if (err) {
        console.log("error at controllerindivshop----", err.message);
      } else {
        let data = result.rows;
        //         console.log(data, "--- hello from controllerindivShop");
        response.send(data);
      }
    });
  };

  let postSubmitReceiptOrder = (request, response) => {
    let checked = false;
    let checkValue = [request.body.order.listing_id];
    let quantity = request.body.order.quantity;
    let values = [request.body.order.user_id, request.body.order.merchant_id];
    console.log(values, `this is values`)
    console.log(checkValue, "----this is from checkValue");
    db.poolRoutes.checkInventoryFX(checkValue, (err, result) => {
      if (err) {
        console.log("error at controllerCheckInventory----", err.message);
      } else {
        //         console.log(quantity, "---quantity");
        result.rows[0].quantity >= quantity
          ? (checked = true)
          : (checked = false);
        let inventoryQuantity = result.rows[0].quantity;
        //         console.log(checked);
        if (checked) {
          db.poolRoutes.postSubmitReceiptFX(values, (err, res) => {
            if (err) {
              console.log("error at controllerSubmitReceipt----", err.message);
            } else {
              //               console.log(res.rows);
              let receipt_id = res.rows[0].receipt_id;
              let value = [
                receipt_id,
                request.body.order.listing_id,
                request.body.order.price,
                request.body.order.quantity,
                request.body.order.revenue,
              ];
              db.poolRoutes.postSubmitOrderFX(value, (err, ress) => {
                if (err) {
                  console.log(err.message, "---error at order");
                } else {
                  //                   console.log(ress.rows);
                  let quantity =
                    inventoryQuantity - request.body.order.quantity;
                  let valuez = [quantity, request.body.order.listing_id];
                  db.poolRoutes.depleteInventoryFX(valuez, (err, rez) => {
                    if (err) {
                      console.log(err.message, "---error at updateinvenyory");
                    } else {
                      let amount = parseInt(request.body.order.revenue) * 100;
                      let { id } = request.body.card;
                      //                       console.log(`authenticating`);
                      stripe.paymentIntents
                        .create({
                          amount: amount,
                          currency: "USD",
                          description: request.body.order.name,
                          payment_method: id,
                          // confirm: true
                        })
                        .then((res) => stripe.paymentIntents.confirm(res.id))
                        .then((res) => {
                          if (res.status === "succeeded") {
                            response.json({ status: "Payment Complete" });
                          } else {
                            //                             console.log(`after authenticating`);
                            let quantity = inventoryQuantity;
                            let valuez = [
                              quantity,
                              request.body.order.listing_id,
                            ];
                            db.poolRoutes.depleteInventoryFX(
                              valuez,
                              (err, runningoutofrez) => {
                                if (err) {
                                  console.log(
                                    err,
                                    `updating value after payment failure err`
                                  );
                                } else {
                                  console.log("payment failed");
                                  response.json({ status: "Payment Failed" });
                                }
                              }
                            );
                          }
                        });
                    }
                  });
                }
              });
            }
          });
        } else {
          response.json({ status: "Insufficient Inventory" });
        }
      }
    });
  };
  // .then(res => stripe.paymentIntents.confirm(res.id))

  // handle payment failure!!!!!!!!!!! if payment fails, add back into inventory

  let getReceiptListing = (request, response) => {
    let values = [request.body.receipt_id];
    db.poolRoutes.getReceiptListingFX(values, (err, result) => {
      if (err) {
        console.log(err, `err at getreceiptlisting controller`);
      } else {
        response.json(result.rows);
      }
    });
  };

  let getMerchantOrders = (request, response) => {
    let values = [request.params.id];

    db.poolRoutes.getMerchantOrdersFX(values, (err, result) => {
      if (err) {
        console.log(err, `err at getMerchant Orderscontroller`);
      } else {
        response.json(result.rows);
      }
    });
  };

  let helpme = (request, response) => {
    geoCoder.geocode("161056");
    response.send("help la");
  };

  let getRatings = (request, response) => {
    let values = [request.params.id];
    db.poolRoutes.getRatingsFX(values, (err, result) => {
      if (err) {
        console.log(err, `err at getRatings Orderscontroller`);
      } else {
        response.json(result.rows);
      }
    });
  };

  let getTidyUpListing = (request, response) => {
    console.log(request.body, `this is important`);
    let { toBeDeleted } = request.body;
    let values = toBeDeleted;
    db.poolRoutes.getTidyUpListingFX(values, (error, result) => {
      if (error) {
        console.log(error, `error at getActivateListing Controller`);
      } else {
        response.send("deletion successful");
      }
    });
  };

  let getDeletedListing = (request, response) => {
    db.poolRoutes.getDeletedListingFX((error, result) => {
      if (error) {
        console.log(error, `error at getActivateListing Controller`);
      } else {
        response.json(result);
      }
    });
  };

  let postUserRatings = (request, response) => {
    let {
      user_id,
      merchant_id,
      listing_id,
      rating_stars,
      rating_receipt_id,
    } = request.body;

    let values = [
      user_id,
      merchant_id,
      listing_id,
      rating_stars,
      rating_receipt_id,
    ];
    db.poolRoutes.postUserRatingsFX(values, (err, result) => {
      if (err) {
        console.log(err, `err at postRatings Orderscontroller`);
      } else {
        console.log("success!");
        response.json(result.rows);
      }
    });
  };
  let getUserRatings = (request, response) => {
    let { userid, receiptid } = request.params;
    let values = [userid, receiptid];
    db.poolRoutes.getUserRatingsFX(values, (err, result) => {
      if (err) {
        console.log(err, `err at gettUserRatings Orderscontroller`);
      } else {
        response.json(result.rows);
      }
    });
  };

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
    getOrderHistory,
    getReceiptListing,
    helpme,

    getUserLoginDetails,
    getMerchantLoginDetails,
    postUserDetails,
    postMerchantDetails,
    logout,
    postSubmitReceiptOrder,
    getMerchantOrders,

    getRatings,
    postUserRatings,
    getUserRatings,

    getTidyUpListing,
    getDeletedListing,
  };
};
