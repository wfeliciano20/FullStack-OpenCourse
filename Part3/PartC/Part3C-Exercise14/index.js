const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const PersonModel = require('./models/person');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json())
app.use(express.static('build'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length]  :response-time ms - :body'));



app.get('/api/persons', async(req, res) => {
    const persons = await PersonModel.find({}).exec();
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

app.post('/api/persons', async(req, res) => {

    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing and both are required'
        });
    }
    const filter = {
        name: body.name
    }
    const found = await PersonModel.findOne(filter).exec();
    if (found) {
        return res.status(400).json({
            error: 'Name is already on the phonebook'
        });

    } else {
        const personsList = await PersonModel.find({}).exec();
        const newId = personsList.length + 1;

        const person = new PersonModel({
            id: newId,
            name: body.name,
            number: body.number
        });
        try {
            await person.save();
            res.json(person);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
})



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));