const User = require('../models/user');

const usersInDb = async () => {
    const response = await User.find({}).exec();
    const users = response.map(u => u.toJSON());
    console.log(users);
    return users;
};

module.exports ={
    usersInDb
};