import data from "../../data/patients";
import type { Patient, NonSensitivePatient, NewPatient } from "../../types";
import { v4 as uuidv4 } from 'uuid';

export const getPatients = (): Patient[] => {
  return data;
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return getPatients().map(
    ({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatient => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

export const getNonSensitivePatientById = (id: string): NonSensitivePatient | undefined => {
  return getNonSensitivePatients().find(patient => patient.id === id);
};

export const addPatient = (newPatient: NewPatient): Patient => {
  const newPatientEntry: Patient = {...newPatient, id: uuidv4()};
  data.push(newPatientEntry);
  return newPatientEntry;
};