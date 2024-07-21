import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const DepartmentlistSchema = new Schema({

    Department: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        default: "Active"
    },

})



const Admin = mongoose.model("Departmentlist1", DepartmentlistSchema, "Departmentlist");

export default Admin;