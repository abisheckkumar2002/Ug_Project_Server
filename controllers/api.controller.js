// import package

// import modal

import EmailTemplate from "../models/emailTemplate";
import { sendEmail } from "../config/emailGateway";
import bcrypt from "bcrypt";
import config from "../config/config";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import Register from "../models/register";
import title from "../models/title";
import subtitle from "../models/subtitle";
import QuesAns from "../models/questionanswer";
import StaffRegisteration from "../models/staffRegisteration";
import Crimeaddlistview from "../models/crimelist";
import section from "../models/section";
import Year from "../models/year";
import Department from "../models/department";
import studentdetails from "../models/studentdetails";

const fs = require("fs");

/**
 * User LoginStaffRegisteration
 * URL : /api/login
 * METHOD: POST
 * BODY : email, phoneNo, phoneCode, loginType (1-mobile, 2-email), password
 *
 *
 */

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const uploadImage = async (image) => {
  try {
    const diff = generateOTP();
    const imagename = Date.now() + diff + ".png";
    // to declare some path to store your converted image
    const path = "public/images/user/" + imagename;

    const imgdata = image;

    // to convert base64 format into random filename
    const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    fs.writeFileSync(path, base64Data, { encoding: "base64" });
    console.log(imagename);

    return imagename;
  } catch (e) {
    // next(e);
  }
};

var storagekyc1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/user");
  },
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const fileType = /jpeg|jpg|png|gif|mp4|pdf|xlsx/;
  const extname = fileType.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = fileType.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb("Allow image  only");
  }
}
var upload1 = multer({
  storage: storagekyc1,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([{ name: "Photofile", maxCount: 1 }]);




export const adduser = (req, res, next) => {
  console.log(
    req,
    "-----------------------------------------------------------"
  );
  const errors = {};
  upload1(req, res, (err) => {
    if (err) {
      console.log("err", err);
      errors.photo = err;
      res.status(400).json({ success: false, errors: errors });
    } else {
      return next();
    }
  });
};

//register
export const registeradd = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;
    const newphotopath = await uploadImage(reqBody.profileimage);
    const newphotopath2 = await uploadImage(reqBody.consulateimage);
    const newphotopath3 = await uploadImage(reqBody.paramedicsimage);
    const newphotopath4 = await uploadImage(reqBody.newsrepoterimage);

    let newUserData = new Register({
      profileimage: newphotopath ? newphotopath : "",
      firstname: reqBody.firstname,
      lastname: reqBody.lastname,
      gender: reqBody.gender,
      dob: reqBody.dob,
      relationship: reqBody.relationship,
      nationality: reqBody.nationality,
      city: reqBody.city,
      hometown: reqBody.hometown,
      religion: reqBody.religion,
      community: reqBody.community,
      answer: reqBody.answer,
      vehicledetails: reqBody.vehicledetails,
      answer1: reqBody.answer1,
      answer2: reqBody.answer2,
      answer3: reqBody.answer3,
      answer4: reqBody.answer4,
      consulateimage: newphotopath2 ? newphotopath2 : "",
      paramedicsimage: newphotopath3 ? newphotopath3 : "",
      newsrepoterimage: newphotopath4 ? newphotopath4 : "",
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "Information  Updated Successfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//home tutor
//title
export const titleadd = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;

    let newUserData = new title({
      title: reqBody.title,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "Information  Updated Successfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//subtitle
export const subtitleadd = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;

    let newUserData = new subtitle({
      subtitle: reqBody.subtitle,
      id: reqBody.id,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "Information  Updated Successfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//find t and st
export const gettitlelist = async (req, res) => {
  title.find({ status: "Active" }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

export const getsubtitlelist = async (req, res) => {
  subtitle.find({ id: req.params.id }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

// question answer
export const getquesans = async (req, res) => {
  QuesAns.find({ status: "Active" }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

export const userLogin = async (req, res) => {
  try {
    let reqBody = req.body,
      checkUser;
    reqBody.email = reqBody.email.toLowerCase();
    checkUser = await Admin.findOne({ email: reqBody.email });
    if (!checkUser) {
      console.log("Email");
      return res
        .status(400)
        .json({ success: false, errors: { email: "Email is not exists" } });
    }

    var passwordStatus = bcrypt.compareSync(
      reqBody.password,
      checkUser.password
    );

    if (!passwordStatus) {
      console.log("Password");
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

// staff registeration

export const staffRegisteration = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;
    let salt = bcrypt.genSaltSync(10);
    let newhash = bcrypt.hashSync(reqBody.staff_password, salt);

    let confirmpasswordnewhash = bcrypt.hashSync(
      reqBody.staff_confirmpassword,
      salt
    );

    let checkUser = await StaffRegisteration.findOne({
      Mail: reqBody.staff_mail,
      // deleted: 1,
    });
    if (checkUser) {
      return res
        .status(400)
        .json({ success: false, errors: { email: "Email already exists" } });
    }

    let newUserData = new StaffRegisteration({
      Position: reqBody.staff_position,
      Name: reqBody.staff_name,
      Department: reqBody.Department_name,
      Id: reqBody.staff_id,
      Gender: reqBody.staff_gender,
      Mobile: reqBody.staff_number,
      Shift: reqBody.staff_shift,
      Mail: reqBody.staff_mail,
      InchargeYear: reqBody.staff_InchargeYear,
      InchargeSection: reqBody.staff_InchargeSection,
      password: newhash,
      confirmpassword: confirmpasswordnewhash,
      type: reqBody.type,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "Staff Registration sucessfully",
      response: newDoc,
    });
  } catch (err) {
    console.log(err, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//staff login

export const stafflogin = async (req, res) => {
  try {
    let reqBody = req.body,
      checkUser;
    reqBody.staff_mail = reqBody.staff_mail.toLowerCase();
    checkUser = await StaffRegisteration.findOne({ Mail: reqBody.staff_mail });
    var data = await StaffRegisteration.find({ Mail: reqBody.staff_mail });
    var stafftype = data[0].Position;
    console.log("test", data);
    if (!checkUser) {
      console.log(reqBody.staff_mail, "reqBody.staff_mailreqBody.staff_mail");
      return res
        .status(400)
        .json({ success: false, errors: { Mail: "Email is not exists" } });
    }

    var passwordStatus = bcrypt.compareSync(
      reqBody.password,
      checkUser.password
    );

    if (!passwordStatus) {
      console.log("invalid Password");
      return res
        .status(400)
        .json({ success: false, errors: { password: "Invalid Password" } });
    }

    let payloadData = {
      _id: checkUser._id,
    };
    let token = new StaffRegisteration().generateJWT(payloadData);
    let result = {
      _id: checkUser._id,
    };

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      result,
      type: stafftype,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Email is not exists" } });
  }
};

// crimelist view

export const crimelistview = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");

  try {
    var reqBody = req.body;

    const checkUser = await studentdetails.findOne({
      Rollno: reqBody.student_rollno,
    });

    if (!checkUser) {
      console.log(
        reqBody.student_rollno,
        "reqBody.staff_mailreqBody.staff_mail"
      );
      return res
        .status(400)
        .json({ success: false, errors: { Mail: "Invalid student roll no" } });
    }

    let newUserData = new Crimeaddlistview({
      Rollno: reqBody.student_rollno,
      Reason: reqBody.student_reason,
      // Name: reqBody.student_name,
      Department: reqBody.department_name,
      // Year: reqBody.student_year,
      Section: reqBody.student_section,
      // Phone: reqBody.student_no,
      // Parent: reqBody.parent_no,
      ArrestBY: req.user.Id,

      Staffname: req.user.Name,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "crime added sucessfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)

      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

// view crime list for specific teacher

export const viewcrimelist = async (req, res) => {
  var filter = {
    status: "Active",
    ArrestBY: new mongoose.Types.ObjectId(req.user.Id),
  };
  if (req.query.Rollno) {
    filter.Rollno = { $regex: ".*" + req.query.Rollno + ".*", $options: "i" };
  }
  Crimeaddlistview.find(filter, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

// find the department crime match with the hod

export const macthcrimewithhod = async (req, res) => {
  Crimeaddlistview.find(
    { Department: req.user.Department_name },
    (err, userData) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, errors: { messages: "Error on server" } });
      }

      return res.status(200).json({ success: true, userValue: userData });
    }
  );
};

// matching crime students with the classteacher

export const macthcrimewithclassteacher = async (req, res) => {
  console.log(req.user.Incharge_year, req.user.Incharge_section);
  Crimeaddlistview.find(
    {
      Year: req.user.Incharge_year,
      Section: req.user.Incharge_section,
      Department: req.user.Department_name,
    },
    (err, userData) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, errors: { messages: "Error on server" } });
      }

      return res.status(200).json({ success: true, userValue: userData });
    }
  );
};

/// add section

export const addsection = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;

    let newUserData = new section({
      Section: reqBody.section,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "Section added  sucessfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

// add department

export const adddepartment = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;

    let newUserData = new Department({
      Department: reqBody.department,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "Year added  sucessfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

// add year for section
export const addyear = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;

    let newUserData = new Year({
      Year: reqBody.year,
      Department: reqBody.department,

      Section: reqBody.section,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "department added  sucessfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

// add department

export const addDepartment = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;

    console.log("deparment", reqBody);
    let newUserData = new Department({
      Department: reqBody.department,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "department added sucessfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

/// get department

export const getdepartment = async (req, res) => {
  Department.find({ status: "Active" }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

// get department section using department id
// export const getdepartmentsection = async (req, res) => {
//   Year.find({  Department: req.params.id, Year: req.params.id1 }, (err, userData) => {
//     if (err) {
//       return res
//         .status(200)
//         .json({ success: false, errors: { messages: "Error on server" } });
//     }

//     return res.status(200).json({ success: true, userValue: userData });
//   });
// };

export const getdepartmentsection = async (req, res) => {
  try {
    console.log(req.params.id, req.params.id1, "ds");
    const result = await Year.aggregate([
      {
        $match: {
          Department: new mongoose.Types.ObjectId(req.params.id),
          Year: req.params.id1,
        },
      },

      {
        $lookup: {
          from: "Departmentlist",
          localField: "Department",
          foreignField: "_id",
          as: "departmentname",
        },
      },
      { $unwind: "$departmentname" },
      // {$unset:"$exam"},

      {
        $lookup: {
          from: "Section",
          localField: "Section",
          foreignField: "_id",
          as: "sectionname",
        },
      },
      { $unwind: "$sectionname" },
      // {$unset:"$exam"},
    ]);

    return res.status(200).json({ success: true, userValue: result });
  } catch (err) {
    console.log(err, "sss");
    if (err) {
      return res
        .status(500)
        .json({ success: false, errors: { messages: "Error on server" } });
    }
  }
};

// add student details
export const addStudentDetails = async (req, res) => {
  console.log(req.body, "kkkkkkkkkkkkkkkkkk");
  try {
    var reqBody = req.body;

    let newUserData = new studentdetails({
      Rollno: reqBody.student_rollno,
      Name: reqBody.student_name,
      Department: reqBody.department_name,
      Year: reqBody.student_year,
      Section: reqBody.student_section,
      Phone: reqBody.student_no,
      Parent: reqBody.parent_no,
      classTeacher: reqBody.classteacher,
      HOD: reqBody.hod,
      Shift: reqBody.stushift,
    });

    let newDoc = await newUserData.save();

    return res.status(200).json({
      success: true,
      message: "Student details added sucessfully",
      response: newDoc,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

/// get student details

export const getstudentDetails = async (req, res) => {
  try {
    console.log(req.params.id1, "ds");
    const result = await Crimeaddlistview.aggregate([
      {
        $match: { Rollno: req.params.id1 },
      },

      //   {
      //     $lookup:{
      //     from:"Departmentlist",
      //     localField:"Department",
      //     foreignField:"_id",
      //     as:"departmentname"
      //   }
      // },
      // {$unwind:"$departmentname"},
      // {$unset:"$exam"},

      {
        $lookup: {
          from: "Studentdetails",
          localField: "Rollno",
          foreignField: "Rollno",
          as: "details",
        },
      },
      { $unwind: "$details" },
      // {$unset:"$exam"},
    ]);

    return res.status(200).json({ success: true, userValue: result[0] });
  } catch (err) {
    console.log(err, "sss");
    if (err) {
      return res
        .status(500)
        .json({ success: false, errors: { messages: "Error on server" } });
    }
  }
};

// get teacher profile details
export const getteacherdetails = async (req, res) => {
  StaffRegisteration.find(
    { _id: new mongoose.Types.ObjectId(req.user.Id) },
    (err, userData) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, errors: { messages: "Error on server" } });
      }

      return res.status(200).json({ success: true, userValue: userData });
    }
  );
};

// get all crime list
export const getcrimedetails = async (req, res) => {
  const result = await Crimeaddlistview.aggregate([
    {
      $match: { ArrestBY: req.user.Id },
    },

    {
      $lookup: {
        from: "Studentdetails",
        localField: "Rollno",
        foreignField: "Rollno",
        as: "details",
      },
    },
    {
      $unset: ["password", "__v"],
    },
  ]);
  return res.status(200).json({ success: true, userValue: result });
};

///
export const getstudentDetails11 = async (req, res) => {
  try {
    console.log(req.params.id1, "ds");
    const result = await studentdetails.aggregate([
      {
        $match: { Rollno: req.params.id1 },
      },
      {
        $lookup: {
          from: "Crimelist",
          localField: "Rollno",
          foreignField: "Rollno",
          as: "details11",
        },
      },
      { $unwind: "$details11" },
      // {$unset:"$exam"},
    ]);

    return res.status(200).json({ success: true, userValue: result });
  } catch (err) {
    console.log(err, "sss");
    if (err) {
      return res
        .status(500)
        .json({ success: false, errors: { messages: "Error on server" } });
    }
  }
};
