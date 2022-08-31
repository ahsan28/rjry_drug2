import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoute from './routes/users.route.js';
import mediaRoute from './routes/media.route.js';
import dataRoute from './routes/data.route.js';


const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/', dataRoute);
app.use('/users', userRoute);
app.use('/media', mediaRoute);

const CONNECTION_URL = 'mongodb+srv://root:LPdMwnQGVCzZ4mot@cluster0.t82p2.mongodb.net/?retryWrites=true&w=majority'
const port = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL).then(() => {console.log('Database is connected')}).catch(err => {console.log('Database connection error')});

// // demo: test connection
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


app.listen(port, () => { 
    console.log('Server is running on port 5000');
});