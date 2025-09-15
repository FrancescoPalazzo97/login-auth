import fs from 'fs';

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
}