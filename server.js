const express = require('express');
const mongoose = require('mongoose');
const Hike = require('./models/hikeschema.js');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let PORT = 3000;
if (process.env.PORT) {
    PORT = process.env.PORT
}
///////////////////////////////

//main page route
// app.get('/', (req, res) => {
//     res.redirect('/hike/new');
// })

//index route


//new route
app.get('/', (req, res) => {
    res.render('index.ejs');
})

//create post route // radio rating buttons
// app.post('/hike/', (req, res) => {

app.post('/hike', (req, res) => {
    if (req.body.completed == 'on') {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }
    Hike.create(req.body, (error, HikeCompleted) => {
        res.redirect('/hike');
    })
})

app.post('/hike', (req, res) => {
    if (req.body.easy === 'on') {
        req.body.rating = "rated easy";

    } else if (req.body.moderate === 'on') {
        req.body.rating = "rated moderate";

    } else if (req.body.difficult === 'on') {
        req.body.rating = "rated difficult";
    }
    Hike.create(req.body, (error, createdHike) => {
        res.redirect('/hike');
    })
});




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








//////////////GRAVEYARD////////////////

//if (req.body.ratingEasy === 'checked') {
//         req.body.ratingEasy = true;
//     } else {
//         req.body.ratingEasy = false;
//     }
//     Hike.create(req.body, (error, createdHike) => {
//         res.send(createdHike)
//     })
//     if (req.body.ratingModerate === 'checked') {
//         req.body.ratingModerate = true;
//     } else {
//         req.body.ratingModerate = false;
//     }
//     Hike.create(req.body, (error, createdHike) => {
//         res.send(createdHike)
//     })
//     if (req.body.ratingDifficult === 'checked') {
//         req.body.ratingDifficult = true;
//     } else {
//         req.body.ratingDifficult = false;
//     }
//     Hike.create(req.body, (error, createdHike) => {
//         res.send(createdHike)
//     })
// });
