const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Включення CORS для всіх маршрутів
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/events', (req, res) => {
    let event = {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        image_url: req.body.image_url
    };
    let sql = 'INSERT INTO events SET ?';
    db.query(sql, event, (err, result) => {
        if (err) {
            console.error('Error inserting event:', err.stack);
            res.status(500).send('Error inserting event');
            return;
        }
        console.log('Event added:', result);
        res.send('Event added...');
    });
});

app.get('/events', (req, res) => {
    let sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err.stack);
            res.status(500).send('Error fetching events');
            return;
        }
        res.json(results);
    });
});

app.get('/events/:id', (req, res) => {
    let sql = `SELECT * FROM events WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching event by id:', err.stack);
            res.status(500).send('Error fetching event by id');
            return;
        }
        res.json(result);
    });
});

app.post('/contacts', (req, res) => {
    let contact = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };
    let sql = 'INSERT INTO contacts SET ?';
    db.query(sql, contact, (err, result) => {
        if (err) {
            console.error('Error inserting contact:', err.stack);
            res.status(500).send('Error inserting contact');
            return;
        }
        console.log('Contact information added:', result);
        res.send('Contact information added...');
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
