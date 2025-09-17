import { NavLink, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../hooks/useGlobalContext";

const Header = () => {

    const { user, setUser } = useGlobalContext();

    const navigate = useNavigate();

    return (
        <nav className="bg-slate-100 border-b border-slate-300 p-5">
            <menu className="flex gap-6 list-none m-0 p-0">
                {!user &&
                    <>
                        <li>
                            <NavLink
                                to='/signup'
                                className="text-lg font-bold text-slate-700 hover:text-slate-900 transition-colors"
                            >
                                Sign Up
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/login'
                                className="text-lg font-bold text-slate-700 hover:text-slate-900 transition-colors"
                            >
                                Login
                            </NavLink>
                        </li>
                    </>
                }
                {user &&
                    <>
                        <li>
                            <NavLink
                                to='/'
                                className="text-lg font-bold text-slate-700 hover:text-slate-900 transition-colors"
                            >
                                Lista pizze
                            </NavLink>
                        </li>
                        <li
                            onClick={() => {
                                setUser(null);
                                navigate('/login');
                            }}
                            className="text-lg font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                            Log Out
                        </li>
                    </>
                }
            </menu>
        </nav>
    )
}

export default Header
