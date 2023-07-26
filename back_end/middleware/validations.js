const joi=require('joi')
exports.registrationValidations = async (req, res, next) => {
    try {
      const { mobileNo, email, userName, password } = req.body;
      const errors = {};
      const schema = joi.object({
        mobileNo: joi
          .number()
          .integer()
          .required()
          .min(1000000000)
          .max(9999999999)
          .label("Mobile Number"),
        email: joi
          .string()
          .required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          .label("Email")
          .messages({
            "string.pattern.base": "Please enter a valid email address.",
          }),
        password: joi
          .string()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
          .required()
          .label("Password")
          .messages({
            "string.pattern.base":
              "The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.",
          }),
        userName: joi.string().required().label("user name"),
          
      });
  
      const validation = schema.validate({
        mobileNo,
        email,
        userName,
        password,
      });
  
      if (validation.error) {
        // Process validation errors
        validation.error.details.forEach((error) => {
          const { path, message } = error;
          // Store individual error messages
          errors[path[0]] = message;
        });
  
        // Attach error messages to the request object
        req.validationErrors = errors;
  
        // Pass control to the next middleware or return a response with errors
        return res.status(400).json({ errors });
      }
  
      // No validation errors, proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  exports.loginValiadations = async (req,res,next) => {
    try {
      const {userName } = req.body;
      const errors = {};
      const schema = joi.object({
        userName: joi.string().required().label("user name"),
      });
  
      const validation = schema.validate({
        userName,
      });
  
      if (validation.error) {
        // Process validation errors
        validation.error.details.forEach((error) => {
          const { path, message } = error;
          // Store individual error messages
          errors[path[0]] = message;
        });
  
        // Attach error messages to the request object
        req.validationErrors = errors;
  
        // Pass control to the next middleware or return a response with errors
        return res.status(400).json({ errors });
      }
  
      // No validation errors, proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(400).json(error);
    }
  }