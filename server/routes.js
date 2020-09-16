module.exports = (app, allModels) => {

  const controllerCallbacks = require('./controllers/controllers')(allModels);


  app.get("/home", controllerCallbacks.getHome);

  app.get("/home/login/user", controllerCallbacks.getUserLoginDetails);
  app.get("/home/login/merchant", controllerCallbacks.getMerchantLoginDetails);

  app.post("/home/register/user", controllerCallbacks.postUserDetails);
  app.post("/home/register/merchant", controllerCallbacks.postMerchantDetails);

  app.get("/logout", controllerCallbacks.logout)

  app.get('/dashboard/merchant', controllerCallbacks.getDashboardMerchant)
  app.post('/newListing', controllerCallbacks.getNewListing)
  app.get('/all/listing', controllerCallbacks.getAllListing)
  app.post('/togglelisting', controllerCallbacks.getToggleListing)
  app.get('/editlisting', controllerCallbacks.getEditListing)
  app.post('/editlisting', controllerCallbacks.getUpdateListing)
  app.get('/orderhistory', controllerCallbacks.getOrderHistory)
  //get timeline for users to see all merchants
  app.get('/timeline', controllerCallbacks.getTimeline)
  //get indiv shop for users : all listings in merchant
  app.get('/indivshop/:id', controllerCallbacks.getIndivShop)


};