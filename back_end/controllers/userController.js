const {validateToken,createToken}=require('../middleware/auth')
const {
  createUserServices,
  checkUserExistServices,
  giveVoteServices,
} = require("../services/userServices");
const bcrypt = require("bcrypt");

const saltRounds = 10;
exports.createUser = async (req, res, next) => {
  try {
    let bcryptPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const result = await createUserServices(req.body, bcryptPassword);
    if (result.status === "true") {
      return res.status(201).json({
        status: "success",
        message: "user created successfully",
        data: result.data,
      });
    } else {
      return res.status(401).json({
        status: "fails",
        message: "user name already exist",
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const result = await checkUserExistServices(req.body);
    if (result.status === "false") {
      res.status(401).send({
        status: "fails",
        message: result.message,
        data: {},
      });
    } else {
      console.log(result);
      const token = createToken(req.body.userName);
      res.status(200).send({
        status: "success",
        message: result.message,
        data: result.data,
        role: result.role,
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.giveVote = async (req, res, next) => {
  try {
    console.log(res.locals.userName)
    const result = await giveVoteServices(req.body);
    if (result.status) {
      console.log(result);
      return res.status(200).json({
        status: "success",
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(200).json({
        status: "fails",
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
    next(error);
  }
};
