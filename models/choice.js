// import package
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const choiceSchema = new Schema({
   
    choice: {
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

const Admin = mongoose.model("Choice", choiceSchema, "Choice");

export default Admin;