import express from 'express';
const router = express.Router();

import { getPizzas, savePizzas, getUsers, generateId, successObj, errorObj, saveUser, verifyToken, createToken, requireAuth, triggerUserFavorites } from '../lib/utility.js';

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

router.use(requireAuth);

router.post('/:id/favorite', (req, res) => {
    const { id } = req.params;

    const selectedUser = triggerUserFavorites(req.user, id);

    const refreshedToken = createToken({ id: selectedUser.id, email: selectedUser.email });

    res.json(successObj(
        'Operazione completata con successo',
        {
            token: refreshedToken,
            user: { 
                email: selectedUser.email, 
                favorites: selectedUser.favorites 
            }
        }
    ));
})

export default router;