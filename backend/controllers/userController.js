const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");
// const Token = require("../model/tokenModel");
const jwt = require("jsonwebtoken");


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

// Register User
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, location} = req.body;


//   validation

if(!name || !email || !password || !location){
    res.status(400);
    throw new Error("Please fill all required field")
};

// Check if email is already exist 
const userExists = await User.findOne({email});
if(userExists){
    res.status(400);
    throw new Error("User email already exist")
}


// Create new user
const user = await User.create({
    name,
    email,
    password,
    location,
});


// Generate a Token

const token = generateToken(user._id);

// Send HTTP-only cookie    
res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true, 
})



if(user){
    const {_id, name, email, location} = user;
    res.status(201).json({
        _id,
        name,
        email,
        location,
        token

    });
}else{
    res.status(400)
    throw new Error("Invalid user data");
}
});


 

// loginUser

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    // Validation
    if(!email || !password){
        res.status(400);

        throw new Error("Please fill all required field");
    };

    // Check if user is exist
    const user = await User.findOne({email})
    if(!user){
        res.status(200);
        throw new Error("User not found please sign up")
    };

    // check password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // Generate a token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

    if(user && passwordIsCorrect){
        const {_id, name, email, password, location} = user;
        res.status(200).json({
            _id,
             name,
            email, 
            password, 
            location,
            token
        });
    }else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      const { _id, name, email,  } = user;
      res.status(200).json({
        _id,
        name,
        email,
        
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });


module.exports={
    registerUser,
    loginUser,
    getUser,
}

