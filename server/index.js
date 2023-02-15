import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoute from './routes/users.route.js';
import mediaRoute from './routes/media.route.js';
import dataRoute from './routes/data.route.js';
// import .env
import dotenv from 'dotenv';
dotenv.config();

let PORT = process.env.PORT || 5001;
console.log("🚀 ~ file: index.js:13 ~ process.env", process.env)
let MONGO_URL = process.env.MONGO_URL3 || 'mongodb://localhost:27017/medias';
// const { PORT, MONGO_URL } = dotenv.config().parsed;

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/', dataRoute);
app.use('/users', userRoute);
app.use('/media', mediaRoute);

mongoose.connect(MONGO_URL).then(() => {console.log('Database is connected')}).catch(err => {console.log('Database connection error')});

// // demo: test connection
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


app.listen(PORT, () => { 
    console.log('Server is running on port 5000');
});