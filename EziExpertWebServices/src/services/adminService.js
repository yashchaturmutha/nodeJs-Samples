const { loginChecked, orgCreate, roleChecked } = require('../database/models/userModel');
// eslint-disable-next-line no-unused-vars
const { db } = require('../database/db');

const loginVerify = async (userDetails) => {
  try {
    const data = await loginChecked(userDetails);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const organisationCreate = async (orgDetails) => {
  try {
    const data = await orgCreate(orgDetails);
    return data;
  } catch (error) {
    console.log('organisation create: adminSErvice', error);
    return false;
  }
};

const checkRole = async (details) => {
  try {
    const data = await roleChecked(details);
    return data;
  } catch (error) {
    console.log('organisation create: adminSErvice', error);
    return false;
  }
};

module.exports = {
  loginVerify,
  organisationCreate,
  checkRole,
};
