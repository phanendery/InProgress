const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";

  // if (!Validator.isEmail(data.username)) {
  //   return { message: "Username is invalid", isValid: false };
  // }

  if (Validator.isEmpty(data.Username)) {
    return { message: "Username field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true,
  };
};
