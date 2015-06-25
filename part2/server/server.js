var express = require('express'),
  cors = require('cors'), // https://www.npmjs.com/package/cors#usage
  app = express();

app.use(cors());

var attendants = [
  { id: 1, firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
];

app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.send('Welcome to attendants REST API server');
});

app.get('/attendants', function(req, res) {
  res.json({ attendants: attendants });
});

app.get('/attendants/:id', function(req, res) {
  if (req.params.id < 0 || req.params.id > attendants.length) {
    res.statusCode = 404;
    return res.send('Error 404: No attendant found');
  }

  var q = attendants[req.params.id - 1];
  res.json({ attendant: q });
});

app.post('/attendants', function(req, res) {
	var attendantPayload = req.body.attendant;
  if (!attendantPayload || !attendantPayload.firstName || !attendantPayload.email) {
    res.statusCode = 400;
    return res.send('Error 400: First Name and email are required.');
  }

  var attendant = {
    id: attendants.length + 1,
    firstName : attendantPayload.firstName,
    lastName : attendantPayload.lastName,
    email : attendantPayload.email
  };

  attendants.push(attendant);
  res.json({ attendant: attendant });
});

app.delete('/attendants/:id', function(req, res) {
  if (req.params.id > attendants.length) {
    res.statusCode = 404;
    return res.send('Error 404: No attendant found');
  }

  attendants.splice(req.params.id - 1, 1);
  res.json(true);
});

app.listen(3000);
console.log('listening on port 3000');
