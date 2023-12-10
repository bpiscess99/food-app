const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
     name: {
        type: String,
        required: true
     },

     location: {
        type: String,
        required : true
     },
     
     email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         "Please enter a valid email" // regex for validation of email     
      ]
     },

     password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "password must be upto 6 characters"]
     },

     date: {
        type: Date,
        default: Date.now
     },
}, {
    timestamps: true,
}
);

// Encrypt password before saving to db
userSchema.pre("save", async function(next){
   if(!this.isModified("password")){
      return next()
   }


// Hash Password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(this.password, salt);
this.password = hashedPassword;
next()
});


const User = mongoose.model("User", userSchema)
module.exports = User;