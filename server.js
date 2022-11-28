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
    res.render('index.ejs');
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
    if (req.body.completedHike === 'on') {
        req.body.completedHike = true;
    } else {
        req.body.completedHike = false;
    };
    //selecting the radio button function goes here
    Hike.create(req.body, (error, HikeCompleted) => {
        //redirecting to the show route
        res.redirect('/hike')
    });
});


//edit route
app.get('/hike/:id/edit', (req, res) => {
    Hike.findById(req.params.id, (error, foundhikes) => {
        res.render('edit.ejs', {
            hiking: foundhikes
        });
    });
});

//second part of update route
app.put('/hike/:id', (req, res) => {
    Hike.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, foundhikes) => {
        res.redirect('/hike');
    });
});


//delete route
app.delete('/hike/:id', (req, res) => {
    Hike.findByIdAndRemove(req.params.id, (error, hikeData) => {
        res.redirect('/hike');
    });
});

//show route
app.get('/hike/:id', (req, res) => {
    Hike.findById(req.params.id, (error, completedHike) => {
        res.render('show.ejs', {
            hikers: completedHike
        })
    });
});

/////////LISTENING PORTS///////////////////
app.listen(PORT, () => {
    console.log('listening');
});

mongoose.connect('mongodb+srv://evrouge:CgmgSg70vGRMtIqw@cluster0.ehndsmy.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
});
