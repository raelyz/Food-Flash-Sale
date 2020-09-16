module.exports = (app, allModels) => {

  const controllerCallbacks = require('./controllers/controllers')(allModels);

  app.get('/', controllerCallbacks.Home);
  //get timeline for users to see all merchants
  app.get('/timeline', controllerCallbacks.getTimeline)
  //get indiv shop for users : all listings in merchant
  app.get('/indivshop/:id',controllerCallbacks.getIndivShop)
};