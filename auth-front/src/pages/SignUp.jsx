import { useState } from "react";
import Title from "../components/Title";
import usePasswordRequirements from '../hooks/usePasswordRequirements';
import validator from 'validator';
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const passwordRequirements = usePasswordRequirements();

    const handleSubmit = async e => {
        e.preventDefault();

        if (!email || !password || !repeatPassword) {
            console.error('Sono richiesti tutti i campi!');
            alert('Sono richiesti tutti i campi!');
            return;
        };

        if (password !== repeatPassword) {
            console.error('Le password non combaciano!');
            alert('Le password non combaciano!');
            return;
        };

        if (!validator.isEmail(email)) {
            console.error(`Email non valida!`)
            alert(`Email non valida!`);
            return;
        };


        if (passwordRequirements && !validator.isStrongPassword(password, passwordRequirements)) {
            const { minLength, minLowercase, minUppercase, minNumbers } = passwordRequirements;
            console.error(`La password non ha i seguenti requisiti: ${minUppercase} lettera maiuscola, ${minLowercase} lettera minuscola, ${minNumbers} numero/i e una lunghezza minima di ${minLength} caratteri`);
            alert(`La password non ha i seguenti requisiti: ${minUppercase} lettera maiuscola, ${minLowercase} lettera minuscola, ${minNumbers} numero/i e una lunghezza minima di ${minLength} caratteri`);
            return;
        }

        const res = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.error) {
            console.error("Errore durante il Sign Up: ", data.message);
            alert("Errore durante il Sign Up: ", data.message);
            return;
        };

        console.log('Ti sei registrato con i seguenti dati: ', { email, password });
        alert('Ti sei registrato con i seguenti dati: ', { email, password });
        setEmail('');
        setPassword('');
        setRepeatPassword('');
    };

    return passwordRequirements && (
        <div className="max-w-md mx-auto mt-10 p-6">
            <Title>Sign Up</Title>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-500 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-500 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Ripeti password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-500 focus:outline-none"
                    />
                </div>
                <button
                    disabled={!email || !password || !repeatPassword}
                    className="w-full bg-slate-700 text-white p-3 rounded-md font-bold hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400"
                >
                    Registrati
                </button>
            </form>
            <p className="my-3 text-xl">
                Sei già registrato? Fai il <Link to='/login' className="underline hover:brightness-150">Login</Link>
            </p>
        </div>
    )
}

export default SignUp
