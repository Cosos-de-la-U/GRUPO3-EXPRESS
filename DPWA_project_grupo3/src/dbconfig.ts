import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/usuariosDPWA')
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));