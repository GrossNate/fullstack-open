"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getNonSensitivePatientById = exports.getNonSensitivePatients = exports.getPatients = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
exports.getPatients = getPatients;
const getNonSensitivePatients = () => {
    return (0, exports.getPatients)().map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.getNonSensitivePatients = getNonSensitivePatients;
const getNonSensitivePatientById = (id) => {
    return (0, exports.getNonSensitivePatients)().find(patient => patient.id === id);
};
exports.getNonSensitivePatientById = getNonSensitivePatientById;
const addPatient = (newPatient) => {
    const newPatientEntry = Object.assign(Object.assign({}, newPatient), { id: (0, uuid_1.v4)() });
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
