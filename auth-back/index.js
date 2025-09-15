import express from 'express';
import cors from 'cors';
import pizzasRouter from './routers/pizzasRouter.js';
import authRouter from './routers/auth.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/pizzas', pizzasRouter);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('auth-back is working!');
});

app.listen(PORT, () => {
    console.log(`Server disponibile su http://localhost:${PORT}`);
});