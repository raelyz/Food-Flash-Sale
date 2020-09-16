const db = require("../db");

module.exports = (dbPoolInstance) => {

  let getLoginDetailsFX=(value,callback)=> {
        let queryLoginDetails = `SELECT * FROM users WHERE username=$1,password=$2,email=$3`
        dbPoolInstance.query(queryLoginDetails,value, (err,result)=> {
            callback(err,result)
        })
    }


    let getTimelineFX =(callback) =>{
    let query ="select * from merchant inner join listing on merchant.merchant_id = listing.merchant_id where live=true";
    dbPoolInstance.query(query,(err,result)=>{
        console.log(result.rows,"---from models")
        callback(err,result)

    })
  }

  let getIndivShopFX  =(values,callback) =>{
    let query ="select * from listing where listing.merchant_id = $1";
    dbPoolInstance.query(query,values,(err,result)=>{
        console.log(result,"---from modelsindiv shop")
        callback(err,result)
    })
  }

  let getDashboardMerchantFX = (values, callback) => {
    values = [1,]
    let a = 'SELECT * FROM  MERCHANT INNER JOIN ORDERS ON merchant.merchant_id =ORDERS.'
    let text = 'SELECT * FROM '
  }

  let getNewListingFX = (values, callback) => {
    let query = `INSERT INTO listing (item_name,unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getNewMerchant Models`)
        callback(err, null)
      } else {
        callback(null, null)
      }
    })
  }


  let getAllListingFX = (values, callback) => {
    let query = `SELECT * FROM LISTING WHERE MERCHANT_ID = $1`
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getAllListing Models`)
        callback(err, null)
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows)
        } else {
          callback(null, null)
        }
      }
    })
  }

  let getToggleListingFX = (values, callback) => {
    let query = `update TABLE LISTING set live = $1 where listing_id = $2`
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in gettogglelistingfx`)
        callback(err, null)
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows)
        } else {
          callback(null, null)
        }
      }
    })
  }

  let getEditListingFX = (values, callback) => {
    let query = `SELECT * FROM LISTING where listing_id = $1`
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in geteditlistingfx`)
        callback(err, null)
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows)
        } else {
          callback(null, null)
        }
      }
    })
  }

  let getUpdateListingFX = (values, callback) => {
    let query = `update listing set item_name = $1, unit_price = $2, quantity = $3, price_ceiling =$4, price_floor = $5, category_id = $6, description = $8 where listing_id = $9`
    db.dbPoolInstance.query(query, values, (err, result) => {
      if (err) {
        console.log(err, `error in getUpdatListingFX`)
        callback(err, null)
      } else {
        callback(null, null)
      }
    })
  }


  return {
    getDashboardMerchantFX,
    getNewListingFX,
    getAllListingFX,
    getToggleListingFX,
    getEditListingFX,
    getUpdateListingFX,
    getLoginDetailsFX,
    getTimelineFX,
    getIndivShopFX
  };
};