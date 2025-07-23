const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, './.env') });

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONN+"/Amazon_Music",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
},()=>{
    console.log("Database connected")
},(e)=>{
    console.error(e)
});

const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

let userRouter = require('./routes/user');
let playlistRouter = require('./routes/playlist');
let authuser = require('./routes/auth');
let songsRouter = require('./routes/songs');
let chartRouter = require('./routes/chart');
let albumRouter = require('./routes/album');

app.use('/user', userRouter);
app.use('/playlist', playlistRouter);
app.use('/songs', songsRouter);
app.use('/chart', chartRouter);
app.use('/album', albumRouter);
app.use('/', authuser);

