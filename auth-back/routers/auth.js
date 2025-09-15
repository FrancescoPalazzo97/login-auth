import express from 'express';
const router = express.Router();
import validator from 'validator';

import { generateId, getUsers, saveUser, successObj, errorObj } from '../lib/utility.js';

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(errorObj('Email e password richiesti!'));
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