const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/person.route');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menu.route');
app.use('/menu', menuRoutes);

app.get('/person', function(req, res){
    res.send('Welcome to my hotel')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})