import type { Patient, NonSensitivePatient, NewPatient } from "../../types";
export declare const getPatients: () => Patient[];
export declare const getNonSensitivePatients: () => NonSensitivePatient[];
export declare const getNonSensitivePatientById: (id: string) => NonSensitivePatient | undefined;
export declare const addPatient: (newPatient: NewPatient) => Patient;
