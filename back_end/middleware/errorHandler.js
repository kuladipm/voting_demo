const { Op, Sequelize, QueryTypes } = require("sequelize");
exports.databseErrorHandler=(error,req,res,next)=>{
    if (error instanceof Sequelize.ValidationError) {
        //  validation errors
        const errorMessages = error.errors.map((err) => err.message);
        return res
          .status(422)
          .json({ error: "validation error", message: error.message });
      } else if (error instanceof Sequelize.DatabaseError) {
        // other databse errors
        return res.status(500).json({ error: "databse error", message: error.message });
      } else {
        // other errors
        return res.status(500).json({ error: "other error", message: error.message });
      }
}