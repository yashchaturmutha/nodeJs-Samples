const db = require("../database/db");
const { createAdmin, getAdmin, loginChecked, removeAdmin, roleEdited, getRegions, statusChecked } = require("../database/models/adminModel");
const adminModels = require("../database/schema/admin.schema");
const { mailService } = require("../services/mailService");
const { v4: uuid } = require('uuid');
const packageModels = require("../database/schema/package.schema");


const login = async (userDetails) => {
    try {
        userDetails.status = 'active';
        let userData = await loginChecked(userDetails);
        return userData;

    } catch (error) {
        console.log("AdminService: login ::", error);
        throw error;
    }
};

const getAllUsers = async (query) => {
    try {
        return await getAdmin(query)
    } catch (error) {
        console.log("AdminService: getAllUsers ::", error)
        throw error;
    }
};

const getAllRegions = async (query) => {
    try {
        return await getRegions(query)
    } catch (error) {
        console.log("AdminService: getAllRegions ::", error)
        throw error;
    }
};

const getAllOffers = async () => {
    try {
        const offerData = packageModels.find({});
        return offerData;
    } catch (error) {
        console.log("AdminService: getAllRegions ::", error)
        throw error;
    }
};

const getPackgeList = async () => {
    try {
        const packageData = packageModels.distinct('name')
        return packageData;
    } catch (error) {
        console.log("AdminService: getAllRegions ::", error)
        throw error;
    }
};

const createRole = async (userDetails) => {
    try {
        userDetails._id = `a-${uuid()}`
        userDetails.isLogged = false;
        userDetails.status = 'active';
        userDetails.mBy = userDetails.cBy;
        return await createAdmin(userDetails);
    } catch (error) {
        console.log("AdminService: createRole ::", error);
        throw error;
    }
};

const checkStatus = async (identity, isLogged) => {
    try {
        return await statusChecked(identity, isLogged);
    } catch (error) {
        console.log("AdminService: checkStatus ::", error);
        throw error;
    }
};

const editRole = async (userDetails) => {
    try {
        return await roleEdited(userDetails);
    } catch (error) {
        console.log("AdminService: EditRole ::", error);
        return ({ status: "failed", message: "role not edited" });
    }
};

const removeUser = async (userDetails) => {
    userDetails.status = 'active';
    try {
        return await removeAdmin(userDetails);
    } catch (error) {
        console.log("AdminService: removeUser ::", error);
        throw error;
    }
};

const sendUpadte = async (userDetails) => {
    try {
        const distinctEmail = await adminModels.distinct("identity");
        console.log("adminService: sendUpdate :: distinct email =>", distinctEmail);
        let mailInfo = await mailService(distinctEmail, "hello");
        // await sendUpadteVia(userDetails);
        return mailInfo;
    } catch (error) {
        console.log("AdminService: sendUpdate ::", error);
        throw error;
    }
};

const createOffers = async (data) => {
    try {
        data._id = `p-${uuid()}`;
        data.cOn = new Date().toISOString();
        data.mBy = data.cBy;
        const newPackage = new packageModels(data);
        await newPackage.save();
        return newPackage.toJSON();

    } catch (error) {
        console.log("AdminService: createOffers ::", error);
        throw error;
    }
};

const editOffers = async (data) => {
    const { oldName } = data
    try {
        const updatedPackage = await packageModels.updateOne(
            { name: oldName }, 
            { $set: { options: data.options, mBy: data.mBy } });
        return updatedPackage;

    } catch (error) {
        console.log("AdminService: editOffers ::", error);
        throw error;
    }
};

const removeOffers = async (data) => {
    try {
        const package = await packageModels.deleteOne({ name: data.name });
        return package;
    } catch (error) {
        console.log("AdminService: removeOffers ::", error);
        throw error;
    }
};

const storeAnalytics = async (data) => {
    try {
        // return await saveAnaltics(data);
    } catch (error) {
        console.log("AdminService: storeAnalytics ::", error);
        throw error;
    }
};

const getMasterList = async () => {
    try {
        // const masterListData = await adminModels.find({isLogged: true, role:'user', status: 'active'}, { identity: 1});
        const masterListData = await adminModels.find({isLogged: true, role: 'user'}, { identity: 1, _id:0, uniqueCode:1, package:1, availableCount: 1, totalCount: 1, availableLane:1});
        // console.log("masterListData", masterListData)
        return masterListData;
    } catch (error) {
        console.log("AdminService: getMasterList ::", error);
        throw error;
    }
};

const masterUpdatData = async (body) => {
    try {
        console.log("=====body", body);
        // const masterListData = await adminModels.find({isLogged: true, role:'user', status: 'active'}, { identity: 1});
        // const masterListData = await adminModels.find({isLogged: true, role: 'user'}, { identity: 1, _id:0, uniqueCode:1});
        const masterListData = await adminModels.updateOne({identity:body.identity}, {$set:{availableLane: body.availableLane}});
        // console.log("masterListData", masterListData)
        return masterListData;
    } catch (error) {
        console.log("AdminService: masterUpdateData ::", error);
        throw error;
    }
};

const getAvailableData = async (body) => {
    try {
        // const masterListData = await adminModels.find({isLogged: true, role:'user', status: 'active'}, { identity: 1});
        // const masterListData = await adminModels.find({isLogged: true, role: 'user'}, { identity: 1, _id:0, uniqueCode:1});
        const masterListData = await adminModels.findOne({identity:body.identity}, {identity: 1, _id:0, uniqueCode: 1, totalCount:1, availableCount: 1, package: 1});
        // console.log("masterListData", masterListData)
        return masterListData;
    } catch (error) {
        console.log("AdminService: getAvailableDataList ::", error);
        throw error;
    }
};



module.exports = {
    login,
    getAllUsers,
    getAllRegions,
    createRole,
    editRole,
    removeUser,
    sendUpadte,
    storeAnalytics,
    checkStatus,
    createOffers,
    getAllOffers,
    removeOffers,
    editOffers,
    getPackgeList,
    getMasterList,
    masterUpdatData,
    getAvailableData,
};