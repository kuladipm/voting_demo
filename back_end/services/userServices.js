const db = require("../model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.createUserServices = async (bodyData, bcryptPassword) => {
  try {
    const user = await db.user.findOne({
      where: { userName: bodyData.userName },
    });
    if (user) {
        return {
            status: "false",
            data:{},
          };
    } else {
      const createUser = await db.user.create({
        userName: bodyData.userName,
        email: bodyData.email,
        mobileNo: bodyData.mobileNo,
        password: bcryptPassword,
        created_by: bodyData.email,
        updated_by: bodyData.email,
      });
      console.log(createUser);
      return {
        status: "true",
        data: createUser.dataValues,
      };
    }
  } catch (e) {
    throw Error(e);
  }
};

exports.checkUserExistServices = async (userData) => {
  try {
    const user = await db.user.findOne({
      where: { userName: userData.userName },
    });
    if (user) {
      const checkPassword = bcrypt.compareSync(
        userData.password,
        user.password
      );
      if (checkPassword) {
        if (user.dataValues.role === "User") {
          return { status: "true", data: user.dataValues ,role:"User"};
        } else {
          const user = await db.user.findAll({ attributes: ["vote"] });
          console.log(user);
          const result = {};
          user.forEach((item) => {
            if (item.vote !== null) {
              if (result[item.vote]) {
                result[item.vote]++;
              } else {
                result[item.vote] = 1;
              }
            }
          });
          console.log(result);
          return { status: "true", message: "list of voting", data: result ,role:"Admin"};
        }
      } else {
        return {
          status: "false",
          message: "password not match please enter correct password",
        };
      }
    } else {
      return { status: "false", message: "user not found please register" };
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

exports.giveVoteServices = async (bodyData) => {
  try {
    const user = await db.user.findOne({
      attributes: ["vote"],
      where: { user_id: bodyData.user_id },
    });
    console.log(user.vote);
    if (user.vote) {
      return {
        status: false,
        data: {
          user_id: bodyData.user_id,
        },
        message: "You already voted",
      };
    } else {
      const updateProfileDetails = {
        vote: bodyData.vote,
      };
      const result = await db.user.update(updateProfileDetails, {
        where: { user_id: bodyData.user_id },
      });
      console.log(result);
      return {
        status: true,
        data: {
          user_id: bodyData.user_id,
        },
        message: "voting  done successfully ",
      };
    }
  } catch (error) {
    throw Error(error);
  }
};
