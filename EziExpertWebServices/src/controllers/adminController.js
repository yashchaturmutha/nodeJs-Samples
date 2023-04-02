/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const adminService = require('../services/adminService');
// const commonService = require('../services/commonService');
const middleware = require('../middleware');

const login = async (req, res) => {
  try {
    // const headerData = await middleware.validateToken(req);
    // console.log(headerData);
    // if (headerData.status) {
    const { body } = req;
    const { identity, password, role } = body;
    if (!identity || !password || !role) {
      // eslint-disable-next-line no-throw-literal
      throw { status: 412, message: 'please pass username, password, role' };
    }
    const userDetails = {
      identity,
      password,
      status: 'active', // TODO
      role,
    };
    const tokenResponse = await middleware.accessTokenGenerate(req, res);
    console.log('======', res);
    if (!tokenResponse.check) {
      // eslint-disable-next-line no-throw-literal
      throw { status: 401, message: 'unauthorized user' };
    }
    const loginChecked = await adminService.loginVerify(userDetails);
    if (loginChecked) {
      res.status(200).send({ status: true, token: tokenResponse.token });
    } else {
      // eslint-disable-next-line no-throw-literal
      throw { status: 401, message: 'authentication failed, data not found' };
    }

    // }
    // } else {
    //     // Access Denied
    //     res.status(401).send({ status: false, data: 'authentication failed' });
    // }
  } catch (error) {
    console.log('error in login:: admin Controller', error);
    res
      .status(error?.status || 500)
      .send({ status: false, data: { error: error?.message || error } });
  }
};

// const createToken = async (req, res) => {
//   try {
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;
//     const data = {
//       role: 'admin',
//       email: 'raunak.kumar@infogen-labs.com',
//     };

//     const token = jwt.sign(data, jwtSecretKey);
//     res.status(200).send({ status: true, token });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: false, data: { error: error?.message || error } });
//   }
// };

// const validateToken = async (req, res) => {
//   try {
//     const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;

//     const token = req.header(tokenHeaderKey);
//     const verified = jwt.verify(token, jwtSecretKey);
//     console.log(verified);
//     if (verified) {
//       res.status(200).send({ status: true, message: 'successfully verified' });
//     } else {
//       // Access Denied
//       return res.status(401).send('unauthorized token');
//     }
//   } catch (error) {
//     console.log('error in validate Token:: admin Controller', error);
//     res
//       .status(error?.status || 500)
//       .send({ status: false, data: { error: error?.message || error } });
//   }
// };

const createOrganization = async (req, res) => {
  try {
    let response = {};
    const { orgName, address, phone } = req.body;
    response = await middleware.validateToken(req, res);
    response.refreshToken = await middleware.refreshToken(req, response?.message);
    if (!response.refreshToken?.status) {
      return res.status(401).json({ message: 'Unauthorized token' });
    }
    let createData = '';
    if (response.status) {
      if (!orgName || !address || !phone) {
        // eslint-disable-next-line no-throw-literal
        throw { status: 400, message: 'parameter missing' };
      } else {
        const checkRole = await adminService.checkRole(response?.message);
        if (checkRole.status) {
          createData = await adminService.organisationCreate(req.body);
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { status: 400, message: 'authentication failed, data not found' };
        }
      }
      response.status = createData.status;
      response.data = createData;
      if (response.status) {
        res.status(200).send({ status: response.status, message: response });
      } else {
        res.status(412).send({ status: response.status, message: 'org name already exist or some duplication' });
      }
    } else {
      res.status(401).send({ status: false, data: 'authentication failed, data not found' });
    }
  } catch (error) {
    console.log('error in createOrganisation:: admin Controller', error);
    res
      .status(error?.status || 500)
      .send({ status: false, data: { error: error?.message || error } });
  }
};

module.exports = {
  login,
  // createToken,
  // validateToken,
  createOrganization,
};
