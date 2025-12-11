import { useState, useEffect } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';

const API_URL = import.meta.env.VITE_API_URL;

const PizzaCard = ({ pizza }) => {
    const [buttonText, setButtonText] = useState('Aggiungi ai preferiti');
    const {token, setToken, user, setUser} = useGlobalContext();

    const triggerFavorite = async () => {
        if (!token) {
            alert('Devi essere loggato per aggiungere ai preferiti');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/pizzas/${pizza.id}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token })
            });

            
            const data = await res.json();
            
            if (!res.ok || data.error) {
                alert(`Errore: ${data.message}`);
                return;
            }

            setUser(data.data.user);
            setToken(data.data.token);
        } catch (error) {
            alert(`Errore di connessione: ${error.message}`);
        }
    }

    useEffect(() => {
        if (user.favorites.includes(pizza.id)) {
            setButtonText('Rimuovi dai preferiti');
        } else {
            setButtonText('Aggiungi ai preferiti');
        }
    }, [user.favorites, pizza.id]);

    return (
        <li className='border border-slate-500 rounded-md p-5'>
            <h2 className='text-2xl font-bold mb-2'>{pizza.title}</h2>
            <p className='mb-2'><span className='font-bold'>Ingredienti</span>: {pizza.ingridients.join(' ,')}</p>
            <p><span className='font-bold'>prezzo</span>: {pizza.price}&euro;</p>
            <button 
                className='py-2 px-4 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                onClick={triggerFavorite}
            >
                {buttonText}
            </button>
        </li>
    )
}

export default PizzaCard
