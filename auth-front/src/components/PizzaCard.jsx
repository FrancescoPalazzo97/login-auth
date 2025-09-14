import React from 'react'

const PizzaCard = ({ pizza }) => {
    return (
        <li className='border border-slate-500 rounded-md p-5'>
            <h2 className='text-2xl font-bold mb-2'>{pizza.title}</h2>
            <p className='mb-2'><span className='font-bold'>Ingredienti</span>: {pizza.ingridients.join(' ,')}</p>
            <p><span className='font-bold'>prezzo</span>: {pizza.price}&euro;</p>
        </li>
    )
}

export default PizzaCard
