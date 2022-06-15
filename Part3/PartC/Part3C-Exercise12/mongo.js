const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://wfeliciano20:${password}@cluster0.qfldc.mongodb.net/fullstackopen?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const PersonModel = mongoose.model('Person', personSchema);


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Connected successfully");
});

const getAllPersons = async() => {
    const persons = await PersonModel.find({}).exec();
    console.log(`Phonebook:`);
    persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    });
    db.close();
};

const createNewPerson = async(name, number) => {

    const persons = await PersonModel.find({}).exec();
    const newPerson = new PersonModel({
        id: persons.length + 1,
        name: process.argv[3],
        number: process.argv[4]
    })
    await newPerson.save();
    console.log(`Added ${name} number ${number} to phonebook`);
    db.close();
}

if (process.argv.length === 3) {
    getAllPersons();
}

if (process.argv.length === 5) {
    createNewPerson(process.argv[3], process.argv[4]);
}

setTimeout(() => {
    process.exit(0);
}, 3000);