import express from "express";
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/api/persons", (_, res) => {
  const phonebookEntries = [
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
  res.json(phonebookEntries);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
