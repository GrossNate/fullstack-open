import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

if (typeof url !== "string") throw new Error("bad configuration");

mongoose.set('strictQuery', false)

console.log('connecting to', url);

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.error("error connecting to MongoDB", error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookSchema.set('toJSON', {transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString();
  delete returnedObject._id;
  delete returnedObject.__v;
}})

module.exports = mongoose.model('Person', phonebookSchema);