import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoute from './routes/users.route.js';
import propertyRoute from './routes/property.route.js';
import contractRoute from './routes/contract.route.js';
import entryRoute from './routes/entry.route.js';

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/users', userRoute);
app.use('/properties', propertyRoute);
app.use('/contracts', contractRoute);
app.use('/entries', entryRoute);

const CONNECTION_URL = 'mongodb+srv://ahsan_online:LPdMwnQGVCzZ4mot@cluster0.kk3fq.mongodb.net/housedocs?retryWrites=true&w=majority'
const port = process.env.PORT || 3000;
// mongoose.connect('mongodb://localhost/test');
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Database is connected');
//     }).catch(err => {
//         console.log('Database connection error');
//         console.log(err.message);
//     });
// mongoose.set('useFindAndModify', false);

mongoose.connect(CONNECTION_URL).then(() => {console.log('Database is connected')}).catch(err => {console.log('Database connection error')});


app.get('/', (req, res) => {
    res.send('Hello World!');
});
// app.get('/users/:username', (req, res) => {
//     UserModel.findOne({username: req.params.username}, (err, users) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(users);
//         }
//     });
// });

// app.post('/users', (req, res) => {
//     const user = new UserModel(req.body);
//     user.save((err, user) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(user);
//         }
//     });
// });

app.listen(5000, () => { 
    console.log('Server is running on port 5000');
});