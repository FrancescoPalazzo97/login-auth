import fs from 'fs';
import bcrypt from 'bcrypt';

const PEPPER_KEY = process.env.PEPPER_KEY || 'DEFAULT_PEPPER_KEY';

export function errorObj(message) {
    return {
        error: true,
        message
    };
};

export function successObj(message, data) {
    return {
        success: true,
        message,
        data
    };
};

export function getUsers() {
    return JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
};

export function saveUser(data) {
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data/users.json', dataString, 'utf-8');
};

export function getPizzas() {
    return JSON.parse(fs.readFileSync('./data/pizzas.json', 'utf-8'));
};

export function savePizzas(data) {
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data/pizzas.json', dataString, 'utf-8');
};

export function generateId(getData) {
    const data = getData();
    const ids = data.map(d => d.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
};

export function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    console.log('pepper key:', PEPPER_KEY)
    const passwordToHash = password + PEPPER_KEY;
    const hashedPassword = bcrypt.hashSync(passwordToHash, salt);
    return hashedPassword;
};

export function validatePassword(password, hashedPassword) {
    const passwordToHash = password + PEPPER_KEY;
    return bcrypt.compareSync(passwordToHash, hashedPassword);
};