const adminmodels = require("../schema/admin.schema");
const packagemodels = require("../schema/package.schema");

async function createAdmin(adminDetails) {
    console.log("admin", adminDetails);
    try {
        adminDetails.cOn = new Date().toISOString();
        console.log("adminModel: createAdmin :: adminDetails => ", adminDetails)
        const newAdmin = new adminmodels(adminDetails);
        await newAdmin.save();
        return newAdmin.toJSON();
    } catch (error) {
        console.log("adminModel: createAdmin:: in Catch error: => ", error);
        throw error;
    }
}

async function statusChecked(identity, isLogged) {
    try {
        return await adminmodels.updateOne(
            { identity }, 
            { $set: { isLogged: isLogged } }, 
            { upsert: true });
    } catch (error) {
        console.log("adminModel: statusChecked:: ", error);
        throw error;
    }
}

async function roleEdited(adminDetails) {
    try {
        const { identity, role, title, expOn, mBy, package, imageUrl, region } = adminDetails;

        let adminData = await adminmodels.findOne({ identity });

        role ? role : adminData.role;
        title ? title : adminData.title;
        expOn ? expOn : adminData.expOn;
        package ? package : adminData.package;
        imageUrl ? imageUrl : adminData.imageUrl;
        region ? region : adminData.region;

        // delete adminDetails['identity'];
        return await adminmodels.updateOne(
            { identity }, 
            { $set: { role, mBy, title, expOn, package, imageUrl, region } }, 
            { upsert: true }
            );
    } catch (error) {
        console.log("adminModel: edit role::", error);
        throw error;
    }
}

async function getAdmin(query) {
    try {
        let skip = query.skip ? query.skip : 0;
        let limit = query.limit ? query.limit : 10;
        let search = query.search ? query.search : {};
        if (search.length > 0) {
            search = { $and: 
                [{ $or: [{ "identity": { $regex: search } }, 
                { "role": { $regex: search } }] }] }
        }
        let sort = query.sort
        const adminData = await adminmodels.
            find({ $and: [search, { status: 'active' }] }, { _id: 0, __v: 0, password: 0 })
            .sort(sort)
            .skip(skip)
            .limit(limit);
        const totalCount = await adminmodels.countDocuments({ status: 'active' });
        let data = { adminData, totalCount }
        return data;

    } catch (error) {
        console.log("adminModel: getAdmin ::", error);
        throw error;
    }
}

async function getRegions(query) {
    try {
        //TO_CHECK
        // const adminData = adminmodels.distinct('region', { $or: [{ mBy: query }, { cBy: query }] })
        const adminData = adminmodels.distinct('region', { $or: [
            { mBy: query }, { cBy: query }, { identity: query }
        ] })
        return adminData;
    } catch (error) {
        console.log("adminModel: getRegions::", error);
        throw error;
    }
}

async function loginChecked(userDetails) {
    const { identity } = userDetails;
    let adminData;
    console.log("userRole", userDetails);
    let packageData;

    try {
        if (userDetails.role) {
            adminData = await adminmodels.findOne(userDetails, { password: 0, _id: 0, __v: 0 });
            if(adminData) {
                packageData = await packagemodels.findOne({ name: adminData.package });
                adminData.packageData = packageData;
            }
            
        } else {
            adminData = await adminmodels.findOne(
                {
                    $and:
                        [userDetails,
                            { $or: [{ role: { $in: ['superadmin', 'admin', 'distributor', 'user'] } }] }]
                },
                { password: 0, _id: 0, __v: 0 }
            );
        }
        console.log("userAdmin", adminData, identity);
        if (adminData) {
            await adminmodels.updateOne(
                { identity }, 
                { $set: { isLogged: true } });
            const {name, lane, games} = packageData;
            adminData.packageName = name
            adminData.lane = lane;
            adminData.games = games;   
            return adminData;
        } else {
            return false;
        }
    } catch (error) {
        console.log("adminModel: loginChecked::", error)
        throw error;
    }
}

async function removeAdmin(adminDetails) {
    const { identity, mBy } = adminDetails;
    try {
        await adminmodels.updateOne(
            { identity }, 
            { $set: { status: 'inactive', mBy: mBy } });
        return true
    } catch (error) {
        console.log("adminModel: removeAdmin::", error);
    }
}



module.exports = {
    createAdmin,
    getAdmin,
    getRegions,
    loginChecked,
    removeAdmin,
    roleEdited,
    statusChecked
}