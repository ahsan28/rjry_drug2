const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/users.route.js');
const mediaRoute = require('./routes/media.route.js');
const infoRoute = require('./routes/info.route.js');
const dataRoute = require('./routes/data.route.js');
const activityRoute = require('./routes/activity.route.js');
const dotenv = require('dotenv');

dotenv.config();

let PORT = process.env.PORT || 5001;
console.error("log: PORT index.js:13 ~ process.env", process.env.PORT)
let MONGO_URL = process.env.MONGO_URL3 || 'mongodb://localhost:27017/medias';
// const { PORT, MONGO_URL } = dotenv.config().parsed;

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/data', dataRoute);
app.use('/users', userRoute);
app.use('/info', infoRoute);
app.use('/media', mediaRoute);
app.use('/activity', activityRoute);

mongoose.connect(MONGO_URL).then(() => {console.error('Log:Database is connected')}).catch(err => {console.error('errLog:Database connection error')});

// // demo: test connection
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => { 
    console.error('log:Server is running on port 5000');
});