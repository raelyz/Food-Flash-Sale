module.exports = (db) => {

let Home = (request,response) => {
    response.send("Working")
}


let getTimeline = (request,response)=> {

    db.poolRoutes.getTimelineFX((err,result)=>{
        if(err){
            console.log("error at controllertimeline----", err.message);
        } else{
            let data = result.rows;
            console.log(data,"--- hello from controller timeline")
            response.send(data)
        }
        })
}

let getIndivShop = (request,response)=> {
    let values = [request.params.id];
    db.poolRoutes.getIndivShopFX(values,(err,result)=>{
        if(err){
            console.log("error at controllerindivshop----", err.message);
        } else{
            let data = result.rows;
            console.log(data,"--- hello from controllerindivShop")
            response.send(data)
        }
        })
}




  return {
    Home,
    getTimeline,
    getIndivShop,

  };
}