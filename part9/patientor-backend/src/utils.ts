import { NewPatient, Patient } from '../types';
import { newPatientZodSchema, patientZodSchema } from './zodSchemas';

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientZodSchema.parse(object);
};

export const toPatient = (object: unknown): Patient => {
  return patientZodSchema.parse(object);
};
