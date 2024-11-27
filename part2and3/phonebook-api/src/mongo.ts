// const mongoose = require('mongoose')
import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const mongoConnectionUrl = `mongodb+srv://fullstack-mongo:${password}@cluster0.9sdbe.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;
// const url =
// `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false);

mongoose.connect(mongoConnectionUrl);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: encodeURIComponent(process.argv[3]),
    number: encodeURIComponent(process.argv[4]),
    id: uuidv4(), 
  });

  person.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
} else {
  console.log("incorrect number of arguments");
  mongoose.connection.close();
  process.exit(1);
}
