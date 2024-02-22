const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.text({ type: 'text/html' }));

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Databse Connected Successfully!!');
  })
  .catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const UserRoute = require('./routes/UserRoutes');
app.use('/user', UserRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
