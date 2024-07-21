import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const addsectionSchema = new Schema({
   
    Section: {
        type: String,
        default: ""
    },
   
    status: {
        type: String,
        default: "Active"
    },
 
})


const Admin = mongoose.model("Section1", addsectionSchema, "Section");

export default Admin;