require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')
const middleware = morgan('tiny')
app.use(middleware)
app.use(cors())
app.use(express.static('dist'))

const User = require('./models/users')
const ticketMaster = require('./services/ticketMaster')
const path = require('path')
require('dotenv').config({
    override: true,
    path: path.join(__dirname,'.env')
})


const {google} = require('googleapis');


//code for loggin in
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

app.get('/',(req,res)=>{
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.redirect(url);
})

app.get('/redirect',(req,res)=>{
  const code = req.query.code;
  oauth2Client.getToken(code, (err,tokens)=>{
    if(err){
      console.error("Could\'t get token", err);
      res.send('Error');
      return;
    }
    else{
      oauth2Client.setCredentials(tokens);
      res.send("Succesfully logged in");
    }
  });
})

//endpoints for calendar
//get 10 events in calendar
app.get('/calendar', (req,res)=>{
  const calendar = google.calendar({version: 'v3', auth});
  const list = calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = list.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
  res.json(events);
})



/*
//As a developer, you should write your code to handle the case where a refresh token is no longer working.
oauth2Client.setCredentials({
  refresh_token: `STORED_REFRESH_TOKEN`
});*/


app.get('/api/users', (request, response) => {
    User.findAll().then(users => {
      response.json(users);
    })
})

app.use("/api/data",ticketMaster)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})