import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const crimelistSchema = new Schema({
   
    Rollno: {
        type: String,
        default: ""
    },
    Reason: {
        type: String,
        default: ""
    },
    // Name: {
    //     type: String,
    //     default: ""
    // },
    // Year: {
    //     type: String,
    //     default: ""
    // },
    Section: {
        type: String,
        default: ""
    },
    // Phone : {
    //     type: Number,
    //     default: ""
    // },
    // Parent : {
    //     type: Number,
    //     default: ""
    // },

    Department : {
        type: String,
        default: ""
    },
    ArrestBY : {
        
         type:  Schema.Types.ObjectId,
        default: ""
    },
    

    Staffname : {
        
        type:  Schema.Types.ObjectId,
       default: ""
   },
   
    status: {
        type: String,
        default: "Active"
    },

   
    Createdate:{
        type:Date,
        default:Date.now
    }
 
})

crimelistSchema.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.secretOrKey);
    return `Bearer ${token}`;
};

const Admin = mongoose.model("Crimelist", crimelistSchema, "Crimelist");

export default Admin;