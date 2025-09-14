import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('auth-back is working!');
});

app.listen(PORT, () => {
    console.log(`Server disponibile su http://localhost:${PORT}`);
});