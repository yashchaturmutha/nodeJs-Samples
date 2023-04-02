const adminService = require("../services/adminService");
const commonService = require("../services/commonService");
const { mailService } = require("../services/mailService");
const adminmodels = require("../database/schema/admin.schema");
const new_line = '\n\xA0';
const packageModels = require("../database/schema/package.schema")

const login = async (req, res) => {
    const { body } = req;
    const userDetails = {
        identity: body.identity,
        password: body.password,
        status: 'active'
    };
    try {
        const loginChecked = await adminService.login(userDetails);
        res.status(200).send({ status: "OK", data: loginChecked });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAllUsers = async (req, res) => {
    const { query } = req;
    try {
        const data = await adminService.getAllUsers(query);
        res.status(200).send({ status: "OK", data: data });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getRegions = async (req, res) => {
    const { query } = req;
    try {
        const data = await adminService.getAllRegions(query.mBy || query.cBy);
        res.status(200).send({ status: "OK", data: data });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const offers = async (req, res) => {
    const { body } = req;
    try {
        const superAdminData = await adminmodels.findOne({identity: body.cBy});
        if(superAdminData) {
            const data = await adminService.createOffers(body);
            res.status(200).send({ status: "OK", data: data });
        } else {
            throw { status: 400, message: "Only Superadmin can create package"};
        }
        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const editOffers = async (req, res) => {
    const { body } = req;
    try {
        const superAdminData = await adminmodels.findOne({identity: body.mBy});
        if(superAdminData) {
            const data = await adminService.editOffers(body);
            res.status(200).send({ status: "OK", data: data });
        } else {
            throw { status: 400, message: "Only Superadmin can create package"};
        }
        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOffers = async (req, res) => {
    const { body } = req;
    try {
        const superAdminData = await adminmodels.findOne({identity: body.mBy});
        if(superAdminData) {
            const data = await adminService.removeOffers(body);
            res.status(200).send({ status: "OK", data: data });
        } else {
            throw { status: 400, message: "Only Superadmin can create package"};
        }
        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getPackage = async (req, res) => {
    try {
        const data = await adminService.getPackgeList();
        res.status(200).send({ status: "OK", data: data });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOffers = async (req, res) => {
    try {
        const data = await adminService.getAllOffers();
        res.status(200).send({ status: "OK", data: data });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createRole = async (req, res) => {
    const { body } = req;
    console.log("body", body);
    let { identity, role, cBy } = body;
    try {
        let emailValid = await commonService.isEmailValid(identity);
        let userDetails = body;
        const adminData = await adminmodels.findOne({ identity: cBy });
        console.log("adminData", adminData)
        const exist = await adminmodels.findOne({identity});
        console.log("exist", exist);
        if(exist) {
            throw {
                status: 400,
                message: 'email id already exist'
            }
        }

        if (adminData.role != 'superadmin') {
            if (body.role == 'superadmin') {
                throw { status: 400, message: 'superadmin role not allowed' };
            }
        }
        if (body.role == 'user') {
            userDetails.uniqueCode = (`M${Math.random().toString(36).slice(7)}`)
            // body.uniqueCode = await ('0000'+(Math.random() * (100000 - 101) + 101)|0).slice(-5);
            if (!body.title || !body.package || !body.imageUrl || !body.region || !body.expOn) {
                throw { status: 400, message: 'parameter missing' };
            }
            let packageDetails = await packageModels.findOne({name: body.package});
            if(packageDetails) {
                userDetails.totalCount = packageDetails.lane;
            }
        }

        console.log("===========", userDetails);

        if (!emailValid) {
            throw { status: 400, message: 'invalid email' };
        }
        userDetails.password = await commonService.passwordGenerator();
        userDetails.uniqueCode = (`M${Math.random().toString(36).slice(7)}`)
        
        let link = `Please click here to downolad .exe file: ${new_line}
        "https://scan-objects-qa.s3.amazonaws.com/Temp_S3Upload/Retail_1.exe"`
        let message = `Welcome sir,${new_line}${new_line}Thank you for subscribing Axe throw subsription service.
        ${new_line}${new_line}New user credentials for AXE throw after reset request:${new_line}${new_line}
        USERNAME: ${identity}${new_line}PASSWORD: ${userDetails.password}${new_line} ${link}`
        // let mailInfo = await mailService(identity, message);
        // console.log("AdminController: createRole: Send mail ::=> : ", mailInfo)

        const { _id, password, __v, mBy, cOn, mOn, ...createdRole } = await adminService.createRole(userDetails);

        // res.status(200).send({ status: "OK", data: createdRole, message: mailInfo });
        res.status(200).send({ status: "OK", data: createdRole });
    } catch (error) {
        console.log("AdminController: createRole: Send mail error ::", error);
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const editRole = async (req, res) => {
    const { body } = req;
    console.log(body);

    try {
        if( !body.mBy ) {
            throw { status: 400, message: 'please pass modified by in request' };
        }
        const adminData = await adminmodels.findOne({ identity: body.mBy });
        if (adminData.role != 'superadmin') {
            if (body.role == 'superadmin') {
                throw { status: 400, message: 'superadmin role not allowed' };
            }
        }

        if (body.role != 'superadmin' && body.role != 'admin' && body.role != 'user' && body.role != 'distributor') {
            throw { status: 400, message: 'role not correct' };
        }

        const userDetails = {
            identity: body.identity,
            role: body.role,
            title: body.title || '',
            package: body.package || '',
            expOn: body.expOn || '',
            mBy: body.mBy || 'admin',
            imageUrl: body.imageUrl || '',
            region: body.region || ''
        };

        const editedRole = await adminService.editRole(userDetails);
        res.status(200).send({ status: "OK", data: editedRole });
    } catch (error) {
        console.log("AdminCOntroller: edit role ::", error)
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const removeUser = async (req, res) => {
    const { body } = req;
    const { identity, mBy } = body;
    try {

        let adminData = await adminmodels.findOne({ identity: mBy });
        if (adminData) {
            await adminService.removeUser(body);
            res.status(200).send({ status: "OK" });
        }
        else {
            throw { status: 400, message: 'Admin is not correct, not able to remove' };
        }

    } catch (error) {
        console.log("adminController: removeUser ::", error)
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};



module.exports = {
    login,
    getAllUsers,
    createRole,
    editRole,
    removeUser,
    getRegions,
    offers,
    getPackage,
    editOffers,
    deleteOffers,
    getOffers
}