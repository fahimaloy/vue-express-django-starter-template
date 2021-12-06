const JWT = require('jsonwebtoken')
require('dotenv')
const isAuthenticated = (req,res,next)=>{
  // Getting JWT from Cookies
  let jwtToken:string = ''
  let i: number
  try{
      
      let cookies = req.headers.cookie.split('; ')
      for (i = 0; i < cookies.length; i++) {
          if (cookies[i].startsWith('jwt') != false) {
              jwtToken = cookies[i].split('=')[1]
            }
        }
        if (jwtToken != '') {
            const jwtData = JWT.verify(jwtToken, process.env.JWT_SECRET)
            const { username, id } = jwtData
            req.id = id
            next()
        }
        
    }
    catch{
        res.send("Not Authenticated")
        next("Authentication Failure")
    }
}
module.exports = isAuthenticated