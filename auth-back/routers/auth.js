import express from 'express';
const router = express.Router();

import { generateId, getUsers, saveUser } from '../lib/utility.js';

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: 'email e password richiesti!'
        });
    };
    const users = getUsers();

    if (users.some(u => u.email === email)) {
        return res.status(400).json({
            error: true,
            message: 'Questa email esiste già'
        });
    };

    const newUser = {
        id: generateId(getUsers),
        email, password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    saveUser(users);
})

export default router;