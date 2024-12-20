import express from 'express';
import { getNonSensitivePatients, getNonSensitivePatientById, addPatient } from '../services/patients';
import { newPatientZodSchema } from '../zodSchemas';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientZodSchema.parse(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = getNonSensitivePatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});
export default router;