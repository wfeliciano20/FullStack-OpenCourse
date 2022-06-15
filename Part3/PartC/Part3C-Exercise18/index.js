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

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else {
        return response.status(400).send(error)
    }
}

app.get('/api/persons', async(req, res) => {
    const persons = await PersonModel.find({}).exec();
    res.json(persons);
});

app.get('/info', async(req, res, next) => {
    let now = new Date();
    try {
        const persons = await PersonModel.find({}).exec();
        const total = persons.length;
        res.send(`<div><p><strong>Phonebook has info for: ${total} people</strong></p> <p><strong>${now}</strong></p></div>`);
    } catch (error) {
        next(error);
    }
});



app.get('/api/persons/:id', async(req, res, next) => {
    try {
        const id = Number(req.params.id);
        const filter = {
            id: id,
        };
        const person = await PersonModel.findById(filter).exec();
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }

});

app.post('/api/persons', async(req, res, next) => {

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
            next(error);
        }
    }
})
app.put('/api/persons/:id', async(req, res, next) => {
    const filter = {
        id: Number(req.params.id)
    };
    const infoToBeUpdated = {
        id: Number(req.body.id),
        name: req.body.name,
        number: req.body.number
    }
    try {
        const updatedPerson = await PersonModel.findOneAndUpdate(filter, infoToBeUpdated, { new: true }).exec();
        res.json(updatedPerson);
    } catch (err) {

        next(err);
    }
})


app.delete('/api/persons/:id', async(req, res, next) => {
    const id = Number(req.params.id);
    const filter = {
        id: id
    }
    try {
        const deletedObject = await PersonModel.findOne(filter).exec();
        if (deletedObject) {
            try {
                const documentToBeDeleted = await PersonModel.findOneAndDelete(filter).exec();
                res.status(204).end();
            } catch (error) {
                next(error);
            }
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));