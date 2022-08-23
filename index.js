const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'templates')) // Set the views directory

// MONGO DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/intern', { useNewUrlParser: true }); // intern is db name
// URL ENCODIND
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const UserSchema = new mongoose.Schema({
    Uid: String
});

const User_id = mongoose.model('User_id', UserSchema);

app.get('/', (req, res) => {

    res.status(200).render('index.pug');
})


app.post('/', (req, res) => {
    let myData = new User_id(req.body);
    User_id.findOne({ Uid: myData.Uid}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else if (docs) {
            res.send("Please provide a unique user id ")
        }
        else{
            myData.save()
            res.send("This item has been saved to the database")
        }
    });
    // if (User_id.find({ Uid: /myData.Uid/ })) {
    //     res.send("Please provide a unique user id ")
    // }
    
    // myData.save()
    // res.send("This item has been saved to the database")
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});