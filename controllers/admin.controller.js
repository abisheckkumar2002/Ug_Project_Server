// import package

// import modal
import Admin from "../models/admin";

import EmailTemplate from "../models/emailTemplate";
import { sendEmail } from "../config/emailGateway";
import bcrypt from "bcrypt";
import config from "../config/config";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import Choices from "../models/choice";
import Subjects from "../models/hometutor";
import Roles from "../models/roles";

/**
 * User Login
 * URL : /api/login
 * METHOD: POST
 * BODY : email, phoneNo, phoneCode, loginType (1-mobile, 2-email), password
 */

export const userLogin = async (req, res) => {
  try {
    let reqBody = req.body,
      checkUser;
    reqBody.email = reqBody.email.toLowerCase();
    checkUser = await Admin.findOne({ email: reqBody.email });
    if (!checkUser) {
      console.log("Email")
      return res
        .status(400)
        .json({ success: false, errors: { email: "Email is not exists" } });
    }

    var passwordStatus = bcrypt.compareSync(
      reqBody.password,
      checkUser.password
    );

    if (!passwordStatus) {
      console.log("Password")
      return res
        .status(400)
        .json({ success: false, errors: { password: "Invalid Password" } });
    }

    let payloadData = {
      _id: checkUser._id,
    };
    let token = new Admin().generateJWT(payloadData);
    let result = {
      _id: checkUser._id,
      email: checkUser.email,
      name: checkUser.name,
    };

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", token, result });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

/**
 * Change Password
 * METHOD : PUT
 * URL : /api/forgotPassword
 * BODY : password, confirmPassword, userId
 */
export const checkForgotPassword = (req, res) => {
  let reqBody = req.body;
  User.findOne({ type: 1, email: reqBody.email }, (err, userData) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, errors: { messages: "Error on server" } });
    }
    if (!userData) {
      return res
        .status(400)
        .json({ success: false, errors: { email: "Email is not exists" } });
    }

    let content = {
      name: userData.name,
      confirmMailUrl: `${config.siteUrl}/changepassword/${userData._id}`,
    };

    mailTemplate("User_forgot", userData.email, content);
    return res.status(200).json({ success: true });
  }
  );
};

export const changeForgotPassword = async (req, res) => {
  console.log(req.body, "sdfdsfdsfsdfdsfdsfsd");
  try {
    let reqBody = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(reqBody.password, salt);
    console.log(hash);
    if (!hash) {
      return res
        .status(500)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    let userData = await Admin.findOne({ _id: reqBody.userId });
    if (!userData) {
      return res
        .status(500)
        .json({ success: false, errors: { messages: "User not found" } });
    }

    userData.password = hash;
    await userData.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

/**
 * Change Password
 * METHOD : PUT
 * URL : /api/forgotPassword
 * BODY : password, confirmPassword, userId
 */
export const updatepassword = async (req, res) => {
  console.log(req.body, "sdfdsfdsfsdfdsfdsfsd");
  try {
    let reqBody = req.body;

    let userData = await Admin.findOne({ _id: req.user.id });

    var passwordStatus = bcrypt.compareSync(
      reqBody.oldpassword,
      userData.password
    );

    if (!passwordStatus) {
      return res
        .status(400)
        .json({ success: false, errors: { password: "Invalid Password" } });
    }

    let salt = bcrypt.genSaltSync(10);

    let newhash = bcrypt.hashSync(reqBody.newpassword, salt);
    if (!newhash) {
      return res
        .status(500)
        .json({ success: false, errors: { oldpassword: "Error on server" } });
    }

    userData.password = newhash;
    await userData.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export const mailTemplate = async (identifier, email, contentData = {}) => {
  try {
    let emailTemplateData = await EmailTemplate.findOne({
      identifier: identifier,
    });
    if (!emailTemplateData) {
      return false;
    }

    let mailContent = {};
    mailContent["subject"] = emailTemplateData.subject;
    switch (identifier) {
      case "activate_register_user":
        /**
         * ##templateInfo_name## --> name
         * ##templateInfo_url## --> confirmMailUrl
         * ##DATE## --> date
         */
        mailContent["template"] = emailTemplateData.content
          .replace("##templateInfo_name##", contentData.name)
          .replace("##templateInfo_url##", contentData.confirmMailUrl)
          .replace("##DATE##", contentData.date);

        break;

      case "User_forgot":
        /**
         * ##templateInfo_name## --> name
         * ##templateInfo_url## --> confirmMailUrl
         */
        mailContent["template"] = emailTemplateData.content
          .replace("##templateInfo_name##", contentData.name)
          .replace("##templateInfo_url##", contentData.confirmMailUrl);

        break;

      case "Withdraw_Reject":
        /**
         * ##templateInfo_name## --> name
         * ##templateInfo_url## --> confirmMailUrl
         */
        mailContent["template"] = emailTemplateData.content
          .replace("##templateInfo_name##", contentData.name)
          .replace("##templateInfo_url##", contentData.confirmMailUrl);

        break;

      case "change_register_email":
        /**
         * ##templateInfo_name## --> name
         * ##templateInfo_url## --> confirmMailUrl
         */
        mailContent["template"] = emailTemplateData.content
          .replace("##templateInfo_name##", contentData.name)
          .replace("##templateInfo_url##", contentData.confirmMailUrl);

        break;

      case "verify_new_email":
        /**
         * ##templateInfo_name## --> name
         * ##templateInfo_url## --> confirmMailUrl
         */
        mailContent["template"] = emailTemplateData.content
          .replace("##templateInfo_name##", contentData.name)
          .replace("##templateInfo_url##", contentData.confirmMailUrl);

        break;
      case "Welcome_User":
        /**
         * ##templateInfo_name## --> name
         * ##templateInfo_url## --> confirmMailUrl
         */
        mailContent["template"] = emailTemplateData.content
          .replace("##templateInfo_name##", contentData.name)
          .replace("##message##", contentData.message);

        break;
    }

    sendEmail(email, mailContent);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//addchoice
export const choiceadd = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {

    var reqBody = req.body;

    let newUserData = new Choices({

      choice: reqBody.choice

    });

    let newDoc = await newUserData.save();

    return res
      .status(200)
      .json({
        success: true, message: "Choice  Updated Successfully",
        response: newDoc
      });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//choice list
export const choicelist = async (req, res) => {
  Choices.find({ status: "Active" }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({
      success: true, Count: userData.length,
      userValue: userData
    });
  });
};

//update list
export const updatechoicelist = async (req, res) => {
  try {
    var reqBody = req.body.choice;

    var test = await Choices.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { choice: reqBody }
    );
    return res
      .status(200)
      .json({
        success: true, message: "Service Updated Successfully",
      });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//findone

export const getchoice = async (req, res) => {
  Choices.findOne({ _id: req.params.id }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

//delete Choice
export const deletechoicelist = async (req, res) => {
  try {
    let deleteuser = await Choices.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { status: 0 },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully" });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//Home Tutor
//home Add
export const homeadd = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {

    var reqBody = req.body;

    let newUserData = new Subjects({

      subject: reqBody.subject

    });

    let newDoc = await newUserData.save();

    return res
      .status(200)
      .json({
        success: true, message: "Choice  Updated Successfully",
        response: newDoc
      });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//Home subject list
export const homesublist = async (req, res) => {
  Subjects.find({ status: "Active" }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({
      success: true, Count: userData.length,
      userValue: userData
    });
  });
};

//Subejct one
export const gethomesub = async (req, res) => {
  Subjects.findOne({ _id: req.params.id }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

//update sub
export const updatehomesub = async (req, res) => {
  try {
    var reqBody = req.body.subject;

    var test = await Subjects.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { subject: reqBody }
    );
    return res
      .status(200)
      .json({
        success: true, message: "Service Updated Successfully",
      });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//delete home sub
export const deletehomesub = async (req, res) => {
  try {
    let deleteuser = await Subjects.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { status: 0 },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully" });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//Roles and Professions
//role add
export const roleadd = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {

    var reqBody = req.body;

    let newUserData = new Roles({

      role: reqBody.role

    });

    let newDoc = await newUserData.save();

    return res
      .status(200)
      .json({
        success: true, message: "Choice  Updated Successfully",
        response: newDoc
      });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//roles list
export const rolelist = async (req, res) => {
  Roles.find({ status: "Active" }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({
      success: true, Count: userData.length,
      userValue: userData
    });
  });
};

//findone role
export const getrole = async (req, res) => {
  Roles.findOne({ _id: req.params.id }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

//update role
export const updaterole = async (req, res) => {
  try {
    var reqBody = req.body.role;

    var test = await Roles.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { role: reqBody }
    );
    return res
      .status(200)
      .json({
        success: true, message: "Service Updated Successfully",
      });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//delete role//delete home sub
export const deleterole = async (req, res) => {
  try {
    let deleteuser = await Roles.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { status: 0 },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully" });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};


export const getvendordata = async (req, res) => {
  User.findOne({ type: 1, _id: req.params.id }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

export const getdeliveryboydata = async (req, res) => {
  User.findOne({ type: 3, _id: req.params.id }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

export const updatevendor = async (req, res) => {
  try {
    var reqBody = req.body;
    // console.log(req.body,"fghfghfghfghfghfghfghfghfghfghfghfghfghfghfgh");



    var test = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      {
        status: reqBody.status,

      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Service Updated Successfully", });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export const updatedeliveryboy = async (req, res) => {
  try {
    var reqBody = req.body;
    // console.log(req.body,"fghfghfghfghfghfghfghfghfghfghfghfghfghfghfgh");



    var test = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      {
        status: reqBody.status,

      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Service Updated Successfully", });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export const deletevendor = async (req, res) => {
  try {
    let deletebanner = await User.findByIdAndDelete(
      { _id: new mongoose.Types.ObjectId(req.params.id) },

    );
    return res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully" });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export const deletedeliveryboy = async (req, res) => {
  try {
    let deletebanner = await User.findByIdAndDelete(
      { _id: new mongoose.Types.ObjectId(req.params.id) },

    );
    return res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully" });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

// export const vendorlist = async (req, res) => {
//   User.find({ type: 1 }, (err, userData) => {
//     if (err) {
//       return res
//         .status(200)
//         .json({ success: false, errors: { messages: "Error on server" } });
//     }

//     return res.status(200).json({ success: true, userValue: userData });
//   }).sort({ createdate: -1 });
// };

export const deliveryboylist = async (req, res) => {
  User.find({ type: 3 }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  }).sort({ createdate: -1 });
};
