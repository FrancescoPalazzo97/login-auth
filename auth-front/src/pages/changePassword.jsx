import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Title from "../components/Title";
import usePasswordRequirements from '../hooks/usePasswordRequirements';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const ChangePassword = () => {
    
    const { setUser, setToken, token } = useGlobalContext();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const navigate = useNavigate();

    const passwordRequirements = usePasswordRequirements();

    const handleSubmit = async e => {
        e.preventDefault();
        
        if (!oldPassword || !password || !repeatPassword) {
            console.error('Sono richiesti tutti i campi!');
            alert('Sono richiesti tutti i campi!');
            return;
        };

        if (password !== repeatPassword) {
            console.error('Le password non combaciano!');
            alert('Le password non combaciano!');
            return;
        };

        if (passwordRequirements && !validator.isStrongPassword(password, passwordRequirements)) {
            const { minLength, minLowercase, minUppercase, minNumbers } = passwordRequirements;
            console.error(`La password non ha i seguenti requisiti: ${minUppercase} lettera maiuscola, ${minLowercase} lettera minuscola, ${minNumbers} numero/i e una lunghezza minima di ${minLength} caratteri`);
            alert(`La password non ha i seguenti requisiti: ${minUppercase} lettera maiuscola, ${minLowercase} lettera minuscola, ${minNumbers} numero/i e una lunghezza minima di ${minLength} caratteri`);
            return;
        }

        const res = await fetch(`${API_URL}/auth/change-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, oldPassword, password })
        });

        const data = await res.json();

        if (data.error) {
            console.error("Errore durante il Sign Up: ", data.message);
            alert("Errore durante il Sign Up: ", data.message);
            return;
        };

        console.log('Password cambiata con successo');
        alert('Password cambiata con successo');
        setOldPassword('');
        setPassword('');
        setRepeatPassword('');
        setUser(data.data.user);
        setToken(data.data.token);
        navigate('/');
    };

    return passwordRequirements && (
        <div className="max-w-md mx-auto mt-10 p-6">
            <Title>Change password</Title>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                    <input
                        type="text"
                        placeholder="Vecchia password"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-500 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-500 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Ripeti password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:border-slate-500 focus:outline-none"
                    />
                </div>
                <button
                    disabled={!oldPassword || !password || !repeatPassword}
                    className="w-full bg-slate-700 text-white p-3 rounded-md font-bold hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400"
                >
                    Cambia password
                </button>
            </form>
            <p className="my-3 text-xl">
                <span className="cursor-pointer" onClick={() => navigate(-1)}>Torna indietro</span>
            </p>
        </div>
    )
}

export default ChangePassword
