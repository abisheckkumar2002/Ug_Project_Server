import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const addyearSchema = new Schema({
   
    Year: {
        type: String,
        default: ""
    },

    Department: {
        type:  Schema.Types.ObjectId,
        default: ""
    },

    Section: {
        type:  Schema.Types.ObjectId,
        default: ""
    },
   
    status: {
        type: String,
        default: "Active"
    },
 
})


const Admin = mongoose.model("Year1", addyearSchema, "Year");

export default Admin;