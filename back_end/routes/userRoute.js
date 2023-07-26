const {validateToken}=require('../middleware/auth')
const express = require("express");
const {registrationValidations,loginValiadations,updateValidations}=require('../middleware/validations')
const {databseErrorHandler}=require('../middleware/errorHandler')

const {
  createUser,
  loginUser,
  giveVote,
} = require("../controllers/userController");
const router = express.Router();
router.post("/user-login",loginValiadations,loginUser,databseErrorHandler)
router.post("/user",registrationValidations,createUser,databseErrorHandler);
router.patch("/user-vote",validateToken,giveVote,databseErrorHandler);
module.exports = router;
