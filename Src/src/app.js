const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); 
const userRouter = require('./routes/user');

app.use(cors());

app.use(express.json());
app.use('/', userRouter);

const mongoURI = 'mongodb+srv://murimamello:CTfN3Vb6xHL4UHgt@cluster0.rgum2hm.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(mongoURI)
    .then(() => {
        app.listen(7000);
        console.log('Connected to the database!');
    })
    .catch((err) => console.log(err));
