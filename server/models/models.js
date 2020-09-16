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



   
  return {
    getLoginDetailsFX,
    getTimelineFX,
    getIndivShopFX

  };
};