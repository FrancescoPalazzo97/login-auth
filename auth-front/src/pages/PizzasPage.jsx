import { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import PizzaCard from "../components/PizzaCard";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const PizzasPage = () => {
    const [pizzas, setPizzas] = useState([]);

    const { user, token } = useGlobalContext();

    useEffect(() => {
        fetch(`${API_URL}/pizzas`)
            .then(res => res.json())
            .then(data => setPizzas(data.data))
            .catch(e => console.error('Errore nel recupero della lista pizze:', e))
    }, []);

    if (pizzas.length === 0) return <>Caricamento...</>;

    return (
        <div className="p-5">
            {!token ? (
                <p className="my-3 text-xl">
                    Per vedere le pizze ti devi prima registrare! <Link className="underline hover:brightness-150" to='/signup'>Clicca qui</Link>
                </p>
            ) : (<>
                    <span className="text-gray-400">Benvenuto {user.email}</span>
                    <Title>Lista delle pizze!</Title>
                    <ul>
                        {pizzas.map(p => (
                            <PizzaCard 
                                key={p.id} 
                                pizza={p} 
                            />
                        ))}
                    </ul>
                </>)}
        </div>
    )
}

export default PizzasPage
