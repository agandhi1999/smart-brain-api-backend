const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
// Running the knex function
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,  
    ssl: true
  }
    // port : 5432, 
    // user : 'postgres',
    // password : 'test',
    // database : 'smart-brain'
  
});

// db.select('*').from('users').then(data=>{
// 	console.log(data);
// })

const app = express();
app.use(cors());

app.use(bodyParser.json());


app.get('/', (req, res)=>{res.send('success')});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});



// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
});

/*
/--> res = this is working
/signin --> POST = success/fail (We use POST not PUT because we want the password to be in the body of the request, not the query string, ideally over https to protect from man in the middle attacks)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/