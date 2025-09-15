import express from 'express';
const router = express.Router();

import { getPizzas, savePizzas, generateId, successObj, errorObj } from '../lib/utility.js'


router.get('/', (req, res) => {
    const pizzas = getPizzas();
    res.json({
        title: 'Lista pizze pazze!',
        data: pizzas
    });
});

router.post('/', (req, res) => {
    const { title, ingridients, price } = req.body;
    if (!title || !ingridients || !price) {
        return res.status(400).json(errorObj('Tutti i campi sono richiesti!'));
    };
    const pizzas = getPizzas();
    const newPizza = {
        id: generateId(getPizzas),
        title, ingridients, price,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    pizzas.push(newPizza);
    savePizzas(pizzas);
    res.status(201).json(successObj('Pizza inserita', newPizza));
});

export default router;