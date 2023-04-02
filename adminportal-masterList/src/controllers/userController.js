const userService = require("../services/userService");
const adminService = require("../services/adminService");

const userLogin = async (req, res) => {
    const { body } = req;
    if(!body.identity || !body.password) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                        "username or password is empty",
                },
            });
        return;
    }

    const userDetails = {
        identity: body.identity,
        password: body.password,
        role: 'user',
        status: 'active',
        isLogged: false
    };
    try {
        const loginChecked = await adminService.login(userDetails);
        res.status(200).send({data: loginChecked });
    } catch (error) {
        console.log("userController: userLogin ::", error);
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const sendUpadte = async (req, res) => {
    try {
        await adminService.sendUpadte(req);
        res.status(200).send({status: "OK"});
    } catch(error) {
        console.log("userController: sendUpdate ::", error)
        throw error;
    }
    
};

const status = async (req, res) => {
    const { identity, isLogged  } = req.body;
    try {
        const data = await adminService.checkStatus(identity, isLogged);
        res.status(200).send({ status: "OK", data: data });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const masterList = async (req, res) => {
    try {
        const masterListData = await adminService.getMasterList();
        res.status(200).send({masterListData});
    }
    catch (error) {
        res.status(error?.status || 500).send({status: "failed", data: {error: error?.message || error}})
    }
    
};


const masterUpdate = async (req, res) => {
    try {
        const masterListData = await adminService.masterUpdatData(req.body);
        res.status(200).send({masterListData});
    }
    catch (error) {
        res.status(error?.status || 500).send({status: "failed", data: {error: error?.message || error}})
    }
    
};

const getAvailableCount = async (req, res) => {
    try {
        const masterListData = await adminService.getAvailableData(req.body);
        res.status(200).send({masterListData});
    }
    catch (error) {
        res.status(error?.status || 500).send({status: "failed", data: {error: error?.message || error}})
    }
    
};

const analytics = async (req, res) => {
    try {
        await adminService.storeAnalytics(req);
        res.status(200).send({status: "OK"});
    } catch(error) {
        console.log("userController: analytics ::", error)
        throw error;
    }
}

module.exports = {
    userLogin,
    sendUpadte,
    analytics,
    status,
    masterList,
    masterUpdate,
    getAvailableCount,
}