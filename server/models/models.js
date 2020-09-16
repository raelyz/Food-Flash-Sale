module.exports = (dbPoolInstance) => {
    let getLoginDetailsFX=(value,callback)=> {
        let queryLoginDetails = `SELECT * FROM users WHERE username=$1,password=$2,email=$3`
        dbPoolInstance.query(queryLoginDetails,value, (err,result)=> {
            callback(err,result)
        })
    }
  return {
    getLoginDetailsFX
  };
};