module.exports = (app, allModels) => {




  // require the controller
  const puppyControllerCallbacks = require('./controllers/controllers')(allModels);

  app.get('/', puppyControllerCallbacks.getHome);
  app.get('/login/user', puppyControllerCallbacks.logIn);


};