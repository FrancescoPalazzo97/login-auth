import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    const pizzasString = fs.readFileSync('./data/pizzas.json', 'utf-8');
    const pizzas = JSON.parse(pizzasString);
    res.send({
        title: 'Lista pizze pazze!',
        data: pizzas
    })
})

export default router;