const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-thinking', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);
db.once("open",() =>{
  app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
})

