import express from 'express';
const router = express.Router();

import { getPizzas, savePizzas, getUsers, generateId, successObj, errorObj, saveUser } from '../lib/utility.js'


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

router.post('/:id/favorite', (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    const users = getUsers();
    const selectedUser = users.find(u => u.email === user.email && u.password === user.password);
    if (!selectedUser) return res.status(404).json(errorObj('User non trovato!'));
    const pizzas = getPizzas()
    const pizza = pizzas.find(p => p.id === Number(id));
    if (selectedUser.favorites.some(id => id === pizza.id)) {
        selectedUser.favorites = selectedUser.favorites.filter(favId => favId !== pizza.id);
    } else {
        selectedUser.favorites.push(pizza.id);
    }
    saveUser(user);
    res.json({
        data: selectedUser
    });
})

export default router;