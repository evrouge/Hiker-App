const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Hike = require('./models/hikeschema.js');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let PORT = 3000;
if (process.env.PORT) {
    PORT = process.env.PORT
}
///////////////////////////////

//main route
app.get('/', (req, res) => {
    res.send('heyyyy');
})

//index route
app.get('/hike', (req, res) => {
    Hike.find({}, (error, allhikes) => {
        res.render('index.ejs', {
            hikes: allhikes
        })
    })
})

//new route
app.get('/hike/new', (req, res) => {
    res.render('new.ejs');
})

//completed button / create post route
app.post('/hike', (req, res) => {
    //if button selected, hike has been completed
    if (req.body.completed == 'on') {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }
    if (req.body.easy === 'on') {
        req.body.rating = "rated easy";

    } else if (req.body.moderate === 'on') {
        req.body.rating = "rated moderate";

    } else if (req.body.difficult === 'on') {
        req.body.rating = "rated difficult";
    }
    Hike.create(req.body, (error, HikeCompleted) => {
        //redirecting to the show route
        res.redirect('/hike')
    });
});
//index route was here///

//edit route


//second part of update route


//delete route
app.delete('/hike/:id', (req, res) => {
    Hike.findByIdAndRemove(req.params.id, (error, hikeData) => {
        res.redirect('/hike');
    })
})

//show route
app.get('/hike/:id', (req, res) => {
    Hike.findById(req.params.id, (error, foundHike) => {
        res.render('show.ejs', {
            hikes: foundHike
        })
    });
});

/////////LISTENING PORTS///////////////////
app.listen(PORT, () => {
    console.log('listening');
})

mongoose.connect('mongodb+srv://evrouge:CgmgSg70vGRMtIqw@cluster0.ehndsmy.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
})




//////////////GRAVEYARD////////////////
