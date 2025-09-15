import express from 'express';
const router = express.Router();
import validator from 'validator';

import { generateId, getUsers, saveUser, successObj, errorObj } from '../lib/utility.js';

const passwordRequirements = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 };

router.get('/password-requirements', (req, res) => {
    res.json({
        passwordRequirements
    });
});

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(errorObj('Email e password richiesti!'));
    };

    if (!validator.isEmail(email)) {
        return res.status(400).json(errorObj('Formato email non valido!'));
    };

    if (!validator.isStrongPassword(password, passwordRequirements)) {
        return res.status(400).json(
            errorObj(`La password deve essere lunga ${passwordRequirements.minLength} e devve contenere almeno ${passwordRequirements.minUppercase} lettera maiuscola, ${passwordRequirements.minLowercase} lettera minuscola e ${passwordRequirements.minNumbers} numero/i`)
        );
    };

    const users = getUsers();

    if (users.some(u => u.email === email)) {
        return res.status(400).json(errorObj('Questa email esiste già!'));
    };

    const newUser = {
        id: generateId(getUsers),
        email, password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    saveUser(users);

    res.status(201).json(successObj('Sei registrato!', newUser));
});

export default router;