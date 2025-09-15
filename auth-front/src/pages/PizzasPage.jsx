import { useState, useEffect } from "react";
import PizzaCard from "../components/PizzaCard";
import Title from "../components/Title";

const API_URL = import.meta.env.VITE_API_URL;

const PizzasPage = () => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/pizzas`)
            .then(res => res.json())
            .then(data => setPizzas(data.data))
            .catch(e => console.error('Errore nel recupero della lista pizze:', e))
    }, [])

    console.log(pizzas)

    if (pizzas.length === 0) return <>Caricamento...</>

    return (
        <div>
            <Title>Lista delle pizze!</Title>
            <ul className="p-5">
                {pizzas.map(p => (
                    <PizzaCard key={p.id} pizza={p} />
                ))}
            </ul>
        </div>
    )
}

export default PizzasPage
