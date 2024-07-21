import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const staffregisterSchema = new Schema({
   
    Position: {
        type: String,
        default: ""
    },
    Name: {
        type: String,
        default: ""
    },
    Department: {
        type: String,
        default: ""
    },
    Id: {
        type: String,
        default: ""
    },
    Gender: {
        type: String,
        default: ""
    },
    Mobile : {
        type: Number,
        default: ""
    },
    Shift : {
        type: String,
        default: ""  
    },
    Mail : {
        type: String,
        default: ""
    },


    InchargeYear : {
        type: String,
        default: ""
    },

    
    InchargeSection : {
        type: String,
        default: ""
    },
    password : {
        type: String,
        default: ""
    },
    confirmpassword : {
        type: String,
        default: ""
    },
    type : {
        type: Number,
        default: ""
    },
    status: {
        type: String,
        default: "Active"
    },
 
})

// staffregisterSchema.methods.generateJWT = function (payload) {
//     var token = jwt.sign(payload, config.secretOrKey);
//     return `Bearer ${token}`;
// };


staffregisterSchema.methods.generate
const Admin = mongoose.model("Register1", staffregisterSchema, "StaffRegister");

export default Admin;