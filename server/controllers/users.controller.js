// import User from '../models/users.model.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';

const User = require('../models/users.model.js');
const Info = require('../models/info.model.js');
const Media = require('../models/media.model.js');
const Settings = require('../models/settings.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const ObjectId = require("mongodb").ObjectId;

let defaultSettingId = "63ecb5e334248567f3f5e5ec"; // default settings id

dotenv.config();
let TOKEN_SECRET = process.env.TOKEN_SECRET;
let EMAIL = process.env.EMAIL;
let PASSWORD = process.env.PASSWORD;
let EMAILTO = process.env.EMAILTO;

// const { TOKEN_SECRET, EMAIL, PASSWORD } = dotenv.config().parsed;

const devScript = async (req, res) => {
    try {
        
        switch (req.params.key) {
            case 'renameType':{ // rename a field in all documents, from 'type' to 'memberType'
                let user = await Info.updateMany({}, { $rename: { type: 'infoType' } }, { strict: false });
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(400).json({ message: 'User not found' });
                }
            }
            break;
            case 'removeBin':{ // remove ' bin ' and ' binti ' from all names
                let users = await User.updateMany({}, { $set: { name: { $trim: { input: { $replaceOne: { input: { $replaceOne: { input: "$name", find: " bin ", replacement: " " } }, find: " binti ", replacement: " " } } } } } }, { strict: false });
                if (users) {
                    res.status(200).json(users);
                } else {
                    res.status(400).json({ message: 'User not found' });
                }
            }
            break;
            default:
                res.status(400).json({ message: 'Key not found' });
        }
                
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const read = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getSettings = async (req, res) => {
    let id = req.params.id||defaultSettingId
    try {
        const settings = await Settings.findById(id)
        res.status(200).json(settings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const saveSettings = async (req, res) => {
    try {
        await Settings.findByIdAndUpdate(req.id||defaultSettingId, 
            {...req.body, userid: req.params.userid} 
            );
        res.status(200).json({ message: 'Settings updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const readAll = async (req, res) => {
    try { // sort by rank from small to big
        const users = await User.find({}).sort({ rank: 1 }).select('-password').lean()
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const signup = async (req, res) => {
    if (process.env.CAN_REGISTER === 'true') {
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
    } else {
        res.status(400).json({ message: 'Registration is closed' });
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }).lean();
        if (!user) {
            res.status(400).json({ message: 'Username or password is incorrect' });
        } else {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Username or password is incorrect' });
            } else {
                let token = jwt.sign({ 
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    surname: user.surname,
                }, TOKEN_SECRET);
                user.password = undefined;
                user.__v = undefined;
                user.accessToken = token;
                res.status(200).json(user);
            }
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateLinks = async (req, res) => {
    try {
        await User.updateOne({ username: req.params.username }, { $set: { siteLinks: req.body } });
        res.status(200).json({ message: 'Links updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const sendEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });
        console.log("🚀 ~ file: users.controller.js ~ line 75 ~ sendEmail ~ transporter", transporter)
        const mailOptions = {
            from: EMAIL,
            to: EMAILTO,
            subject: req.body.subject||'A message from your website',
            text: req.body.message + '\n\n' + req.body.name + '\n' + req.body.email
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'Email sent' });
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateProfile = async (req, res) => {
    try { // cover and logo are coming from the form, with font and theme color fields4
        console.log("🚀 ~ file: users.controller.js ~ line 104 ~ updateProfile ~ req.body", req.body)
        console.log("🚀 ~ file: users.controller.js ~ line 104 ~ updateProfile ~ req.files", req.files)
        var body = req.body;
        let user = await User.findById(body._id);
        if (body['avatar'] === 'remove') {
            console.log("🚀 ~ file: users.controller.js ~ line 129 ~ updateProfile ~ body.avatar", body.avatar)
            await Media.findByIdAndDelete(user.avatar);
            body['avatar'] = null; 

            await User.findByIdAndUpdate(
                body._id,
                { $set: body },
                { new: true }
            ).then((user) => {
                // convert user to json
                let userx = user.toJSON(); 
                
                let token = jwt.sign({ _id: userx._id }, TOKEN_SECRET);
                userx.password = undefined;
                userx.__v = undefined;
                userx.accessToken = token;
                res.status(200).json(userx);
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (['null', 'undefined', ''].includes(body['avatar'])) {
            console.log("🚀 ~ file: users.controller.js ~ line 129 ~ updateProfile ~ body.avatar", body.avatar)
            body['avatar'] = user.avatar;

            await User.findByIdAndUpdate(
                body._id,
                { $set: body },
                { new: true }
            ).then((user) => {
                let userx = user.toJSON();
                let token = jwt.sign({ _id: userx._id }, TOKEN_SECRET);
                userx.password = undefined;
                userx.__v = undefined;
                userx.accessToken = token;
                res.status(200).json(userx);
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log("🚀 ~ file: users.controller.js ~ line 129 ~ updateProfile ~ body.avatar", body.avatar)
            await Media.insertMany([{
                ...req.files.avatar[0],
                type: req.files.avatar[0].mimetype.split('/')[0],
                extension: req.files.avatar[0].mimetype.split('/')[1],
                url: req.files.avatar[0].path,
                userid: user._id,
                username: user.username,
            }]).then((media) => {
                console.log("🚀 ~ file: users.controller.js:170 ~ updateProfile ~ media:", media)
                User.findByIdAndUpdate(
                    body._id,
                    { $set: { ...body, avatar: media[0]._id } },
                    { new: true }
                ).then((user) => {
                    let userx = user.toJSON();
                    let token = jwt.sign({ _id: userx._id }, TOKEN_SECRET);
                    userx.password = undefined;
                    userx.__v = undefined;
                    userx.accessToken = token;
                    res.status(200).json(userx);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
        
}

const createMember = async (req, res) => {
    console.log("🚀 ~ file: users.controller.js ~ line 193 ~ createMember ~ req.body", req.body)
    console.log("🚀 ~ file: users.controller.js ~ line 193 ~ createMember ~ req.files", req.files)
    try {
        let username = 'user'+Math.random().toString(36).substring(7);
        let userId = new ObjectId();
        if(req.files.avatar) {
            Media.insertMany([{
                ...req.files.avatar[0],
                type: req.files.avatar[0].mimetype.split('/')[0],
                extension: req.files.avatar[0].mimetype.split('/')[1],
                url: req.files.avatar[0].path,
                userid: userId,
                // add a random string to the username to make it unique
                username: username,
            }]).then((media) => {
                req.body.avatar = media[0]._id;
                User.create({
                    ...req.body,
                    _id: userId,
                    username: username,
                }).then((user) => {
                    res.status(200).json(user);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            if(req.body.avatar === 'remove' || req.body.avatar.length !== 24) delete req.body.avatar;
            // unique-fy username with a trailing number given that the body.username is empty/null
            if(!req.body.username) {
                let users = await User.find({ username: { $regex: username, $options: 'i' } });
                if(users.length > 0) {
                    username = username + users.length;
                }
                req.body.username = username;
                req.body._id = userId;
            }

            User.create(req.body).then((user) => {
                res.status(200).json(user);
            }).catch((err) => {
                console.log(err);
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateMember = async (req, res) => {
    try { // cover and logo are coming from the form, with font and theme color fields4
        console.error("🚀 ~ file: users.controller.js ~ line 104 ~ updateProfile ~ req.body", req.body)
        console.error("🚀 ~ file: users.controller.js ~ line 104 ~ updateProfile ~ req.files", req.files)
        var body = req.body;
        let userJson = await User.findById(body._id).lean();
        if (body['avatar'] === 'remove') {
            console.error("here remove")
            await Media.findByIdAndDelete(userJson.avatar);
            body['avatar'] = null; 

            await User.updateOne({ _id: body._id },
                { $set: body },
                { new: true, upsert: true } 
            ).then((user) => {
                res.status(200).json(user);
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (!req.files.avatar || body['avatar']?.length == 24) {
            console.error("here update")
            if (['null', 'undefined', ''].includes(body['avatar'])) delete body['avatar'];
            else body['avatar'] = userJson.avatar;
            console.log("🚀 ~ file: users.controller.js:318 ~ updateMember ~ body:", body)

            let user = await User.updateOne({ _id: body._id },
                { $set: body },
                { new: true, upsert: true }
                ).lean().catch((err) => {
                    console.log(err);
                });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: 'User not found' });
            }
        }
        else {
            console.error("here create")
            if(req.files.avatar) {
                console.error("here create 2")
                await Media.insertMany([{
                    ...req.files.avatar[0],
                    type: req.files.avatar[0].mimetype.split('/')[0],
                    extension: req.files.avatar[0].mimetype.split('/')[1],
                    url: req.files.avatar[0].path,
                    userid: userJson._id,
                    username: userJson.username,
                }]).then((media) => {
                    User.updateOne({ _id: body._id },
                        { $set: { ...body, avatar: media[0]._id } },
                        { new: true, upsert: true } 
                    ).then((user) => {
                        res.status(200).json(user);
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                console.error("here create 3")
                User.updateOne({ _id: body._id },
                    { $set: body },
                    { new: true, upsert: true } 
                ).then((user) => {
                    res.status(200).json(user);
                }).catch((err) => {
                    console.log(err);
                });

            }
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
        
}
// export default { 
module.exports = {
    devScript,
    read,
    readAll,
    signup,
    updateLinks,
    login,
    sendEmail,
    updateProfile,
    createMember,
    updateMember,
    getSettings,
    saveSettings,
};