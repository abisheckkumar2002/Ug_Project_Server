//  import packages
import express from "express";
import passport from "passport";

// import controllers
import * as adminCtrl from "./../controllers/admin.controller";

//validations
import * as userValidation from "./../validation/user.validation";

const router = express();
const route=express.Router()
const passportAuth = passport.authenticate("adminAuth", { session: false });
// Admin Repot
router
  .route("/login")
  .post(userValidation.userLoginValidation, adminCtrl.userLogin);

router
  .route("/forgotPassword")
  .post(userValidation.checkForgotPwdValidation, adminCtrl.checkForgotPassword)
  .put(
    userValidation.changeForgotPwdValidation,
    adminCtrl.changeForgotPassword
  );

router
  .route("/updatepassword")
  .post(passportAuth, userValidation.updatepassword, adminCtrl.updatepassword);

//choices

router
  .route("/choiceindex")
  .post(userValidation.choiceadd, adminCtrl.choiceadd);

router
  .route("/getchoicelist")
  .get(adminCtrl.choicelist);

router
  .route("/getchoice/:id")
  .get(adminCtrl.getchoice);

router
  .route("/updatechoice/:id")
  .post(adminCtrl.updatechoicelist);

router
  .route("/deletechoice/:id")
  .delete(adminCtrl.deletechoicelist);

//Home Tutor
router
  .route("/homeindex")
  .post(userValidation.homeadd, adminCtrl.homeadd);

router
  .route("/gethomesublist")
  .get(adminCtrl.homesublist);

router
  .route("/gethomesub/:id")
  .get(adminCtrl.gethomesub);

router
  .route("/updatehomesub/:id")
  .post(userValidation.homeadd, adminCtrl.updatehomesub);

router
  .route("/deletehomesub/:id")
  .delete(adminCtrl.deletehomesub);

//Roles and Professions 
router
  .route("/roleandprofessionsindex")
  .post(userValidation.roleadd, adminCtrl.roleadd);

router
  .route("/roleandprofessionslist")
  .get(adminCtrl.rolelist);

router
  .route("/getroleandprofessions/:id")
  .get(adminCtrl.getrole);

router
  .route("/updateroleandprofessions/:id")
  .post(userValidation.roleadd, adminCtrl.updaterole);

router
  .route("/deleteroleandprofessions/:id")
  .delete(adminCtrl.deleterole);




router.route("/deletevendor/:id").delete(adminCtrl.deletevendor);





// router.route("/vendorlist").get(adminCtrl.vendorlist);

router.route("/getvendor/:id").get(adminCtrl.getvendordata);
router
  .route("/updatevendor/:id")
  .post(



    adminCtrl.updatevendor
  );
router.route("/deliveryboylist").get(adminCtrl.deliveryboylist);
router.route("/getdeliveryboy/:id").get(adminCtrl.getdeliveryboydata);
router
  .route("/updatedeliveryboy/:id")
  .post(

adminCtrl.updatedeliveryboy
  );
router.route("/deletedeliveryboy/:id").delete(adminCtrl.deletedeliveryboy);



export default router;
