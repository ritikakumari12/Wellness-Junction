//Use for admin previlege
const Users = require('../models/userModel')

//request object, response object and next function
const authAdmin = async (req, res, next) => {
    try {
        //req value is set by our previous authentication, that is in auth.js file(res.user = user)
        //Containes user's ID extracted from JWT

        //get User information by Id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0)
            return res.status(400).json({msg: "Admin resources access denied."})
        
        //Pass control to next middleware
        next()
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = authAdmin
