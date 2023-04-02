const usermodels = require("../schema/users.schema");
    async function createUsers(userDetails) {
        const newUser = new usermodels(userDetails);
        await newUser.save();
        return newUser.toJSON();
    }

    async function getUsers(query) {
        let skip = query.skip ? query.skip: 0;
        let limit = query.limit ? query.limit : 10;
        let search = query.search  ? query.search : {};
        if(search.length > 0) {
            search = {$or:[{"identity": {$regex:search}},{"role": {$regex:search}}]}
        }
        
        let sort = query.sort
        const userData = await usermodels.
        find(search,{_id:0,__v:0})
            .sort(sort)
            .skip(skip)
            .limit(limit);
        return userData;
    }

module.exports = {
    createUsers,
    getUsers
}