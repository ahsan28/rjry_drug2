// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');


dotenv.config();
let TOKEN_SECRET = process.env.TOKEN_SECRET;
// const { TOKEN_SECRET } = dotenv.config().parsed;

function verifyJWT(req, res, next) {
    console.log('verifyJWT');
    const token = req.header('x-access-token');
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ auth: false, message: 'Token is not valid' });
    }
}

// export default verifyJWT ;
module.exports = verifyJWT