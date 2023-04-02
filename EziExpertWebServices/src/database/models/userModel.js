const adminModel = require('../schemas/admin.schema');

const loginChecked = async (userDetails) => {
  try {
    const { identity, password, role } = userDetails;
    const data = await adminModel.findOne({ identity, password, role });
    return data;
  } catch (error) {
    return false;
  }
};

const orgCreate = async (orgDetails) => {
  try {
    const data = await adminModel.create(orgDetails);
    data.status = true;
    return data;
  } catch (error) {
    console.log('orgCreate:: userModel', error);
    return { status: false, message: error };
  }
};

const roleChecked = async (details) => {
  try {
    const { identity, role } = details;
    const data = await adminModel.findOne({ identity, role });
    return data;
  } catch (error) {
    return false;
  }
};

// async function createUsers(userDetails) {
//     const newUser = new usermodels(userDetails);
//     await newUser.save();
//     return newUser.toJSON();
// }

// async function getUsers(query) {
//     let skip = query.skip ? query.skip: 0;
//     let limit = query.limit ? query.limit : 10;
//     let search = query.search  ? query.search : {};
//     if(search.length > 0) {
//         search = {$or:[{"identity": {$regex:search}},{"role": {$regex:search}}]}
//     }

//     let sort = query.sort
//     const userData = await usermodels.
//     find(search,{_id:0,__v:0})
//         .sort(sort)
//         .skip(skip)
//         .limit(limit);
//     return userData;
// }

module.exports = {
  loginChecked,
  orgCreate,
  roleChecked,
  // createUsers,
  // getUsers
};
