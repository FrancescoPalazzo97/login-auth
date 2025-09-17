import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function usePasswordRequirements() {
    const [passwordRequirements, setPasswordRequirements] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/auth/password-requirements`)
            .then(res => res.json())
            .then(data => setPasswordRequirements(data.passwordRequirements))
            .catch(e => console.error('errore durante il recupero dei requisiti della password: ', e))
    }, []);

    return passwordRequirements;
};