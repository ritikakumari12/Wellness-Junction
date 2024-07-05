const jwt = require('jsonwebtoken')

//First retrived the JWT from the request header which is the "Authorization" header of the HTTP request
//request object, response object and next function
const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authorization"})

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Invalid Authorization"})
            
            //If the token is successfully verified, the payload of the JWT is extracted, 
            //and the req.user property is set to the user object obtained from the decoded JWT.
            req.user = user

            //Pass onto next middleware
            next()
        })

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = auth