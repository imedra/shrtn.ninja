mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const app = express();

const DATABASE = "Your MangoDB link here"
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.log("Connection error 404: Mongoose" + err.message);
});

mongoose.connection.once('open', () => {
  console.log("Established connection to MongoDB");
});

require('./models/Url.js');
require('./models/Url.js');
app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));

const Url = mongoose.model('Url');

app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('./views/home.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Route not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
})

app.get('/:route', async (req, res) => {
  const route = req.params.route;
  const instance = await Url.findOne({id: route});
  if(instance) {
    await instance.save();
    res.redirect(`${instance.url}`)
  } else {
    res.send("shrtn.ninja - error code (404 not found)")
  }
})

app.post('/', async (req, res) => {
  const url = req.body.url;
  const instance = new Url({
    url: url,
    visitors: 0
  });
  short = JSON.stringify(instance._id)
  const id = short.slice(short.length-7, short.length-1)
  instance.id = id;
  await instance.save()
  res.send({
    message: `${id} was created`,
    url: `${id}`,
  });
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Listening on port 8000');
})