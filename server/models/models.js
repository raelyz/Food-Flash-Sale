module.exports = (dbPoolInstance) => {
    let getUserLoginDetailsFX=(value,callback)=> {
        let query = `SELECT * FROM users WHERE username=$1 AND email=$2 AND password=$3`
        dbPoolInstance.query(query,value, (err,result)=> {
            if(err) {
                callback(err,null)
            } else {
                if(result.rows.length > 0) {
                    callback(null, result.rows[0])
                } else {
                    callback(null,null)
                }
            }
        })
    }
    let getMerchantLoginDetailsFX=(value,callback)=> {
        let query = `SELECT * FROM merchant WHERE name=$1 AND email=$2 AND password=$3`
        dbPoolInstance.query(query,value, (err,result)=> {
            if(err) {
                callback(err,null)
            } else {
                if(result.rows.length > 0) {
                    callback(null, result.rows[0])
                } else {
                    callback(null,null)
                }
            }
        })
    }
    let insertUserDetailsFX=(value,callback)=> {
        let query = `INSERT INTO user (username,email,password) VALUES ($1,$2,$3) RETURNING * `
        dbPoolInstance.query(query,value, (err,result)=> {
            if(err) {
                callback(err,null)
            } else {
                if(result.rows.length > 0) {
                    callback(null, result.rows[0])
                } else {
                    callback(null,null)
                }
            }
        })
    }
    let insertMerchantDetailsFX=(value,callback)=> {
        let query = `INSERT INTO merchant (name,email,password) VALUES ($1,$2,$3) RETURNING * `
        dbPoolInstance.query(query,value, (err,result)=> {
            if(err) {
                callback(err,null)
            } else {
                if(result.rows.length > 0) {
                    callback(null, result.rows[0])
                } else {
                    callback(null,null)
                }
            }
        })
    }
    let getUserDetailsFX=(value,callback)=> {
        let query = `SELECT * FROM users WHERE username=$1 AND email=$2`
        dbPoolInstance.query(query,value, (err,result)=> {
            if(err) {
                callback(err,null)
            } else {
                if(result.rows.length > 0) {
                    callback(null, result.rows[0])
                } else {
                    callback(null,null)
                }
            }
        })
    }

    let getMerchantDetailsFX=(value,callback)=> {
        let query = `SELECT * FROM merchant WHERE name=$1 AND email=$2`
        dbPoolInstance.query(query,value, (err,result)=> {
            if(err) {
                callback(err,null)
            } else {
                if(result.rows.length > 0) {
                    callback(null, result.rows[0])
                } else {
                    callback(null,null)
                }
            }
        })
    }

  return {
    getUserLoginDetailsFX,
    getMerchantLoginDetailsFX,

    insertUserDetailsFX,
    insertMerchantDetailsFX,

    getUserDetailsFX,
    getMerchantDetailsFX
  };
};