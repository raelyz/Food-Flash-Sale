/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {




let getAllConversationsUsers =(values,callback) =>{
    let query ="select * from match inner join dog on match.dog_id = dog.id where match.follower_user_id=$1 and liked =true";
    dbPoolInstance.query(query,values,(err,result)=>{
        callback(err,result)
    })
  }


  return {


    getAllConversationsUsers,





  };
};