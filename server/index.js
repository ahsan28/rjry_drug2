const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users.model');


// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb+srv://ahsan_online:LPdMwnQGVCzZ4mot@cluster0.kk3fq.mongodb.net/housedocs?retryWrites=true&w=majority');



app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/users/:username', (req, res) => {
    UserModel.findOne({username: req.params.username}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.send(users);
        }
    });
});

app.post('/users', (req, res) => {
    const user = new UserModel(req.body);
    user.save((err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    });
});

app.listen(3001, () => { 
    console.log('Server is running on port 3001');
});