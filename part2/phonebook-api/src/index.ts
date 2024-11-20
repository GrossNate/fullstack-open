import express from "express";
const cors = require("cors");

const app = express();
const PORT = 3001;

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

app.get("/", (_, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/info", (_, res) => {
  res.send(`<p>Phonebook has info for ${phonebookEntries.length} people</p>
    <p>${Date()}</p>`)
});

app.get("/api/persons", (_, res) => {
  res.json(phonebookEntries);
});

app.get("/api/persons/:id", (req, res) => {
  const filteredEntries = phonebookEntries.filter(({id}) => id === req.params.id);
  if (filteredEntries.length === 1) {
    res.json(filteredEntries[0]);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  phonebookEntries = phonebookEntries.filter(({id}) => id !== req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
