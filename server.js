const express = require('express');
const mongoose = require('mongoose');
const Hike = require('./models/hikeschema.js');
const app = express();

app.use(express.static('public'));

let PORT = 3000;
if (process.env.PORT) {
    PORT = process.env.PORT
}
///////////////////////////////

//main page route
app.get('/', (req, res) => {
    res.send('hi');
})

//index route


//new route


//create post route


//edit route


//second part of update route


//delete route


//show route




/////////LISTENING PORTS///////////////////
app.listen(PORT, () => {
    console.log('listening');
})

mongoose.connect('mongodb+srv://evrouge:CgmgSg70vGRMtIqw@cluster0.ehndsmy.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
})
