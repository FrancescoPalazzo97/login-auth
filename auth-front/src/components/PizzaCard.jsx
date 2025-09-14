import React from 'react'

const PizzaCard = ({ pizza }) => {
    return (
        <li>
            <h2>{pizza.title}</h2>
            <p>{pizza.ingridients.join(' ,')}</p>
        </li>
    )
}

export default PizzaCard
