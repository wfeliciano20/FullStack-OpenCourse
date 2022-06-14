const express = require('express');
const bodyParser = require('body-parser')
const PORT = 3001;
const app = express();

// parse application/json
app.use(bodyParser.json())

let persons = [{
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    let now = new Date();
    let total = persons.length;
    res.send(`<div><p><strong>Phonebook has info for: ${total} people</strong></p> <p><strong>${now}</strong></p></div>`);
})


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const found = persons.find(person => person.name === body.name);
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing and both are required'
        });
    } else if (found) {
        return res.status(400).json({
            error: 'Name is already on the phonebook'
        });

    } else {
        const random = Math.floor(Math.random() * 5000000);
        while (persons.indexOf(person => person.id === random) !== -1) {
            random = Math.floor(Math.random() * 5000000);
        }

        const person = {
            id: random,
            name: body.name,
            number: body.number
        }
        persons = persons.concat(person);
        res.json(person);
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
})



app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));