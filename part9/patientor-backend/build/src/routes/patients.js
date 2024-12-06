"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = require("../services/patients");
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send((0, patients_1.getNonSensitivePatients)());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = (0, patients_1.addPatient)(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong :(';
        if (error instanceof Error) {
            errorMessage = 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get('/:id', (req, res) => {
    const patient = (0, patients_1.getNonSensitivePatientById)(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
exports.default = router;
