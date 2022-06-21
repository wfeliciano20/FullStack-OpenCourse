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
    
    if (!username || !password) {
        res.status(400).json({ error: 'username and password are required' });
    }
    else if (name.length < 3) {
        res.status(400).json({ error: 'name must be at least 3 characters long' });
    }
    else if (password.length < 3) {
        res.status(400).json({ error: 'password must be at least 3 characters long' });
    }
    else if (notUnique) {
        res.status(400).json({ error: 'username must be unique' });

    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({
            username,
            name,
            passwordHash: hash,
        });
            
        const savedUser = await user.save();
        

        res.status(201).json(savedUser);          
    }
});





module.exports = usersRouter;