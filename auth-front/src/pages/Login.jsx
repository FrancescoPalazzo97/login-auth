import { Link, useNavigate } from 'react-router-dom';
import Title from '../components/Title'
import { useState } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useGlobalContext();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if (!email || !password) {
            console.error('Sono richiesti tutti i campi!');
            alert('Sono richiesti tutti i campi!');
            return;
        };

        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            console.error('Server error:', res.status, res.statusText);
            alert('Errore del server. Assicurati che il backend sia in esecuzione.');
            return;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error('Response is not JSON:', await res.text());
            alert('Errore: il server non ha restituito una risposta JSON valida');
            return;
        }

        const data = await res.json();

        if (data.error) {
            console.error("Errore durante il Login: ", data.message);
            alert("Errore durante il Login: ", data.message);
            return;
        };

        console.log('Login effettuato');
        alert('Login effettuato');
        setUser(data.data);
        setEmail('');
        setPassword('');
        navigate('/')
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <Title>Login</Title>
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
                <button
                    disabled={!email || !password}
                    className="w-full bg-slate-700 text-white p-3 rounded-md font-bold hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400"
                >
                    Registrati
                </button>
            </form>
            <p className="my-3 text-xl">
                Non sei ancora registrato? <Link to='/signup' className="underline hover:brightness-150">Registrati</Link>
            </p>
        </div>
    )
}

export default Login
