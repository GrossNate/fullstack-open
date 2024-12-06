"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNewPatient = (val) => {
    return (typeof val === 'object' &&
        val !== null &&
        'name' in val &&
        typeof val.name === 'string' &&
        'dateOfBirth' in val &&
        typeof val.dateOfBirth === 'string' &&
        'ssn' in val &&
        typeof val.ssn === 'string' &&
        'gender' in val &&
        typeof val.gender === 'string' &&
        'occupation' in val &&
        typeof val.occupation === 'string');
};
const toNewPatient = (object) => {
    if (isNewPatient(object)) {
        return object;
    }
    throw new Error('Did not get a New Patient object.');
};
exports.default = toNewPatient;
