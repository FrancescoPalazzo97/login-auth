import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PEPPER_KEY = process.env.PEPPER_KEY || 'DEFAULT_PEPPER_KEY';
const SECRET_KEY = process.env.SECRET_KEY || 'DEFAULT_SECRET_KEY';

export function errorObj(message) {
    return {
        error: true,
        message
    };
};

export function successObj(message, data = null) {
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

export function triggerUserFavorites(user, pizzaId) {
    const users = getUsers();
    const selectedUser = users.find(u => u.id === user.id && u.email === user.email);

    if (!selectedUser) {
        return res.status(401).json(errorObj('Utente non trovato'));
    };

    const pizzas = getPizzas()
    const pizza = pizzas.find(p => p.id === Number(pizzaId));

    if (!pizza) {
        return res.status(404).json(errorObj('Pizza non trovata!'));
    }

    if (selectedUser.favorites.some(id => id === pizza.id)) {
        selectedUser.favorites = selectedUser.favorites.filter(favId => favId !== pizza.id);
    } else {
        selectedUser.favorites.push(pizza.id);
    }

    saveUser(users);
    return selectedUser;
}

export function generateId(getData) {
    const data = getData();
    const ids = data.map(d => d.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
};

export function createToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    return token;
}

export function verifyToken(token) {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
}

export function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const passwordToHash = password + PEPPER_KEY;
    const hashedPassword = bcrypt.hashSync(passwordToHash, salt);
    return hashedPassword;
};

export function validatePassword(password, hashedPassword) {
    const passwordToHash = password + PEPPER_KEY;
    return bcrypt.compareSync(passwordToHash, hashedPassword);
};

export function requireAuth(req, res, next) {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json(errorObj('Token mancante'));
    }

    try {
        const decodedToken = verifyToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json(errorObj('Token non valido o scaduto'));
    }
}