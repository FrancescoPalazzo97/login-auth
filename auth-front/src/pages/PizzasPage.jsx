import { useState, useEffect } from "react"
import PizzaCard from "../components/PizzaCard";

const API_URL = import.meta.env.VITE_API_URL

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
            <h1>Lista delle pizze!</h1>
            <ul>
                {pizzas.map(p => (
                    <PizzaCard key={p.id} pizza={p} />
                ))}
            </ul>
        </div>
    )
}

export default PizzasPage
