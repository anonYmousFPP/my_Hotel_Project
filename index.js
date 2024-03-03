const express = require('express')
const app = express();
const db = require('./db');

require('dotenv').config();

const PORT = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/person.route');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menu.route');
app.use('/menu', menuRoutes);

app.get('/person', function(req, res){
    res.send('Welcome to my hotel')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})