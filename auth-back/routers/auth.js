import express from 'express';
const router = express.Router();
import validator from 'validator';

import { generateId, getUsers, saveUser, successObj, errorObj, encryptPassword, validatePassword, createToken, requireAuth } from '../lib/utility.js';

const passwordRequirements = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 };

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
        email,
        password: encryptPassword(password),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorites: []
    };
    
    const token = createToken({ id: newUser.id, email: newUser.email });
    users.push(newUser);
    saveUser(users);

    res.status(201).json(successObj(
        'Sei registrato!',
        {
            token,
            user: {
                email: newUser.email,
                favorites: newUser.favorites
            }
        }
    ));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(errorObj('Email e password richieste!'));
    };
    const users = getUsers();
    const userToFind = users.find(u => u.email === email);
    if (!userToFind || !validatePassword(password, userToFind.password)) {
        return res.status(400).json(errorObj('Email o password sbagliati!'));
    };
    const token = createToken({ id: userToFind.id, email: userToFind.email });
    res.status(200).json(successObj(
        'Login effettuato!', 
        {
            token,
            user: {
                email: userToFind.email,
                favorites: userToFind.favorites
            }
        }
    ));
})

router.use(requireAuth);

router.post('/change-password', (req, res) => {
    const { user } = req;
    const { oldPassword, password } = req.body;


    if (!oldPassword || !password) {
        return res.status(400).json(errorObj('Vecchia e nuova password richieste!'));
    };

    if (!validator.isStrongPassword(password, passwordRequirements)) {
        return res.status(400).json(
            errorObj(`La password deve essere lunga ${passwordRequirements.minLength} e devve contenere almeno ${passwordRequirements.minUppercase} lettera maiuscola, ${passwordRequirements.minLowercase} lettera minuscola e ${passwordRequirements.minNumbers} numero/i`)
        );
    };

    const users = getUsers();
    const selectedUser = users.find(u => u.id === user.id && u.email === user.email);

    if (!validatePassword(oldPassword, selectedUser.password)) {
        return res.status(400).json(errorObj('Vecchia password errata!'));
    };

    selectedUser.password = encryptPassword(password);
    selectedUser.updatedAt = new Date().toISOString();
    saveUser(users);

    res.status(200).json(successObj(
        'Password cambiata con successo!',
        {
            token: createToken({ id: selectedUser.id, email: selectedUser.email }),
            user: {
                email: selectedUser.email,
                favorites: selectedUser.favorites
            }
        }
    ));
});

export default router;