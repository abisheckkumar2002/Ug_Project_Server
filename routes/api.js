//  import packages
import express from "express";
import passport from "passport";

// import controllers
import * as adminCtrl from "../controllers/api.controller";

//validations
import * as userValidation from "../validation/user.validation";

const router = express();
const dd =express.Router();
const passportAuth = passport.authenticate("usersAuth", { session: false });
// Admin Repot
router
  .route("/login")
  .post(userValidation.userLoginValidation, adminCtrl.userLogin);

//register


//new method 


dd.get('/new',[userValidation.userLoginValidation, adminCtrl.userLogin]);

router
  .route("/register")
  .post(adminCtrl.registeradd);

//home tutor
//title
router
  .route("/title")
  .post(adminCtrl.titleadd);

//subtitlt
router
  .route("/subtitle")
  .post(adminCtrl.subtitleadd);

//find t and st
router.route("/titlelist")
.get( adminCtrl.gettitlelist);

router.route("/subtitlelist/:id")
.get( adminCtrl.getsubtitlelist);

//question & answer
router.route("/quesans")
.get( adminCtrl.getquesans);




// router
//   .route("/staticcontent")
//   .post(userValidation.userLoginValidation, adminCtrl.userLogin);
// router.route("/getuserdata").get(passportAuth, adminCtrl.getuserdata);
// router.route("/getuserlist/").get(adminCtrl.getuserlist);
// router.route("/getuser/:id").get(adminCtrl.getuser);
// router.route("/deleteuser/:id").put(adminCtrl.deleteuser);








router
  .route("/updatepassword")
  .post(passportAuth, userValidation.updatepassword, adminCtrl.updatepassword);



  //staff regisertion router
  router
  .route("/staffRegisteration")
  .post(adminCtrl.staffRegisteration);


  // get teacher profile details
  router.route("/geteacherprofiledetails")
.get( passportAuth,adminCtrl.getteacherdetails);




  // staff login router

  router
  .route("/stafflogin")
  .post(adminCtrl.stafflogin);


  //Add section

  
  router
  .route("/addsection")
  .post(adminCtrl.addsection);

// // add year section and department
  router
  .route("/addyear")
  .post(adminCtrl.addyear);

  
 




//post or add department
  router
  .route("/addDepartment")
  .post(adminCtrl.addDepartment);








// get department


router.route("/getdepartment")
.get( adminCtrl.getdepartment);


// get department, year with department id for section

router.route("/getdepartmentsection/:id/:id1")
.get( adminCtrl.getdepartmentsection);



  
// add crime
 
router
  .route("/Addcrime")
  .post(passportAuth,adminCtrl.crimelistview);

// view added crime with specific teacher

router.route("/viewcrimelist")
.get( passportAuth,adminCtrl.viewcrimelist);

// view all crime list of view
router.route("/viewcrimelistall")
.get(passportAuth,adminCtrl.getcrimedetails);

  // MATCH CRIME WITH HOD
  router.route("/mathscrimewithhod/:id")
.get( passportAuth,adminCtrl.macthcrimewithhod);

// MATCH CRIME WITH CLASS TEACHER

router.route("/mathscrimewithclassteacher")
.get( passportAuth,adminCtrl.macthcrimewithclassteacher);

/// add student details
//post or add department
router
.route("/addStudentDetails")
.post(adminCtrl.addStudentDetails);


// get api for student detail for who committed crime

router.route("/gestudentDetails/:id1")
.get( adminCtrl.getstudentDetails);




router.route("/gestudentDetails11")
.get( adminCtrl.getstudentDetails11);










export default router;
