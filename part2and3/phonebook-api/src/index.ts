require("dotenv").config();
import express from "express";
import { v4 as uuidv4 } from "uuid";
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");
import type { ErrorRequestHandler } from "express";

// Importing the type from the frontend. Ignoring the error for now.
// import type { Person as PersonType } from "../../phonebook/src/types/types";
interface PersonType {
  name: string;
  number: string;
  id: string;
}

const app = express();
const PORT = process.env.PORT;

const errorHandler: ErrorRequestHandler = (
  error: any,
  _: express.Request,
  response: express.Response,
  next: express.NextFunction
): ReturnType<ErrorRequestHandler> => {
  // console.error(error.message);
  // console.error(error.name)
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    response.json({ error: error.message });
  }
  next(error);
};

morgan.token("body", function (req: Request) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist/public/"));

app.get("/info", (_, res) => {
  Person.find({}).then((people: PersonType[]) => {
    res.send(`<p>Phonebook has info for ${people.length} people</p>`);
  });
});

app.get("/api/persons", (_, res) => {
  Person.find({}).then((people: PersonType[]) => res.json(people));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person: PersonType) => {
      console.log(person);
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error: Error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error: Error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  if (!person.name) {
    res.json({ error: "Name can't be blank" });
  } else if (!person.number) {
    res.json({ error: "Number can't be blank" });
  } else {
    Person.find({ name: person.name })
      .then((people: PersonType[]) => {
        return (
          people
            .map((person: PersonType) => person.name)
            .filter((name) => name === person.name).length === 0
        );
      })
      .then((nameUnique: boolean) => {
        if (nameUnique) {
          const newPerson = new Person(person);
          newPerson
            .save()
            .then((result: unknown) => {
              res.json(result);
            })
            .catch((error: Error) => {
              next(error);
            });
        } else {
          res.json({ error: "Name must be unique" });
        }
      });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
