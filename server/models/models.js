const db = require("../db");

module.exports = (dbPoolInstance) => {
  let getUserLoginDetailsFX = (value, callback) => {
    let query = `SELECT * FROM users WHERE username=$1 AND password=$2`;
    dbPoolInstance.query(query, value, (err, result) => {
      callback(err, result);
    });
  };

  let getMerchantLoginDetailsFX = (value, callback) => {
    let query = `SELECT * FROM merchant WHERE name=$1 AND password=$2`;
    dbPoolInstance.query(query, value, (err, result) => {
      callback(err, result);
    });
  };

  let insertUserDetailsFX = (value, callback) => {
    let query = `INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING * `;
    dbPoolInstance.query(query, value, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows[0]);
        } else {
          callback(null, null);
        }
      }
    });
  };
  let insertMerchantDetailsFX = (value, callback) => {
    let query = `INSERT INTO merchant (name,email,address,uen,cuisine,latitude,longitude,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * `;
    dbPoolInstance.query(query, value, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows[0]);
        } else {
          callback(null, null);
        }
      }
    });
  };
  let getUserDetailsFX = (value, callback) => {
    let query = `SELECT * FROM users WHERE username=$1 OR email=$2`;
    dbPoolInstance.query(query, value, (err, result) => {
      callback(err, result);
    });
  };
  let getMerchantDetailsFX = (value, callback) => {
    // [request.body.name, request.body.email, address, request.body.uen, request.body.cuisine, request.body.latitude, request.body.longitude]
    let query = `SELECT * FROM merchant WHERE name=$1 OR email=$2 OR address=$3 OR uen=$4 AND latitude=$6 AND longitude =$7 AND cuisine=$5`;
    dbPoolInstance.query(query, value, (err, result) => {
      console.log(err);
      console.log(result);
      callback(err, result);
    });
  };
  // SELECT * FROM merchant WHERE name='3' OR email='3' OR address='3' OR uen='4' AND cuisine='5' AND lattitude=6 AND longtitude =7;
  let getLoginDetailsFX = (value, callback) => {
    let queryLoginDetails = `SELECT * FROM users WHERE username=$1,password=$2,email=$3`;
    dbPoolInstance.query(queryLoginDetails, value, (err, result) => {
      callback(err, result);
    });
  };

  let getTimelineFX = (callback) => {
    let query =
      "select * from merchant inner join listing on merchant.merchant_id = listing.merchant_id where live=true";
    dbPoolInstance.query(query, (err, result) => {
      // console.log(result.rows, "---from models")

      callback(err, result);
    });
  };

  // merchant.merchant_id = $1
  let getIndivShopFX = (values, callback) => {
    let query =
      "select * from listing inner join merchant on listing.merchant_id = merchant.merchant_id and listing.listing_id =$1";

    dbPoolInstance.query(query, values, (err, result) => {
      console.log(result, "---from modelsindiv shop");
      callback(err, result);
    });
  };

  let getDashboardMerchantFX = (values, callback) => {
    values = [1];
    let a =
      "SELECT * FROM  MERCHANT INNER JOIN ORDERS ON merchant.merchant_id =ORDERS.";
    let text = "SELECT * FROM ";
  };

  let getNewListingFX = (values, callback) => {
    let query = `INSERT INTO listing (item_name,unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,description,time_limit_min) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getNewListing Models`);
        callback(err, null);
      } else {
        callback(null, null);
      }
    });
  };

  let getAllListingFX = (values, callback) => {
    let query = `SELECT * FROM LISTING WHERE MERCHANT_ID = $1 `;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getAllListing Models`);
        callback(err, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let getToggleListingFX = (values, callback) => {
    let query = `update LISTING set live = $1, time = CURRENT_TIMESTAMP where listing_id = $2`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in gettogglelistingfx`);
        callback(err, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let getEditListingFX = (values, callback) => {
    let query = `SELECT * FROM LISTING where listing_id = $1`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in geteditlistingfx`);
        callback(err, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let getUpdateListingFX = (values, callback) => {
    let query = `update listing set item_name = $1, unit_price = $2, quantity = $3, price_ceiling =$4, price_floor = $5, category_id = $6, description = $7 where listing_id = $8`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getUpdatListingFX`);
        callback(err, null);
      } else {
        callback(null, null);
      }
    });
  };

  let postSubmitReceiptFX = (values, callback) => {
    let query =
      "INSERT INTO receipt (user_id,merchant_id) VALUES($1,$2) RETURNING *";
    dbPoolInstance.query(query, values, (err, result) => {
      console.log(result, "---from models post submit receipt");
      callback(err, result);
    });
  };

  let postSubmitOrderFX = (value, callback) => {
    let query =
      "INSERT INTO orders (receipt_id, listing_id,price,quantity,revenue) VALUES($1,$2,$3,$4,$5) returning *";
    dbPoolInstance.query(query, value, (err, result) => {
      console.log(result, "---from models submit order");
      callback(err, result);
    });
  };

  let checkInventoryFX = (checkValue, callback) => {
    let query = "SELECT quantity from listing where listing_id = $1";
    dbPoolInstance.query(query, checkValue, (err, result) => {
      console.log(result, "---from models check inventory");
      callback(err, result);
    });
  };

  let depleteInventoryFX = (depletedValue, callback) => {
    let query =
      "UPDATE listing set quantity = $1 where listing_id =$2 RETURNING *";
    dbPoolInstance.query(query, depletedValue, (err, result) => {
      console.log(result, "---from models deplete inventory");
      callback(err, result);
    });
  };

  let getOrderHistoryFX = (values, callback) => {
    let query = `select * from receipt INNER JOIN merchant on receipt.merchant_id = merchant.merchant_id where user_id=$1 ORDER BY receipt_id ASC`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getorderhistoryfx`);
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    });
  };

  let getReceiptListingFX = (values, callback) => {
    let query = `select * from orders where receipt_id=$1`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getreceiptlistingfx`);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };

  let getMerchantOrdersFX = (values, callback) => {
    let query =
      "SELECT * from orders inner join listing on orders.listing_id =listing.listing_id where listing.merchant_id=$1";
    dbPoolInstance.query(query, values, (err, result) => {
      console.log(result, "---from models merchant orders");
      callback(err, result);
    });
  };

  let getRatingsFX = (values, callback) => {
    let query =
      "SELECT * from rating inner join listing on rating.listing_id =listing.listing_id where listing.merchant_id=$1";
    dbPoolInstance.query(query, values, (err, result) => {
      console.log(result, "---from models get ratings");
      callback(err, result);
    });
  };

  let getTidyUpListingFX = (value, callback) => {
    value.forEach((item) => {
      values = [false, item.listing_id];
      let query = `update LISTING set live = $1, time = CURRENT_TIMESTAMP where listing_id = $2`;
      dbPoolInstance.query(query, values, (err, result) => {});
    });
    callback(null, null);
  };

  let getDeletedListingFX = (callback) => {
    let query = `select * from merchant inner join listing on merchant.merchant_id = listing.merchant_id where live=false ORDER BY time desc limit 5`;
    dbPoolInstance.query(query, (err, result) => {
      if (err) {
        console.log(err, `error in gettogglelistingfx`);
        callback(err, null);
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let postUserRatingsFX = (values, callback) => {
    let query =
      "INSERT INTO rating (user_id,merchant_id,listing_id,rating_stars,rating_receipt_id) VALUES($1,$2,$3,$4,$5) returning * ";
    dbPoolInstance.query(query, values, (err, result) => {
      console.log(result, "---from models post ratings");
      callback(err, result);
    });
  };

  let getUserRatingsFX = (values, callback) => {
    let query =
      "SELECT * from (SELECT * from receipt left join (SELECT * FROM rating where rating.user_id =$1) as rated on receipt.receipt_id = rated.rating_receipt_id) as foo where receipt_id=$2";
    dbPoolInstance.query(query, values, (err, result) => {
      console.log(result, "---from models post ratings");
      callback(err, result);
    });
  };

  return {
    getDashboardMerchantFX,
    getNewListingFX,
    getAllListingFX,
    getToggleListingFX,
    getEditListingFX,
    getUpdateListingFX,
    getOrderHistoryFX,
    getLoginDetailsFX,
    getTimelineFX,
    getIndivShopFX,

    getReceiptListingFX,

    getUserLoginDetailsFX,
    getMerchantLoginDetailsFX,

    insertUserDetailsFX,
    insertMerchantDetailsFX,

    getUserDetailsFX,
    getMerchantDetailsFX,

    postSubmitReceiptFX,
    postSubmitOrderFX,

    checkInventoryFX,
    depleteInventoryFX,
    getMerchantOrdersFX,

    getRatingsFX,
    postUserRatingsFX,
    getUserRatingsFX,

    getTidyUpListingFX,
    getDeletedListingFX,
  };
};
