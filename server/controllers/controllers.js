module.exports = (db) => {

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

  return {
    getHome,
    getDashboardMerchant,
    getNewListing,
    getAllListing,
    getToggleListing,
    getEditListing,
    getUpdateListing
  };
}