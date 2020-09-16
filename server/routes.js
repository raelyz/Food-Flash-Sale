module.exports = (app, allModels) => {

  const controllerCallbacks = require('./controllers/controllers')(allModels);

  // app.get('/home', controllerCallbacks.Home);
  app.get('/dashboard/merchant', controllerCallbacks.getDashboardMerchant)
  app.post('/newListing', controllerCallbacks.getNewListing)
  app.get('/all/listing', controllerCallbacks.getAllListing)
  app.post('/togglelisting', controllerCallbacks.getToggleListing)
  app.get('/editlisting', controllerCallbacks.getEditListing)
  app.post('/editlisting', controllerCallbacks.getUpdateListing)
};