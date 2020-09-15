const SALT = "bananas are delicious";
const sha256 =require('js-sha256');


module.exports = (db) => {





  let getHome  = (request, response) => {
  // send response with some data (a string)
    response.render('puppy/index')

};

  let logIn = (request, response) => {
    let authUser = request.cookies['authUser'];
    if(!authUser){
    response.render('puppy/login')
} else {
    response.redirect('/home')
}
};

let postLogIn = (request, response) => {
    let values = [request.body.username];
    let password = request.body.password;
    let hash = sha256(password)
    db.puppy.postLogin(values,(err,result) =>{
        if(err){
            response.send("This username does not exist!")
            console.log(err.message)
        } else {
            let userInfo = result.rows[0];
            let dbPassword = sha256(result.rows[0].password);
            if(dbPassword === hash){
                let auth = sha256(userInfo.id+SALT);
                let authCookie = response.cookie("authUser",auth, { maxAge: 900000});

            let sessionid = userInfo.id;
            let userName = userInfo.username;
            let loginCookie = response.cookie("session",sessionid, { maxAge: 900000});
            let userCookie = response.cookie("userInfo",userName, { maxAge: 900000});
            response.redirect("/home")

            } else {
                response.send('Oh no your login attempt failed. <a href="/"> try again?</a>')
            }

        }
    })
}



let logout  = (request,response)=> {
    response.clearCookie('authOrg');
    response.clearCookie('authUser');
    response.clearCookie('session');
    response.clearCookie('userInfo');
    response.clearCookie('orgInfo');
    response.clearCookie('sessionOrg')
    response.redirect('/');
}




  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {

    getOrgMatches,
    getMessages,
    postMessages,
    getMessagesUser,
    postMessagesUser,
    getAllConversationsUser,
    logout



    // postFollowers

  };
}