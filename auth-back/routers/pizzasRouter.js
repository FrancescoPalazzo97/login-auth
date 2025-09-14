import express from 'express';

import { getPizzas, generateId } from '../lib/utility.js'

const router = express.Router();

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
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'Tutti i campi sono richiesti!'
        });
    };
    const pizzas = getPizzas();
    pizzas.push({
        id: generateId(),
        title, ingridients, price,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    })
});

export default router;