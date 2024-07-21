import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib


const Schema = mongoose.Schema;

const studentdetailsSchema = new Schema({

    Rollno: {
        type: String,
        default: ""
    },

    Name: {
        type: String,
        default: ""
    },
    Year: {
        type: String,
        default: ""
    },
    Section: {
        type: String,
        default: ""
    },
    Phone: {
        type: Number,
        default: ""
    },
    Parent: {
        type: Number,
        default: ""
    },

    Department: {
        type: String,
        default: ""
    },
    classTeacher: {

        type: String,
        default: ""
    },
    HOD: {

        type: String,
        default: ""
    },


    Shift: {

        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Active"
    },







})



const Admin = mongoose.model("Studentdetails1", studentdetailsSchema, "Studentdetails");

export default Admin;