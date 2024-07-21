// import package
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const registerSchema = new Schema({
   
    profileimage: {
        type: String,
        default: ""
    },
    consulateimage: {
        type: String,
        default: ""
    },
    paramedicsimage: {
        type: String,
        default: ""
    },
    newsrepoterimage: {
        type: String,
        default: ""
    },
    consulateimage: {
        type: String,
        default: ""
    },
    firstname : {
        type: String,
        default: ""
    },
    lastname : {
        type: String,
        default: ""
    },
    gender : {
        type: String,
        default: ""
    },
    dob : {
        type: String,
        default: ""
    },
    relationship : {
        type: String,
        default: ""
    },
    nationality : {
        type: String,
        default: ""
    },
    city : {
        type: String,
        default: ""
    },
    hometown : {
        type: String,
        default: ""
    },
    religion : {
        type: String,
        default: ""
    },
    community : {
        type: String,
        default: ""
    },
    answer : {
        type: Array,
        default: []
    },
    vehicledetails : {
        type: String,
        default: ""
    },
    answer1 : {
        type: String,
        default: ""
    },
    answer2 : {
        type: String,
        default: ""
    },
    answer3 : {
        type: String,
        default: ""
    },
    answer4 : {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Active"
    },
    createdate: {
        type: Date,
        default: Date.now
    }
})

// AdminSchema.methods.generateJWT = function (payload) {
//     var token = jwt.sign(payload, config.secretOrKey);
//     return `Bearer ${token}`;
// };

const Admin = mongoose.model("Register", registerSchema, "Register");

export default Admin;