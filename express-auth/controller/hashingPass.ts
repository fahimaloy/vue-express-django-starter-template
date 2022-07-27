const crypto = require('crypto')
const salt = process.env.SALT
export const hashPwd = (pwd)=>{
    var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(pwd).digest('hex');
};

