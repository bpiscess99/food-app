const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


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
        required: true
     },

     password: {
        type: String,
        required: true
     },

}, {
    timestamps: true,
}
);


// Encrypt Password
userSchema.pre("save", async function (next){
if(!this.isModified("password")){
   return next()
}


// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(this.password, salt);
this.password = hashedPassword;
next()

});

const User = mongoose.model("user", userSchema)
module.exports = User;