const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels'
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to mongoDb');
});

db.on('disconnected', () => {
    console.log('Dis-Connected to mongoDb');
});

db.on('error', () => {
    console.log('error in mongoDb');
});

module.exports = db;