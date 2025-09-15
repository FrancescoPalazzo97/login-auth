import { useState } from "react";
import Title from "../components/Title"
const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

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

        const res = fetch(`${API_URL}/auth/signup`, {
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

    return (
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
        </div>
    )
}

export default SignUp
