const { sign, verify } = require("jsonwebtoken");
const JWT_SECRET="abcabacabacabacabac"
exports.createToken = (userName) => {
  const token = sign({ userName: userName },JWT_SECRET, {
    expiresIn:10,
  });
  return token;
};
exports.validateToken = async (req, res, next) => {
  const accessToken = req.headers.auth;
  console.log(accessToken)
  if (accessToken === undefined) {
    res.status(401).json({
      status: 401,
      success: false,
      message: "Token doesn't exists",
    });
  } else if (!accessToken) {
    return res
      .status(404)
      .json({ status: 401, success: false, message: "Token doesn't exists" });
  }
  try {
    console.log('byye')
    console.log(verify(accessToken, JWT_SECRET))
    const validateToken = verify(accessToken, JWT_SECRET);
    console.log('hii')
    console.log(validateToken)
    if (validateToken) {
      res.locals.userName = validateToken.userName;
      return next();
    }
  } catch (error) {
    res.status(401).send({
        status:401,
        success:false,
        message: "User not authorized" });
  }
};