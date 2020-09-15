module.exports = (app, allModels) => {

  const controllerCallbacks = require('./controllers/controllers')(allModels);

  app.get('/', controllerCallbacks.Home);
};