module.exports = (app, allModels) => {

  const controllerCallbacks = require('./controllers/controllers')(allModels);

    app.get("/home", controllerCallbacks.getHome);

    app.get("/home/login/user", controllerCallbacks.getUserLoginDetails);
    app.get("/home/login/merchant", controllerCallbacks.getMerchantLoginDetails);

    app.post("/home/register/user", controllerCallbacks.postUserDetails);
    app.post("/home/register/merchant", controllerCallbacks.postMerchantDetails);

    app.get("/logout", controllerCallbacks.logout)
};