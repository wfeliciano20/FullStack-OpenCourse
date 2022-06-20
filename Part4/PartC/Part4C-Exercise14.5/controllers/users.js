const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async(req, res) => {
    const users = await User.find({}).populate('blogs',{title:1,url:1,likes:1}).exec();
    res.json(users);
});

usersRouter.post('/', async(req, res) => {
    const { username, name, password } = req.body;


    const users = await User.find({}).exec();
    const notUnique = users.find(u => u.username === username);
    console.log(notUnique);
    if (notUnique) {
        res.status(400).json({ error: 'username must be unique' });

    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({
            username,
            name,
            passwordHash:hash,
        });
                        
        const savedUser = await user.save();

        res.status(201).json(savedUser);
                    
                
    }
});





module.exports = usersRouter;