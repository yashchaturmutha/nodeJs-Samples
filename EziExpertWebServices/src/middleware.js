const jwt = require('jsonwebtoken');
// const cookieparser = require('cookie-parser');

const validateToken = async (req, res) => {
  try {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      // res.status(200).send({ status: true, message: verified });
      return ({ status: true, message: verified });
    }
    // Access Denied
    return ({ status: false, message: 'not verified' });
  } catch (error) {
    console.log('error in catch: validateToken middleware', error);
    return ({ status: false, message: 'not verified' });
  }
};

const accessTokenGenerate = async (req, res) => {
  const { role, identity } = req.body;
  const accessToken = jwt.sign({
    role,
    identity,
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: '600m',
  });
    // Creating refresh token not that expiry of refresh
    // token is greater than the access token

  const refreshToken = jwt.sign({
    identity,
    role,
  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  // Assigning refresh token in http-only cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  // return res.json({ accessToken });
  // return { check: true, token: res.json({ accessToken }) };
  const response = ({ check: true, token: accessToken });
  // return response.json({ accessToken });
  return response;
};

const refreshToken = async (req, body) => {
  const { identity, role } = body;
  try {
    if (req.cookies?.jwt) {
      // Destructuring refreshToken from cookie
      const refreshtoken = req.cookies.jwt;

      // Verifying refresh token
      const data = jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            // Wrong Refesh Token
            return { status: false, message: 'Unauthorized Token' };
          }
          // Correct token we send a new access token
          const accessToken = jwt.sign({
            role,
            identity,
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: '600m',
          });
          return ({ status: true, token: accessToken });
        },
      );
      return data;
    }
    return { status: false, message: 'Unauthorized Token' };
  } catch (error) {
    console.log('refresh Token error in middleware', error);
  }
};

module.exports = {
  validateToken,
  refreshToken,
  accessTokenGenerate,
};
