import fs from 'fs';

export function getPizzas() {
    return JSON.parse(fs.readFileSync('./data/pizzas.json', 'utf-8'));
};

export function savePizzas(data) {
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync('./data/pizzas.json', dataString, 'utf-8');
};

export function generateId() {
    const pizzas = getPizzas();
    const ids = pizzas.map(p => p.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
}