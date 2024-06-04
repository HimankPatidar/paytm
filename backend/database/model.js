const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true,   
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minLength : 8,
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        maxLength : 50,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        maxLength : 50,
    },

})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model("User", userSchema)



module.exports = {
	User,
  Account,
};
