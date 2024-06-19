const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
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
    let query = db.query(sql, event, (err, result) => {
        if (err) throw err;
        res.send('Event added...');
    });
});

app.get('/events', (req, res) => {
    let sql = 'SELECT * FROM events';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/events/:id', (req, res) => {
    let sql = `SELECT * FROM events WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
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
    let query = db.query(sql, contact, (err, result) => {
        if (err) throw err;
        res.send('Contact information added...');
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});