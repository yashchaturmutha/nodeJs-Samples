var {createUsers} = require("../database/models/userModel");
const loginService = (userDetails) => {
    try {

      return "response";
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (userDetails) => {
    try {
        
        await createUsers(userDetails);

      return "response";
    } catch (error) {
      throw error;
    }
  };

  module.exports = { loginService, createUser };