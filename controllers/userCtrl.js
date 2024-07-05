const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters long."})
            
            //Password encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })
            
            //save mongodb
            await newUser.save()

            //create jsonwebtoken to authentication
            const payload = { id: newUser._id};
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
              expiresIn: '1d',
            });

            //returns the token
            res.json({token})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({msg: "User does not exists."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})
            
            //It takes the payload object and creates a JWT by signing it with secret key 
            const payload = { id: user._id};
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
              expiresIn: '1d',
            });
            
            //returns the token
            res.json({token})

        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    //
    verifiedToken: (req, res) => {
        try {
          // token is contained in Header
          const token = req.header('Authorization');
          if (!token) return res.send(false);
            
          //verifies the authenticity of token using jwt.verify method
          jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
            if (err) return res.send(false);
            
            //originally included in the payload of token
            const user = await Users.findById(verified.id);
            if (!user) return res.send(false);
    
            return res.send(true);
          });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exists."})

            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
}

module.exports = userCtrl