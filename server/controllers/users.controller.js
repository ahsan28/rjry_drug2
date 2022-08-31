import User from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const { TOKEN_SECRET } = dotenv.config().parsed;


const read = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const signup = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const newUser = await User.create({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                address: req.body.address,
                about: req.body.about
            });
            res.status(201).json(newUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(400).json({ message: 'Username or password is incorrect' });
        } else {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Username or password is incorrect' });
            } else {
                const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
                res.header('auth-token', token).send(token);
            }
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


export default { 
    read,
    signup,
    login
    
};