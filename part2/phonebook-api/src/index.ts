require('dotenv').config();
import express from "express";
import { v4 as uuidv4 } from "uuid";
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

// Importing the type from the frontend. Ignoring the error for now.
import type { Person as PersonType } from "../../phonebook/src/types/types"

const app = express();
const PORT = process.env.PORT;

morgan.token('body', function (req: Request) { return JSON.stringify(req.body)});

let phonebookEntries = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.static('dist/public/'));

// app.get("/", (_, res) => {
//   res.send("Hello, TypeScript with Express!");
// });

app.get("/info", (_, res) => {
  res.send(`<p>Phonebook has info for ${phonebookEntries.length} people</p>
    <p>${Date()}</p>`);
});

app.get("/api/persons", (_, res) => {
  Person.find({}).then((people: PersonType[]) => res.json(people));
});

app.get("/api/persons/:id", (req, res) => {
  const filteredEntries = phonebookEntries.filter(
    ({ id }) => id === req.params.id
  );
  if (filteredEntries.length === 1) {
    res.json(filteredEntries[0]);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  phonebookEntries = phonebookEntries.filter(({ id }) => id !== req.params.id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name) {
    res.json({error: "Name can't be blank"});
  } else if (!person.number) {
    res.json({error: "Number can't be blank"});
  } else {
    Person.find({name: person.name})
      .then((people: PersonType[]) => {
        return (people
          .map((person: PersonType) => person.name)
          .filter(name => name === person.name)
          .length) === 0;
      })
      .then((nameUnique: boolean) => {
        if (nameUnique) {
          const newPerson = new Person(person);
          newPerson.save().then((result: unknown) => {
            res.json(result);
          })

        } else {
          res.json({error: "Name must be unique"});
        }
      })
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
